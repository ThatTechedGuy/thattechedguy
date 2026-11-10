"use client";

import { useRef, useState } from "react";

import { chapters } from "../config";
import { usePullCord } from "./usePullCord";

/**
 * The alternative navigation (nav: "tab"): a glass ball on a string in the top-right corner.
 * Pull it down, or click it, to drop a full-screen menu of the chapters. Styles: pull-cord.css.
 */
export function PullCord() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  usePullCord(rootRef, setOpen);

  return (
    <div ref={rootRef}>
      <nav
        id="cord-menu"
        aria-label="Main"
        inert={!open}
        className={`cord-menu fixed inset-0 z-9994 flex flex-col justify-center overflow-y-auto bg-overlay px-[8vw] pt-110 pb-48 text-ink ${open ? "is-open" : ""}`}
      >
        {chapters.map((chapter, index) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className="cord-menu-link flex items-baseline gap-24 border-b border-hair2 py-8 font-sans text-[clamp(36px,7vh,88px)] leading-[1.08] font-bold tracking-[-0.035em] text-ink no-underline"
          >
            <span className="font-mono text-[14px] font-semibold tracking-normal opacity-70">
              {String(index + 1).padStart(2, "0")}
            </span>
            {chapter.label}
          </a>
        ))}
        <p className="mt-32 mb-0 font-mono text-[14px] opacity-80">
          Free and open source · macOS 26.4 or later
        </p>
      </nav>
      <div data-cord="" className="cord fixed top-0 right-28 z-9995 h-0 w-64">
        <div data-cord-swing="" className="absolute top-0 left-0 h-0 w-64 origin-[32px_0]">
          <div className="cord-tug absolute top-0 left-0 h-0 w-64">
            <span
              data-cord-string=""
              className="absolute top-0 left-[30.5px] h-56 w-3 rounded-b-[2px] bg-ink"
            />
            <svg
              aria-hidden="true"
              width="80"
              height="80"
              viewBox="0 0 80 80"
              className="cord-ring pointer-events-none absolute top-34 -left-8 overflow-visible"
            >
              <defs>
                <path id="cord-ring-path" d="M40 40 m-35 0 a35 35 0 1 1 70 0 a35 35 0 1 1 -70 0" />
              </defs>
              <text className="fill-accent font-sans text-[7.5px] font-bold tracking-[0.12em] uppercase">
                <textPath href="#cord-ring-path" textLength="216" lengthAdjust="spacing">
                  Pull me · Yank me · Drag me ·
                </textPath>
              </text>
            </svg>
            <button
              type="button"
              data-cord-knob=""
              data-cursor="Pull"
              aria-controls="cord-menu"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="cord-knob absolute top-48 left-6 size-52 cursor-grab touch-none border-0 bg-transparent p-0 select-none"
            >
              <span className="cord-ball absolute inset-5 flex items-center justify-center rounded-full">
                <span aria-hidden="true" className="cord-glyph relative block h-16 w-18 text-ink">
                  <span className="cord-bar cord-bar-1" />
                  <span className="cord-bar cord-bar-2" />
                  <span className="cord-bar cord-bar-3" />
                </span>
              </span>
            </button>
            <span
              data-cord-say=""
              aria-live="polite"
              className="cord-say absolute top-60 right-64 rounded-[14px] bg-accent px-13 py-7 font-sans text-[13px] font-semibold whitespace-nowrap text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
