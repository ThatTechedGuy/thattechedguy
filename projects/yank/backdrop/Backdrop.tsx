"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion/media";

// Three.js is only downloaded when the scene mounts, which happens only on screens that show it.
const BackdropScene = dynamic(() => import("./BackdropScene"), { ssr: false });

/** Desktop only: phones and touch screens never load Three.js (owner's decision), nor does reduced motion. */
const canShow = () =>
  window.matchMedia("(pointer: fine) and (min-width: 761px)").matches &&
  !prefersReducedMotion() &&
  "WebGL2RenderingContext" in window;

/** The 3D backdrop's host. The scene starts once the browser is idle after first paint. */
export function Backdrop() {
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!canShow()) return undefined;
    const go = () => setStart(true);
    // Safari has no requestIdleCallback; a short timeout after load is close enough.
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(go, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(go, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div aria-hidden="true" className="backdrop">
      {start && <BackdropScene />}
    </div>
  );
}
