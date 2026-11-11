/** The dashed stamp beside unconfirmed copy (see stack.ts). Remove the `draft` flag and it goes. */
export function Draft() {
  return (
    <span className="draft" title="Placeholder copy, waiting for Vish to confirm or rewrite it">
      Draft
    </span>
  );
}

/** Shown in place of copy that hasn't been written yet. */
export function Gap() {
  return <span className="gap">To be written</span>;
}
