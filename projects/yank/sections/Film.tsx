import type { ReactNode } from "react";

import { PatternCanvas } from "../patterns/PatternCanvas";
import { FilmCaption } from "./FilmCaption";

const address = "221 Maple St, Apt 4";

/** The cards in the Yank strip. The ring stops on the third one; film.css moves it by the same `left` values. */
const stripCards = [
  { kind: "Link", text: "Lakeside cabin", left: "left-[1.5%]" },
  { kind: "Text", text: "Meet at 4…", left: "left-[21%]" },
  { kind: "Text", text: address, left: "left-[40.5%]" },
  { kind: "Color", text: "Swatch", left: "left-[60%]" },
  { kind: "File", text: "Tickets.pdf", left: "left-[79.5%]" },
];

const keycap =
  "absolute top-[42%] left-1/2 px-[0.9em] py-[0.5em] text-[2.6em] font-bold text-white opacity-0";
const darkKeycap = `${keycap} rounded-[0.7em] border border-[rgba(255,255,255,0.2)] bg-[rgba(29,29,31,0.82)] shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_0.6em_1.4em_rgba(0,0,0,0.35)] backdrop-blur-[16px]`;

function AppWindow({
  app,
  className,
  children,
}: {
  app: string;
  className: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-[1em] bg-surf2 px-[1.4em] py-[1.2em] shadow-[inset_0_1px_0_#FFFFFF,0_1.5em_3em_rgba(0,0,0,0.25)] backdrop-blur-[20px] ${className}`}
    >
      <div className="mb-[1.2em] flex gap-[0.45em]">
        <span className="size-[0.8em] rounded-full bg-[#FF5F57]" />
        <span className="size-[0.8em] rounded-full bg-[#FEBC2E]" />
        <span className="size-[0.8em] rounded-full bg-[#28C840]" />
        <span className="ml-auto text-[0.8em] text-muted">{app}</span>
      </div>
      {children}
    </div>
  );
}

function PlaceholderLine({ className }: { className: string }) {
  return <span className={`block h-[0.6em] rounded-[0.3em] bg-hair2 ${className}`} />;
}

/** "See it in twelve seconds": a looping CSS film of copying in Notes and pasting in Mail (film.css). */
export function Film() {
  return (
    <section
      data-bg="#EAF3EE"
      data-bg-dark="#08140F"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="relative isolate mx-auto max-w-1320 px-32 pt-150"
    >
      <PatternCanvas kind="contours" colour="#0A9F49" alpha={0.3} />
      <div className="mb-48 flex flex-wrap items-end justify-between gap-28">
        <div>
          <p data-reveal="" className="mt-0 mb-14 text-[17px] font-semibold text-eyebrow-green">
            Watch
          </p>
          <h2 data-reveal="" className="display m-0 text-[clamp(44px,6.4vw,100px)]">
            See it in <span className="grad-text">twelve seconds.</span>
          </h2>
        </div>
        <p data-reveal="" className="m-0 max-w-380 text-[19px] leading-normal text-lead">
          Copy an address in Notes. Press ⇧⌘V in Mail. Pick it. Done.
        </p>
      </div>
      <figure
        data-reveal=""
        data-cursor="Watch"
        className="glass-card m-0 overflow-hidden rounded-[30px]"
      >
        {/* Sized in em, so the one font size below scales the whole film with the viewport. */}
        <div
          // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- drawn with CSS, so there is no <img> to use.
          role="img"
          aria-label="Animation: an address is copied in Notes, then pasted into an email with Yank"
          className="wallpaper relative aspect-video w-full overflow-hidden font-sans text-[clamp(8px,1.25vw,17px)] text-ink"
        >
          <AppWindow app="Notes" className="top-[8%] left-[5%] h-[52%] w-[44%]">
            <p className="mt-0 mb-[0.6em] font-serif text-[1.9em] font-semibold">Trip notes</p>
            <p className="m-0 text-[1.15em] whitespace-nowrap">
              Hotel:{" "}
              <span className="relative inline-block">
                <span className="film-highlight absolute -top-[0.1em] -bottom-[0.1em] -left-[0.15em] w-0 rounded-[0.25em] bg-accent opacity-35" />
                <span className="relative">{address}</span>
              </span>
            </p>
            <PlaceholderLine className="mt-[1.1em] w-4/5" />
            <PlaceholderLine className="mt-[0.7em] w-[64%]" />
            <PlaceholderLine className="mt-[0.7em] w-[72%]" />
          </AppWindow>
          <AppWindow app="Mail" className="top-[14%] left-[53%] h-1/2 w-[42%]">
            <p className="m-0 border-b border-hair2 py-[0.5em] text-muted">
              To: <span className="text-ink">Sam</span>
            </p>
            <p className="m-0 border-b border-hair2 py-[0.5em] text-muted">
              Subject: <span className="text-ink">Our trip</span>
            </p>
            <p className="mt-[0.9em] mb-0 text-[1.1em] leading-normal whitespace-nowrap">
              The hotel is at{" "}
              <span className="film-type inline-block max-w-0 overflow-hidden align-bottom font-semibold whitespace-nowrap">
                {address}
              </span>
              <span className="film-caret inline-block h-[1.1em] w-2 bg-graphite align-[-0.15em]" />
            </p>
          </AppWindow>

          <span className={`film-key-1 ${darkKeycap}`}>⌘C</span>
          <span
            className={`film-key-2 ${keycap} rounded-[0.6em] bg-accent shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_0.6em_1.4em_rgba(0,0,0,0.35)]`}
          >
            ⇧⌘V
          </span>
          <span className={`film-key-3 ${darkKeycap}`}>Return</span>

          {/* `transform`, not Tailwind's `translate`: the keyframes animate transform and must replace this. */}
          <div className="film-panel absolute inset-x-[3%] bottom-[3%] h-[30%] [transform:translateY(120%)] rounded-[1.4em] border border-[rgba(255,255,255,0.75)] bg-[rgba(255,255,255,0.42)] shadow-[0_-1em_3em_rgba(0,0,0,0.2)] backdrop-blur-[24px] backdrop-saturate-[190%]">
            {stripCards.map((card) => (
              <span
                key={card.text}
                className={`absolute top-[14%] flex h-[72%] w-[17.5%] flex-col gap-[0.4em] rounded-[0.7em] border border-[rgba(255,255,255,0.9)] bg-surf p-[0.7em] text-ink shadow-[0_0.2em_0.6em_rgba(0,0,0,0.1)] ${card.left}`}
              >
                <span className="text-[0.75em] font-bold text-muted">{card.kind}</span>
                <span className="text-[0.95em] leading-[1.2] font-semibold">{card.text}</span>
              </span>
            ))}
            <span className="film-ring absolute top-[11%] left-[1.5%] -ml-[0.3%] h-[78%] w-[17.5%] rounded-[0.9em] border-[0.25em] border-accent" />
          </div>

          <span className="film-fly absolute top-[72%] left-[42%] h-1/5 w-[16%] origin-top-left rounded-[0.7em] border-[0.2em] border-accent bg-white p-[0.7em] font-semibold text-[#1D1D1E] opacity-0">
            {address}
          </span>
          <span className="film-pointer absolute top-[80%] left-[30%] size-[1.6em]">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-full drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
            >
              <path
                d="M5 3l14 8-6 1.6L10 19z"
                fill="#1D1D1F"
                stroke="#FFFFFF"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <FilmCaption />
      </figure>
    </section>
  );
}
