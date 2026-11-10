/** What every pattern drawer gets: its canvas in CSS pixels, colours, and the pointer relative to it. */
export interface PatternFrame {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  c1: string;
  c2: string;
  alpha: number;
  /** Pointer position in the canvas; far away (-9999) until the pointer first moves. */
  mx: number;
  my: number;
  /** Particles kept between frames by the flow pattern. */
  parts?: { x: number; y: number; age: number }[];
}

export type Drawer = (frame: PatternFrame, t: number) => void;

export const TAU = 6.2832;

/** 1 under the pointer, fading to 0 at about `radius` px away. */
export const bump = (frame: PatternFrame, x: number, y: number, radius: number): number =>
  Math.exp(-((x - frame.mx) ** 2 + (y - frame.my) ** 2) / radius ** 2);

/** A stable pseudo-random number in [0, 1) for each n, so patterns look the same every visit. */
export const hash = (n: number): number => {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
};
