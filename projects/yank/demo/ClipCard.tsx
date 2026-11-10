import type { MouseEvent } from "react";

import type { Clip, ClipKind } from "./clips";

/** Each kind's coloured header strip. */
const headClass: Record<ClipKind, string> = {
  // A shade darker than the accent: white 12px text on #0A84FF is 3.6:1, below WCAG AA; #0071E3 is 4.7:1.
  link: "bg-[#0071E3] text-white",
  text: "bg-[#F2F2F7] text-graphite",
  image: "bg-[#FFE9CC] text-graphite",
  color: "bg-graphite text-white",
  file: "bg-[#E5E5EA] text-graphite",
};

export function FileGlyph({ size }: { size: "small" | "large" }) {
  return size === "small" ? (
    <svg aria-hidden="true" width="16" height="20" viewBox="0 0 64 80">
      <path d="M6 4h36l16 16v54a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#1D1D1F" />
    </svg>
  ) : (
    <svg aria-hidden="true" width="52" height="66" viewBox="0 0 64 80" fill="none">
      <path d="M6 4h36l16 16v54a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="#1D1D1F" />
      <path d="M42 4v16h16" fill="#6E6E73" />
      <rect x="14" y="46" width="36" height="12" rx="3" fill="#FFFFFF" />
    </svg>
  );
}

function ClipBody({ clip }: { clip: Clip }) {
  switch (clip.kind) {
    case "text":
      return (
        <span className="font-serif text-[20px] leading-[1.25] whitespace-pre-line">
          {clip.body}
        </span>
      );
    case "link":
      return (
        <>
          <span className="flex h-76 items-end rounded-[10px] bg-[linear-gradient(135deg,#64D2FF,#0A84FF)] p-10">
            <span className="font-serif text-[21px] text-white italic">{clip.preview}</span>
          </span>
          <span className="text-[15px] leading-[1.3] font-semibold">{clip.body}</span>
          <span className="text-[13px] text-muted">{clip.domain}</span>
        </>
      );
    case "color":
      return (
        <>
          {/* oxlint-disable-next-line react-perf/jsx-no-new-object-as-prop -- the swatch is the clip's own colour. */}
          <span className="flex-1 rounded-[10px]" style={{ background: clip.hex }} />
          <span className="text-[16px] font-semibold">{clip.hex}</span>
        </>
      );
    case "image":
      return (
        <>
          <span className="flex flex-1 flex-col gap-8 rounded-[10px] bg-[#FFE9CC] p-12">
            <span className="font-serif text-[21px] text-[#1D1D1E]">{clip.preview}</span>
            <span className="h-7 w-[80%] rounded-[4px] bg-[#F5C99B]" />
            <span className="h-7 w-[60%] rounded-[4px] bg-[#F5C99B]" />
          </span>
          <span className="text-[13px] text-muted">{clip.body}</span>
        </>
      );
    default: // file
      return (
        <>
          <span className="flex flex-1 items-center justify-center">
            <FileGlyph size="large" />
          </span>
          <span className="text-[15px] font-semibold">{clip.body}</span>
          <span className="text-[13px] text-muted">{clip.domain}</span>
        </>
      );
  }
}

interface ClipCardProps {
  clip: Clip;
  /** 1–9 for the first nine cards: the key that pastes it. */
  badge: string;
  selected: boolean;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
  onPaste: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * One copy in the strip. Its visible text is its accessible name (WCAG 2.5.3) and aria-pressed says
 * which card is selected. The handlers are shared by every card and read the clip from data-clip.
 */
export function ClipCard({ clip, badge, selected, onSelect, onPaste }: ClipCardProps) {
  return (
    <button
      type="button"
      data-clip={clip.id}
      onClick={onSelect}
      onDoubleClick={onPaste}
      aria-pressed={selected}
      className={`relative flex h-236 w-210 flex-none cursor-pointer flex-col overflow-hidden rounded-[18px] border-2 bg-surf p-0 text-left font-sans text-ink shadow-[0_1px_2px_rgba(0,0,0,0.06),0_10px_24px_rgba(0,0,0,0.07)] transition-[transform,border-color] duration-[140ms,100ms] ease-out ${selected ? "-translate-y-6 border-accent" : "border-cardb"}`}
    >
      <span
        className={`flex items-center justify-between gap-8 px-13 py-10 text-[12px] ${headClass[clip.kind]}`}
      >
        <span className="font-semibold">{clip.kindLabel}</span>
        <span className="opacity-85">{badge}</span>
      </span>
      <span className="flex min-h-0 flex-1 flex-col gap-8 overflow-hidden px-13 py-12">
        <ClipBody clip={clip} />
      </span>
      <span className="flex justify-between border-t border-hair2 px-13 py-9 text-[12px] text-muted">
        <span>{clip.app}</span>
        <span>{clip.time}</span>
      </span>
    </button>
  );
}
