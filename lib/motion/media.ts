/** Media-query checks shared by the motion islands. Call them in the browser only. */

export const prefersReducedMotion = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const hasFinePointer = (): boolean => window.matchMedia("(pointer: fine)").matches;
