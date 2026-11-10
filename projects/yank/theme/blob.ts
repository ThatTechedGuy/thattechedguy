/** The wobbly blob that reveals the new theme, as clip-path polygon keyframes. */

const POINTS = 44;
const FRAMES = 28;

/** The blob outline at time t (0 to 1), centred on (x, y) and grown to cover radius R. */
function blobAt(t: number, x: number, y: number, radius: number): string {
  const eased = 1 - (1 - t) ** 2.3;
  const base = (radius * 1.08 + 30) * eased;
  // The wobble is strongest at the start and settles into a circle.
  const wobble = 0.24 * (1 - t) ** 0.9;
  const points: string[] = [];
  for (let k = 0; k < POINTS; k++) {
    const angle = (k / POINTS) * Math.PI * 2;
    const r =
      base *
      (1 + wobble * (0.62 * Math.sin(5 * angle + t * 9) + 0.38 * Math.sin(3 * angle - t * 6.5)));
    points.push(
      `${(x + Math.cos(angle) * r).toFixed(1)}px ${(y + Math.sin(angle) * r).toFixed(1)}px`,
    );
  }
  return `polygon(${points.join(",")})`;
}

/** Keyframes for the growing blob. `withFilter` adds the colour shimmer used on the new-theme snapshot. */
export function blobFrames(x: number, y: number, radius: number, withFilter: boolean): Keyframe[] {
  const frames: Keyframe[] = [];
  for (let q = 0; q <= FRAMES; q++) {
    const t = q / FRAMES;
    const frame: Keyframe = { clipPath: blobAt(t, x, y, radius), offset: t };
    if (withFilter) {
      frame["filter"] =
        `saturate(${(2.4 - 1.4 * t).toFixed(2)}) hue-rotate(${(-70 * (1 - t)).toFixed(1)}deg)`;
    }
    frames.push(frame);
  }
  return frames;
}
