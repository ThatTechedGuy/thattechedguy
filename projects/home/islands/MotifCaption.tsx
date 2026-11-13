"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { MotifId } from "../stack/art";
import { captions } from "../stack/captions";

type Shown = { id: MotifId; use: SVGUseElement | null; pinned: boolean; open: boolean };

const ART = ".mb-band, .mb-frieze";

/** The motif under a pointer event: events on a <use> retarget to it, and its href names the motif. Filler panels have no caption. */
const motifOf = (target: EventTarget | null) => {
  const use = target instanceof Element ? target.closest("use") : null;
  const id = use?.getAttribute("href")?.slice("#mb-".length);
  return use && isMotif(id) ? { use, id } : null;
};
const isMotif = (id: string | undefined): id is MotifId => !!id && Object.hasOwn(captions, id);

/**
 * The caption for a motif in the painting (Madhubani.tsx): shown on mouse hover, toggled by a click or tap,
 * closed by Escape or a tap elsewhere. One card for the band and the frieze, with listeners delegated
 * to their wrappers. It sits left of the band, or below the frieze, inside the viewport.
 */
export function MotifCaption() {
  const card = useRef<HTMLDivElement>(null);
  // The text stays after closing (open: false), so the card fades out with its words in it.
  const [shown, setShown] = useState<Shown | null>(null);

  useEffect(() => {
    const close = () => setShown((s) => s && { ...s, use: null, open: false });
    // Leaving a motif hides an unpinned caption; the cleared use lets the next hover reopen it.
    const leave = () =>
      setShown((s) => (s?.open && s.pinned ? s : s && { ...s, use: null, open: false }));
    const over = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const m = motifOf(event.target);
      if (!m) return leave();
      setShown((s) => (s?.use === m.use ? s : { ...m, pinned: false, open: true }));
    };
    const out = (event: PointerEvent) => {
      if (event.pointerType === "mouse") leave();
    };
    const click = (event: MouseEvent) => {
      const m = motifOf(event.target);
      if (!m) return close();
      setShown((s) =>
        // A mouse has already opened it on hover, so the first click pins it and the second closes it.
        s?.open && s.pinned && s.use === m.use
          ? { ...s, open: false }
          : { ...m, pinned: true, open: true },
      );
    };
    const outside = (event: PointerEvent) => {
      if (!(event.target instanceof Element && event.target.closest(ART))) close();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const wrappers = document.querySelectorAll<HTMLElement>(ART);
    for (const w of wrappers) {
      w.addEventListener("pointerover", over);
      w.addEventListener("pointerleave", out);
      w.addEventListener("click", click);
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      for (const w of wrappers) {
        w.removeEventListener("pointerover", over);
        w.removeEventListener("pointerleave", out);
        w.removeEventListener("click", click);
      }
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, []);

  const use = shown?.open ? shown.use : null;
  useLayoutEffect(() => {
    const c = card.current;
    const art = use?.closest(ART);
    if (!c || !use || !art) return undefined;
    // The band drifts as the page scrolls, so the card follows it, and closes once its motif is gone.
    const place = () => {
      const m = use.getBoundingClientRect();
      const box = art.getBoundingClientRect();
      const vw = document.documentElement.clientWidth;
      const vh = innerHeight;
      if (m.bottom < 0 || m.top > vh) return setShown((s) => s && { ...s, use: null, open: false });
      const [w, h, gap] = [c.offsetWidth, c.offsetHeight, 12];
      const band = art.classList.contains("mb-band");
      const x = band ? box.left - w - gap : m.left + m.width / 2 - w / 2;
      const y = band ? m.top + m.height / 2 - h / 2 : box.bottom + gap;
      c.style.left = `${Math.max(8, Math.min(x, vw - w - 8))}px`;
      c.style.top = `${Math.max(8, Math.min(y, vh - h - 8))}px`;
    };
    place();
    addEventListener("scroll", place, { passive: true });
    addEventListener("resize", place);
    return () => {
      removeEventListener("scroll", place);
      removeEventListener("resize", place);
    };
  }, [use]);

  return (
    <div ref={card} className="mb-cap" role="tooltip" data-open={use ? "" : undefined}>
      {shown && captions[shown.id]}
    </div>
  );
}
