export type PatternKind =
  | "dots"
  | "grid"
  | "orbits"
  | "contours"
  | "flow"
  | "rain"
  | "dither"
  | "paper";

interface PatternCanvasProps {
  kind: PatternKind;
  /** A hex colour, or "ink" for the current theme's text colour. */
  colour: `#${string}` | "ink";
  /** The second colour; defaults to the accent. */
  colour2?: `#${string}`;
  alpha: number;
  /** Where it sits: behind a whole section, behind the hero, or inside a card. */
  placement?: "section" | "hero" | "card";
}

/**
 * The canvas for an animated background pattern. It is empty until the pattern island
 * (patterns/Patterns.tsx) finds it by its data attributes and starts drawing.
 */
export function PatternCanvas({
  kind,
  colour,
  colour2,
  alpha,
  placement = "section",
}: PatternCanvasProps) {
  return (
    <canvas
      aria-hidden="true"
      className={`pattern pattern-${placement}`}
      data-pattern={kind}
      data-c1={colour}
      data-c2={colour2}
      data-alpha={alpha}
    />
  );
}
