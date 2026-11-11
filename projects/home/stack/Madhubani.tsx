import type { MotifId } from "./madhubani";
import { frieze, motifDefs, painting } from "./madhubani";

// The art is static markup generated from simple shapes (see madhubani.ts), never user input.
const defs = { __html: motifDefs };
const strip = { __html: painting };
const row = { __html: frieze };

/** The fill patterns and motif symbols. Rendered once per page, before anything that uses them. */
export function MotifDefs() {
  return (
    <svg
      className="mb mb-defs"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={defs}
    />
  );
}

/** One long painting down the right-hand side (900px and wider). islands/Drift.tsx moves it with the scroll. */
export function Painting() {
  return <div className="mb-band" aria-hidden="true" dangerouslySetInnerHTML={strip} />;
}

/** On phones, the painting runs left to right under the intro and scrolls by itself. */
export function Frieze() {
  return <div className="mb-frieze" aria-hidden="true" dangerouslySetInnerHTML={row} />;
}

/** One motif at any size. */
export function Motif({ id }: { id: MotifId }) {
  return (
    <svg className="mb mbi" viewBox="0 0 200 200" aria-hidden="true">
      <use href={`#mb-${id}`} />
    </svg>
  );
}
