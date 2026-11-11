/** The dashed stamp beside copy Vish hasn't confirmed yet. */
export function Draft({ when = true }: { when?: boolean | undefined }) {
  return when ? <span className="draft">Draft</span> : null;
}
