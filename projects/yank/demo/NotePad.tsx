import type { MouseEventHandler } from "react";

import { FileGlyph } from "./ClipCard";
import type { Pasted } from "./clips";

function PastedChip({ note }: { note: Pasted }) {
  // Pasting keeps formatting: text stays serif and links stay blue and underlined, unless pasted plain.
  const rich = !note.plain;
  const textClass =
    rich && note.kind === "text"
      ? "font-serif text-ink"
      : rich && note.kind === "link"
        ? "font-sans text-accent underline"
        : "font-sans text-ink";
  return (
    <span className="inline-flex items-center gap-8 rounded-[10px] border border-hair2 bg-chip px-12 py-6">
      {note.kind === "color" && (
        // oxlint-disable-next-line react-perf/jsx-no-new-object-as-prop -- the swatch is the pasted colour.
        <span className="size-18 rounded-[5px]" style={{ background: note.hex }} />
      )}
      {note.kind === "image" && (
        <span className="h-24 w-34 rounded-[5px] border border-[#D2D2D7] bg-[#FFE9CC]" />
      )}
      {note.kind === "file" && <FileGlyph size="small" />}
      <span className={`whitespace-pre-line ${textClass}`}>{note.text}</span>
      {note.plain && (
        <span className="rounded-[6px] border border-[#D2D2D7] px-6 py-1 text-[11px] text-muted">
          no formatting
        </span>
      )}
    </span>
  );
}

/** "Trip notes": the window the demo pastes into. */
export function NotePad({ notes, onClear }: { notes: Pasted[]; onClear: MouseEventHandler }) {
  return (
    <div className="glass-card flex min-h-150 flex-col gap-10 rounded-[22px] px-22 py-18 shadow-[inset_0_1px_0_var(--gi),0_20px_50px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-10">
        <span className="size-12 rounded-full bg-[#FF5F57]" />
        <span className="size-12 rounded-full bg-[#FEBC2E]" />
        <span className="size-12 rounded-full bg-[#28C840]" />
        <span className="ml-8 text-[15px] font-semibold text-muted">Trip notes</span>
        <span className="ml-auto text-[13px] text-muted">
          Notes · {notes.length === 1 ? "1 paste" : `${notes.length} pastes`}
        </span>
        <button
          type="button"
          onClick={onClear}
          className="min-h-36 cursor-pointer rounded-full border-0 bg-[rgba(118,118,128,0.12)] px-14 font-sans text-[13px] font-semibold text-ink"
        >
          Clear
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-x-10 gap-y-8 text-[17px] leading-normal">
        {notes.length === 0 && (
          <span className="text-muted">
            Nothing pasted yet. Pick a card below and press Paste, Return, or double-click it.
          </span>
        )}
        {notes.map((note) => (
          <PastedChip key={note.key} note={note} />
        ))}
        <span aria-hidden="true" className="inline-block h-22 w-2 bg-accent" />
      </div>
    </div>
  );
}
