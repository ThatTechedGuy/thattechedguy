/** Where each 3D shape wants to be for the current chapter. Pure, ported from the source's d3Build `form`. */

import type { ChapterId } from "../config";

export type ShapeKind = "card" | "key" | "blob" | "ring" | "hook";
type Vec3 = [number, number, number];

/** How many of each shape the scene builds; formations spread them by index. */
export const shapeCounts = { card: 6, key: 4, blob: 2, ring: 2, hook: 1 } as const;

export interface Shape {
  kind: ShapeKind;
  /** Index among shapes of the same kind. */
  index: number;
  /** A random number in [0, 100) fixed per shape, for scatter and timing. */
  seed: number;
}

export interface Pose {
  position: Vec3;
  rotation: Vec3;
  scale: number;
}

/** Half the visible width at the shapes' depth, in scene units, for a camera of this aspect ratio. */
export const halfWidth = (aspect: number): number => Math.max(4.2, 4.4 * aspect);

const side = (n: number) => (n % 2 === 0 ? 1 : -1);

function rawPose(chapter: ChapterId, { kind, index: i, seed }: Shape, t: number, w: number): Pose {
  let p: Vec3;
  let r: Vec3 = [0, 0, 0];
  let s = 1;
  if (chapter === "top" || chapter === "download") {
    // A fanned stack of cards on the right with the hook above; keys, blobs and rings on the left.
    const cx = chapter === "top" ? w * 0.74 : w * 0.62;
    if (kind === "card") {
      p = [cx + i * 0.04, 0.1 - i * 0.2, -i * 0.42];
      r = [0.35, -0.55, 0.12 + i * 0.05];
    } else if (kind === "hook") {
      p = [cx + 0.55, 2.1 + Math.sin(t * 1.4) * 0.12, 0.6];
      r = [0, -0.5, 0.15];
    } else if (kind === "key") {
      const a = (i / shapeCounts.key) * Math.PI * 2 + t * 0.25;
      p = [-w * 0.72 + Math.cos(a) * 1.5, -0.6 + Math.sin(a) * 1.9, -1 + Math.sin(a) * 1.2];
      r = [0.5 + Math.sin(t + i), -0.6 + a, 0.2];
      s = 0.9;
    } else if (kind === "blob") {
      p = [-w * 0.7 + i * 0.9, 1.8 - i * 1.6, -3 - i];
      s = 1.3 - i * 0.25;
      r = [t * 0.2, t * 0.3, 0];
    } else {
      p = [-w * 0.7, 0.4, -2.5];
      r = [1.2 + i * 0.7 + t * 0.4 * (i + 1) * 0.5, i * 0.9 + t * 0.3, t * 0.2];
      s = 1.25 + i * 0.35;
    }
  } else if (chapter === "demo" || chapter === "how") {
    // A carousel: cards circle the middle, keys below and rings above.
    const share =
      kind === "card"
        ? i / shapeCounts.card
        : kind === "key"
          ? (i + 0.5) / shapeCounts.key
          : i / shapeCounts.ring;
    const angle = share * Math.PI * 2 + t * (kind === "card" ? 0.18 : -0.22);
    const radius = kind === "card" ? 1 : 0.8;
    const lift = kind === "key" ? -2.4 : kind === "card" ? 0.6 : 2.6;
    p = [
      Math.cos(angle) * w * 0.92 * radius,
      Math.sin(angle * 2) * 0.9 + lift,
      -4 + Math.sin(angle) * 3.2,
    ];
    r = [0.25, -angle + Math.PI / 2, 0.1];
    if (kind === "hook") {
      p = [w * 0.86, -2.6, -1];
      r = [0, t * 0.6, 0.2];
    } else if (kind === "blob") {
      p = [side(i) * w * 0.95, -2.6 + i * 2.2, -5];
      s = 1.1;
    } else if (kind === "ring") {
      p = [side(i) * w * 0.82, side(i) * 1.6, -3];
      r = [Math.PI / 2 + i * 0.3 + t * 0.3, t * 0.2 * (i + 1), 0];
      s = 1.2;
    }
  } else if (chapter === "features") {
    // Scattered and drifting, pushed out of the middle third.
    const gx = ((seed * 7.3) % 1) * 2 - 1;
    const gy = ((seed * 3.1) % 1) * 2 - 1;
    p = [gx * w * 1.05, gy * 4 + Math.sin(t * 0.6 + seed) * 0.4, -3 - ((seed * 5.7) % 1) * 6];
    if (Math.abs(p[0]) < w * 0.5) p[0] = (p[0] < 0 ? -1 : 1) * (w * 0.5 + Math.abs(p[0]) * 0.5);
    r = [t * 0.2 + seed, t * 0.25 + seed * 2, seed];
    if (kind === "blob") s = 0.9;
  } else if (chapter === "privacy") {
    // A gyroscope of rings around one blob; everything else leaves to the right.
    const centre: Vec3 = [w * 0.8, 1.7, -1.5];
    if (kind === "ring") {
      p = centre;
      r = [t * (0.5 + i * 0.25) + i, t * (0.35 + i * 0.2), i * 0.8];
      s = 1.1 + i * 0.32;
    } else if (kind === "blob" && i === 0) {
      p = centre;
      s = 0.75;
      r = [0, t * 0.3, 0];
    } else {
      p = [w * 1.6 + (seed % 3), -2 + (seed % 4), -6];
      r = [seed + t * 0.2, seed, 0];
      s = 0.6;
    }
  } else {
    // "free": everything rains down, spinning.
    const fall = (seed * 0.37 + t * (0.18 + (seed % 1) * 0.12)) % 1;
    p = [
      side(Math.floor(seed)) * (w * 0.55 + (seed % 3) * w * 0.18),
      6.2 - fall * 12.4,
      -2 - (seed % 5),
    ];
    r = [t * (0.6 + (seed % 1)) + seed, t * (0.8 + (seed % 0.5)) + seed, t * 0.3];
    if (kind === "ring" || kind === "blob") s = 0.7;
  }
  return { position: p, rotation: r, scale: s };
}

/**
 * The pose a shape eases towards. Whatever the chapter, shapes are pushed out to the screen edges
 * (the canvas mask hides the middle), so they never sit behind text.
 */
export function pose(chapter: ChapterId, shape: Shape, t: number, aspect: number): Pose {
  const w = halfWidth(aspect);
  const result = rawPose(chapter, shape, t, w);
  // On a tall, narrow window the words span the whole width, so shapes only peek in from the edges.
  const narrow = aspect < 0.8;
  const edge = w * (narrow ? 1.02 : 0.62);
  const x = result.position[0];
  if (Math.abs(x) < edge) {
    const sign = x < 0 || (x === 0 && shape.seed % 2 < 1) ? -1 : 1;
    result.position[0] = sign * (edge + Math.abs(x) * (narrow ? 0.1 : 0.35));
  }
  result.scale *= narrow ? 0.6 : 0.82;
  return result;
}
