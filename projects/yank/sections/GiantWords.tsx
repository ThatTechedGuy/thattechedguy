import { PatternCanvas } from "../patterns/PatternCanvas";

/** Two huge lines that slide in opposite directions as you scroll (--p). Decorative. */
export function GiantWords() {
  return (
    <section
      aria-hidden="true"
      data-d3-quiet=""
      data-scroll=""
      data-bg="#1C1C1E"
      data-bg-dark="#1C1C1E"
      data-fg="#F5F5F7"
      data-fg-dark="#F5F5F7"
      className="relative isolate overflow-hidden pt-150 pb-40"
    >
      <PatternCanvas kind="dither" colour="#3A3A3C" alpha={0.9} />
      <div className="giant-line giant-line-1">
        <span className="grad-text">Copy. Keep. Find. Paste. Copy. Keep. Find. Paste.</span>
      </div>
      <div className="giant-line giant-line-2">
        copy, keep, find, paste, copy, keep, find, paste,
      </div>
    </section>
  );
}
