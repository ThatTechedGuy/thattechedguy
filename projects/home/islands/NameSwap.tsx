"use client";

import { useEffect, useState } from "react";

import { prefersReducedMotion } from "@/lib/motion/media";

const names = ["Vishal Gupta", "ThatTechedGuy"] as const;

interface Frame {
  text: string;
  /** The second name is set in italic. */
  alt: boolean;
  /** The strike-through line is drawn. */
  strike: boolean;
  /** Typing or deleting: the caret stops blinking. */
  busy: boolean;
  /** Milliseconds until the next frame; null is a random typing pause. */
  hold: number | null;
}

/** One full loop: hold, strike, delete letter by letter, then type the other name, for each name. */
const frames: Frame[] = [];
names.forEach((name, from) => {
  const next = names[1 - from] ?? "";
  const alt = from === 1;
  const busy = { strike: false, busy: true };
  frames.push({ text: name, alt, strike: false, busy: false, hold: from === 0 ? 3200 : 2600 });
  frames.push({ text: name, alt, strike: true, busy: true, hold: 750 });
  for (let k = name.length - 1; k >= 0; k--)
    frames.push({ text: name.slice(0, k), alt, ...busy, hold: 38 });
  frames.push({ text: "", alt: !alt, ...busy, hold: 180 });
  // The last letter is the next loop's first frame.
  for (let k = 1; k < next.length; k++)
    frames.push({ text: next.slice(0, k), alt: !alt, ...busy, hold: null });
});

const FIRST_PAUSE = 1200;

/**
 * The hero's name line: strikes through one name, deletes it and types the other, forever.
 * The CSS reserves the longer name's width (.swap::before/::after), so typing never reflows the intro.
 * Screen readers get the .sr-only sentence beside it instead.
 */
export function NameSwap() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const frame = frames[step] ?? frames[0];

  useEffect(() => {
    if (!frame || prefersReducedMotion()) return undefined;
    const hold = frame.hold ?? 70 + Math.random() * 60;
    const timer = setTimeout(
      () => {
        setStarted(true);
        setStep((current) => (current + 1) % frames.length);
      },
      started ? hold : FIRST_PAUSE + hold,
    );
    return () => clearTimeout(timer);
  }, [frame, started]);

  const className = ["swap", frame?.alt && "alt", frame?.strike && "strike", frame?.busy && "busy"]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className} aria-hidden="true">
      <span className="swap-line">
        <span className="swap-txt">{frame?.text}</span>
        <span className="caret" />,
      </span>
    </span>
  );
}
