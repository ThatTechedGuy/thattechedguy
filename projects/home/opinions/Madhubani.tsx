import type { MotifId } from "./art";
// The art is static markup checked in from art.ts, never user input.
import { frieze, motifDefs, painting } from "./art";

/** The fill patterns and motif symbols. Rendered once per page, before anything that uses them. */
export function MotifDefs() {
  return (
    <svg
      className="mb mb-defs"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={motifDefs}
    />
  );
}

/** One long painting down the right-hand side (900px and wider), drifting with the scroll (stack.css). */
export function Painting() {
  return <div className="mb-band" aria-hidden="true" dangerouslySetInnerHTML={painting} />;
}

/** On phones, the painting runs left to right across the top of the page and scrolls by itself. */
export function Frieze() {
  return <div className="mb-frieze" aria-hidden="true" dangerouslySetInnerHTML={frieze} />;
}

/** One motif at any size. */
export function Motif({ id }: { id: MotifId }) {
  return (
    <svg className="mb mbi" viewBox="0 0 200 200" aria-hidden="true">
      <use href={`#mb-${id}`} />
    </svg>
  );
}
