"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type MouseEvent,
} from "react";

import { palettes, sections } from "../config";
import { applyPalette, readPalette, subscribePalette } from "../palette";

type Menu = "palette" | "index" | null;

/** Each palette's swatch: half ink, half paper. */
const swatches: Record<string, CSSProperties> = Object.fromEntries(
  palettes.map(({ id, paper, ink }) => [
    id,
    { background: `conic-gradient(${ink} 0 50%, ${paper} 0 100%)` },
  ]),
);

// The server cannot know the visitor's palette; React reads it right after hydration (aria-checked only).
const serverPalette = () => undefined;

/** The side rail (a pill on phones): section links, reading progress, the palette and index menus. */
export function Rail() {
  const palette = useSyncExternalStore(subscribePalette, readPalette, serverPalette);
  const [menu, setMenu] = useState<Menu>(null);
  const [active, setActive] = useState<string | null>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const paletteButton = useRef<HTMLButtonElement>(null);
  const indexButton = useRef<HTMLButtonElement>(null);
  const palettePop = useRef<HTMLDivElement>(null);
  const indexPop = useRef<HTMLDivElement>(null);

  // An open menu closes on Escape or a click anywhere outside it and its button.
  useEffect(() => {
    if (!menu) return undefined;
    const [button, pop] =
      menu === "palette" ? [paletteButton, palettePop] : [indexButton, indexPop];
    const onClick = (event: globalThis.MouseEvent) => {
      const target = event.target instanceof Node ? event.target : null;
      if (!pop.current?.contains(target) && !button.current?.contains(target)) setMenu(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(null);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  // Marks the section crossing a line ~30% down the viewport (the last one at the very bottom),
  // and moves the progress line. A clicked in-page link stays marked until the page scrolls on.
  useEffect(() => {
    const targets = sections.flatMap(({ id }) => document.getElementById(id) ?? []);
    let pinned: string | null = null;
    let pinY = 0;
    const onScroll = () => {
      const root = document.documentElement;
      const max = root.scrollHeight - innerHeight;
      progress.current?.style.setProperty("--p", max > 0 ? (scrollY / max).toFixed(4) : "0");
      if (pinned && Math.abs(scrollY - pinY) < 40) return setActive(pinned);
      pinned = null;
      const line = Math.min(innerHeight * 0.3, 160);
      let id: string | null = null;
      for (const el of targets) if (el.getBoundingClientRect().top <= line) id = el.id;
      if (innerHeight + scrollY >= root.scrollHeight - 2) id = targets.at(-1)?.id ?? id;
      setActive(id);
    };
    const onClick = (event: globalThis.MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a[href^="#"]') : null;
      const id = link?.getAttribute("href")?.slice(1);
      if (!id || !targets.some((el) => el.id === id)) return;
      // After the browser has jumped to the anchor.
      setTimeout(() => {
        pinned = id;
        pinY = scrollY;
        onScroll();
      }, 0);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    document.addEventListener("click", onClick);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  const toggleIndex = useCallback(() => setMenu((open) => (open === "index" ? null : "index")), []);
  const togglePalette = useCallback(
    () => setMenu((open) => (open === "palette" ? null : "palette")),
    [],
  );
  const closeMenu = useCallback(() => setMenu(null), []);
  const pick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const next = palettes.find(({ id }) => id === event.currentTarget.dataset["palette"]);
    if (next && next.id !== readPalette()) applyPalette(next.id);
  }, []);

  return (
    <>
      <nav className="rail" aria-label="Sections">
        <a className="rail-mark" href="#top" aria-label="vg, back to top">
          vg
        </a>
        <ol className="rail-links">
          {sections.map(({ id, name }) => (
            <li key={id}>
              <a href={`#${id}`} className={active === id ? "on" : undefined}>
                {name}
              </a>
            </li>
          ))}
        </ol>
        <div className="rail-foot">
          <div className="rail-prog" aria-hidden="true">
            <span ref={progress} />
          </div>
          <button
            ref={indexButton}
            className="rail-btn rail-index"
            type="button"
            aria-haspopup="true"
            aria-expanded={menu === "index"}
            aria-controls="pop-index"
            onClick={toggleIndex}
          >
            Index
          </button>
          <button
            ref={paletteButton}
            className="rail-btn"
            type="button"
            aria-haspopup="true"
            aria-expanded={menu === "palette"}
            aria-controls="pop-palette"
            aria-label="Choose colours"
            onClick={togglePalette}
          >
            <span className="swatch" aria-hidden="true" />
          </button>
        </div>
      </nav>
      <div
        ref={palettePop}
        className="pop"
        id="pop-palette"
        role="menu"
        aria-label="Colours"
        hidden={menu !== "palette"}
      >
        <h2>Pick a paper</h2>
        {palettes.map(({ id, name }) => (
          <button
            key={id}
            type="button"
            role="menuitemradio"
            aria-checked={palette === id}
            data-palette={id}
            onClick={pick}
          >
            <span className="sw" style={swatches[id]} />
            {name}
            <span className="tick" aria-hidden="true">
              ✓
            </span>
          </button>
        ))}
      </div>
      <div ref={indexPop} className="pop pop-index" id="pop-index" hidden={menu !== "index"}>
        <h2>Index</h2>
        {/* Following a link closes the menu; keyboard activation fires the same click. */}
        {sections.map(({ id, name }) => (
          <a key={id} href={`#${id}`} onClick={closeMenu}>
            {name}
          </a>
        ))}
      </div>
    </>
  );
}
