import type { MotifId } from "./madhubani";
import { frieze, leftStrip, motifDefs, rightStrip } from "./madhubani";

// The art is static markup generated from simple shapes (see madhubani.ts), never user input.
const defs = { __html: motifDefs };
const left = { __html: leftStrip };
const right = { __html: rightStrip };
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

/** The fixed borders down both sides (900px and wider). islands/Drift.tsx moves them with the scroll. */
export function Borders() {
  return (
    <>
      <div className="mb-band l" aria-hidden="true" dangerouslySetInnerHTML={left} />
      <div className="mb-band r" aria-hidden="true" dangerouslySetInnerHTML={right} />
    </>
  );
}

/** On phones, the borders become a strip of tiles under the intro that scrolls by itself. */
export function Frieze() {
  return <div className="mb-frieze" aria-hidden="true" dangerouslySetInnerHTML={row} />;
}

/** One motif at any size. */
export function Motif({ id }: { id: MotifId }) {
  return (
    <svg className="mb mbi" viewBox="0 0 120 120" aria-hidden="true">
      <use href={`#mb-${id}`} />
    </svg>
  );
}
