"use client";

import { useEffect } from "react";
import {
  ACESFilmicToneMapping,
  ColorManagement,
  Euler,
  PerspectiveCamera,
  Quaternion,
  WebGLRenderer,
} from "three";

import { chapters, yank, type ChapterId } from "../config";
import { pose } from "./formations";
import { buildScene, disposeScene, wobble } from "./scene";

/** Chapters where text fills the screen, so the 3D fades out (source line 1615). */
const quietChapters = new Set<ChapterId>(["how", "features", "free", "download"]);
/** Matches the canvas's opacity transition in backdrop.css; after it the loop can sleep. */
const FADE_MS = 1200;
const MAX_PIXEL_RATIO = 1.5;

const chapterOf = (html: HTMLElement): ChapterId =>
  chapters.find((chapter) => chapter.id === html.dataset["chapter"])?.id ?? "top";

/**
 * Renders the Three.js backdrop into the .backdrop host. Shapes ease into a formation per chapter,
 * the camera follows the pointer and the group leans with scroll speed. The loop sleeps while the
 * tab is hidden or the backdrop has faded out in a quiet section.
 */
export default function BackdropScene() {
  useEffect(() => {
    const html = document.documentElement;
    const host = document.querySelector<HTMLElement>(".backdrop");
    if (!host) return undefined;

    // Three.js r149, which the design was made with, did no colour management; this keeps its colours.
    ColorManagement.enabled = false;
    const canvas = document.createElement("canvas");
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      return undefined; // No WebGL: the page simply has no 3D.
    }
    host.append(canvas);
    renderer.setPixelRatio(Math.min(MAX_PIXEL_RATIO, window.devicePixelRatio || 1));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 15);
    const { scene, group, actors, blobs } = buildScene(renderer, yank.accent);

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();

    // Pointer position in -1..1, smoothed every frame; scroll speed leans the whole group.
    let mx = 0;
    let my = 0;
    let smx = 0;
    let smy = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let raf = 0;
    let snap = true;
    let compiled = false;
    let disposed = false;
    let quietSince = Number.NaN;
    const quietUnderMiddle = new Set<Element>();
    const t0 = performance.now();
    const target = new Quaternion();
    const euler = new Euler();

    const frame = (now: number) => {
      raf = 0;
      if (document.hidden || now - quietSince > FADE_MS) {
        snap = true; // Shapes jump to their formation when the backdrop wakes, as if they had kept moving.
        return;
      }
      const t = (now - t0) / 1000;
      const chapter = chapterOf(html);
      const exposure = html.dataset["theme"] === "dark" ? 0.8 : 1.2;
      renderer.toneMappingExposure += (exposure - renderer.toneMappingExposure) * 0.05;
      const y = window.scrollY;
      velocity += (y - lastY - velocity) * 0.1;
      lastY = y;
      smx += (mx - smx) * 0.05;
      smy += (my - smy) * 0.05;
      camera.position.x = smx * 0.9;
      camera.position.y = -smy * 0.6;
      camera.lookAt(0, 0, -2);
      group.rotation.z = Math.max(-0.2, Math.min(0.2, velocity * 0.004));
      for (const actor of actors) {
        const { position, rotation, scale } = pose(chapter, actor, t, camera.aspect);
        const { mesh } = actor;
        mesh.position.lerp({ x: position[0], y: position[1], z: position[2] }, snap ? 1 : 0.045);
        mesh.position.y += Math.sin(t * 0.8 + actor.seed) * 0.004;
        target.setFromEuler(euler.set(...rotation));
        mesh.quaternion.slerp(target, snap ? 1 : 0.05);
        mesh.scale.setScalar(snap ? scale : mesh.scale.x + (scale - mesh.scale.x) * 0.06);
      }
      snap = false;
      for (const [index, blob] of blobs.entries()) wobble(blob, t + index * 2);
      renderer.render(scene, camera);
      html.classList.add("backdrop-on");
      raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (compiled && raf === 0 && !document.hidden) raf = requestAnimationFrame(frame);
    };

    // Quiet when a text-heavy chapter is current or the screen's middle is inside [data-d3-quiet].
    const updateQuiet = () => {
      const quiet = quietUnderMiddle.size > 0 || quietChapters.has(chapterOf(html));
      html.classList.toggle("backdrop-quiet", quiet);
      if (!quiet) quietSince = Number.NaN;
      else if (Number.isNaN(quietSince)) quietSince = performance.now();
      wake();
    };
    const middle = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) quietUnderMiddle.add(entry.target);
          else quietUnderMiddle.delete(entry.target);
        }
        updateQuiet();
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const section of document.querySelectorAll("[data-d3-quiet]")) middle.observe(section);
    // SectionTracker names the chapter on <html>; follow it without polling.
    const chapterWatch = new MutationObserver(updateQuiet);
    chapterWatch.observe(html, { attributeFilter: ["data-chapter"] });

    const onMove = (event: MouseEvent) => {
      mx = (event.clientX / window.innerWidth) * 2 - 1;
      my = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", wake);
    updateQuiet();
    // Compile the shaders in parallel (KHR_parallel_shader_compile) before the first frame; compiling
    // them during the first render blocked the main thread for over a second.
    const start = () => {
      if (disposed) return;
      compiled = true;
      wake();
    };
    void renderer.compileAsync(scene, camera).then(start, start);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      middle.disconnect();
      chapterWatch.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", wake);
      html.classList.remove("backdrop-on", "backdrop-quiet");
      disposeScene(scene);
      renderer.dispose();
      canvas.remove();
    };
  }, []);

  return null;
}
