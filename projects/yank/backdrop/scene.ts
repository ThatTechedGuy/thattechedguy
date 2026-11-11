/** The 3D backdrop's objects: a studio environment for reflections, then glass cards, keycaps, blobs, rings and a hook. */

import {
  AmbientLight,
  BackSide,
  BoxGeometry,
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  Shape as ShapePath,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  type WebGLRenderer,
} from "three";

import type { Shape } from "./formations";

/** The source used Three.js r149's legacy lights; today's physically based units need π times the intensity. */
const LEGACY_LIGHT = Math.PI;

interface Actor extends Shape {
  mesh: Mesh;
}

/** Soft gradient dome plus four bright panels, baked once into an environment map. */
function studio(renderer: WebGLRenderer) {
  const generator = new PMREMGenerator(renderer);
  const env = new Scene();
  const dome = new SphereGeometry(30, 48, 24);
  const top = new Color("#EAF2FF");
  const middle = new Color("#8FB8FF");
  const bottom = new Color("#3B2A7A");
  const colour = new Color();
  const colours: number[] = [];
  const position = dome.attributes["position"];
  for (let v = 0; v < (position?.count ?? 0); v++) {
    const y = (position?.getY(v) ?? 0) / 30;
    colour.copy(middle).lerp(y > 0 ? top : bottom, Math.abs(y));
    colours.push(colour.r, colour.g, colour.b);
  }
  dome.setAttribute("color", new Float32BufferAttribute(colours, 3));
  env.add(new Mesh(dome, new MeshBasicMaterial({ side: BackSide, vertexColors: true })));
  const panel = (w: number, h: number, x: number, y: number, z: number, hex: string, k: number) => {
    const mesh = new Mesh(
      new PlaneGeometry(w, h),
      new MeshBasicMaterial({ color: new Color(hex).multiplyScalar(k), side: DoubleSide }),
    );
    mesh.position.set(x, y, z);
    mesh.lookAt(0, 0, 0);
    env.add(mesh);
  };
  panel(14, 4, 0, 16, 6, "#FFFFFF", 6);
  panel(6, 10, -18, 2, 4, "#9ED0FF", 4);
  panel(6, 10, 18, -2, 6, "#FFB4E6", 3.5);
  panel(10, 3, 0, -14, 10, "#FFD08A", 2.5);
  const texture = generator.fromScene(env, 0.035).texture;
  generator.dispose();
  return texture;
}

function roundedRect(w: number, h: number, r: number) {
  const s = new ShapePath();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

const glass = (hex: string, opacity: number) =>
  new MeshPhysicalMaterial({
    color: new Color(hex),
    metalness: 0.05,
    roughness: 0.08,
    transparent: true,
    opacity,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    envMapIntensity: 1.6,
    side: DoubleSide,
    depthWrite: false,
    iridescence: 0.35,
    iridescenceIOR: 1.3,
  });

/** A keycap face: the glyph drawn on a small canvas. */
function keyFace(glyph: string, ink: string) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 128, 128);
    ctx.fillStyle = ink;
    ctx.font = "600 64px -apple-system, BlinkMacSystemFont, Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(glyph, 64, 68);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return new Mesh(
    new PlaneGeometry(0.72, 0.72),
    new MeshStandardMaterial({ map: texture, roughness: 0.35 }),
  );
}

export function buildScene(renderer: WebGLRenderer, accent: string) {
  const scene = new Scene();
  scene.environment = studio(renderer);
  scene.add(new AmbientLight(0xffffff, 0.35 * LEGACY_LIGHT));
  const key = new DirectionalLight(0xffffff, 1.1 * LEGACY_LIGHT);
  key.position.set(4, 8, 10);
  scene.add(key);

  const group = new Group();
  scene.add(group);
  const actors: Actor[] = [];
  const add = (mesh: Mesh, kind: Shape["kind"], index: number) => {
    mesh.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 10,
      -8 - Math.random() * 6,
    );
    group.add(mesh);
    actors.push({ mesh, kind, index, seed: Math.random() * 100 });
    return mesh;
  };

  const cardGeometry = new ExtrudeGeometry(roundedRect(1.9, 1.25, 0.24), {
    depth: 0.06,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 5,
    curveSegments: 12,
  }).center();
  const lineGeometry = new BoxGeometry(1, 0.09, 0.02);
  const lineMaterial = new MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.3,
    transparent: true,
    opacity: 0.9,
  });
  for (const [index, tint] of [
    accent,
    "#FFFFFF",
    "#BF5AF2",
    "#64D2FF",
    "#FFFFFF",
    "#FF9F0A",
  ].entries()) {
    const card = new Mesh(cardGeometry, glass(tint, tint === "#FFFFFF" ? 0.36 : 0.48));
    // Two text lines on each card.
    for (const [width, x, y] of [
      [1.2, -0.15, 0.18],
      [0.75, -0.38, -0.06],
    ] as const) {
      const line = new Mesh(lineGeometry, lineMaterial);
      line.scale.x = width;
      line.position.set(x, y, 0.085);
      card.add(line);
    }
    add(card, "card", index);
  }

  const keyGeometry = new ExtrudeGeometry(roundedRect(0.95, 0.95, 0.22), {
    depth: 0.32,
    bevelEnabled: true,
    bevelThickness: 0.09,
    bevelSize: 0.08,
    bevelSegments: 6,
    curveSegments: 10,
  }).center();
  const keyMaterial = new MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.32,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    envMapIntensity: 1.1,
  });
  for (const [index, glyph] of ["⌘", "⇧", "V", "C"].entries()) {
    const keycap = new Mesh(keyGeometry, keyMaterial);
    const face = keyFace(glyph, index === 0 ? accent : "#1D1D1F");
    face.position.z = 0.215;
    keycap.add(face);
    add(keycap, "key", index);
  }

  const blobs: Mesh[] = [];
  for (const [index, hex] of [accent, "#BF5AF2"].entries()) {
    const geometry = new SphereGeometry(1, 72, 54);
    // The untouched sphere, so each frame's wobble starts from the same shape.
    geometry.userData["base"] = Float32Array.from(geometry.attributes["position"]?.array ?? []);
    const material = new MeshPhysicalMaterial({
      color: new Color(hex),
      metalness: 0.1,
      roughness: 0.05,
      clearcoat: 1,
      clearcoatRoughness: 0.05,
      envMapIntensity: 1.8,
      transparent: true,
      opacity: 0.82,
      iridescence: 1,
      iridescenceIOR: 1.45,
      iridescenceThicknessRange: [120, 600],
    });
    blobs.push(add(new Mesh(geometry, material), "blob", index));
  }

  const chrome = new MeshStandardMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.12,
    envMapIntensity: 1.4,
  });
  const iridescent = new MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 1,
    roughness: 0.18,
    envMapIntensity: 1.5,
    iridescence: 1,
    iridescenceIOR: 1.6,
  });
  const ringGeometry = new TorusGeometry(1.35, 0.06, 20, 160);
  for (let index = 0; index < 2; index++) add(new Mesh(ringGeometry, iridescent), "ring", index);

  const hookCurve = new CatmullRomCurve3(
    (
      [
        [0, 2.6],
        [0, 1.2],
        [0, 0.2],
        [-0.08, -0.35],
        [-0.45, -0.72],
        [-0.9, -0.6],
        [-1.02, -0.2],
        [-0.98, 0.05],
      ] as const
    ).map(([x, y]) => new Vector3(x, y, 0)),
  );
  const hook = add(new Mesh(new TubeGeometry(hookCurve, 120, 0.085, 16, false), chrome), "hook", 0);
  const eye = new Mesh(new TorusGeometry(0.28, 0.075, 16, 48), chrome);
  eye.position.set(0, 2.85, 0);
  hook.add(eye);

  return { scene, group, actors, blobs };
}

/** Makes a blob breathe: every vertex moves along its own direction by a slow 3D sine field. */
export function wobble(blob: Mesh, t: number): void {
  const geometry = blob.geometry;
  const base: unknown = geometry.userData["base"];
  const position = geometry.attributes["position"];
  if (!(base instanceof Float32Array) || !position) return;
  const array = position.array;
  for (let j = 0; j < array.length; j += 3) {
    const x = base[j] ?? 0;
    const y = base[j + 1] ?? 0;
    const z = base[j + 2] ?? 0;
    const f =
      1 +
      0.14 *
        Math.sin(x * 2.1 + t * 1.3) *
        Math.sin(y * 2.4 + t * 1.1) *
        Math.sin(z * 1.9 + t * 0.9);
    array[j] = x * f;
    array[j + 1] = y * f;
    array[j + 2] = z * f;
  }
  position.needsUpdate = true;
  geometry.computeVertexNormals();
}

/** Frees every geometry, material and texture the scene holds. */
export function disposeScene(scene: Scene): void {
  scene.environment?.dispose();
  scene.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    object.geometry.dispose();
    const materials: unknown[] = Array.isArray(object.material)
      ? object.material
      : [object.material];
    for (const material of materials) {
      if (material instanceof MeshStandardMaterial) material.map?.dispose();
      if (material instanceof MeshBasicMaterial || material instanceof MeshStandardMaterial)
        material.dispose();
    }
  });
}
