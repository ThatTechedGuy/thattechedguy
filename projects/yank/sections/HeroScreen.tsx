import type { ReactNode } from "react";

import { Icon, type IconName } from "../icons/Icon";

/** The five cards in the looping Yank strip. `swatch` is the coloured preview block above the label. */
const stripCards: { kind: string; icon: IconName; source: string; body: ReactNode }[] = [
  {
    kind: "Text",
    icon: "text",
    source: "Messages · now",
    body: <span className="font-serif">Meet at 4 by the blue door.</span>,
  },
  {
    kind: "Link",
    icon: "link",
    source: "Safari · 2 min",
    body: (
      <>
        <Swatch className="bg-[linear-gradient(135deg,#64D2FF,var(--accent))]" />
        Lakeside cabin
      </>
    ),
  },
  {
    kind: "Image",
    icon: "image",
    source: "Photos · 9 min",
    body: (
      <>
        <Swatch className="bg-[linear-gradient(135deg,#FFD60A,#FF9F0A)]" />
        Boarding pass
      </>
    ),
  },
  {
    kind: "Color",
    icon: "color",
    source: "Pages · 14 min",
    body: (
      <>
        <Swatch className="bg-purple" />
        #BF5AF2
      </>
    ),
  },
  {
    kind: "File",
    icon: "file",
    source: "Finder · 1 hr",
    body: (
      <>
        Tickets.pdf
        <span className="block text-[0.85em] text-muted">PDF document</span>
      </>
    ),
  },
];

function Swatch({ className }: { className: string }) {
  return <span className={`mb-[0.35em] block h-[2.6em] rounded-[0.5em] ${className}`} />;
}

function Notification({
  className,
  tile,
  icon,
  title,
  time,
  text,
}: {
  className: string;
  tile: string;
  icon: IconName;
  title: string;
  time: string;
  text: string;
}) {
  return (
    <div
      className={`glass absolute z-3 flex w-300 origin-top items-start gap-12 rounded-[22px] px-14 py-12 ${className}`}
    >
      <span
        className={`flex size-38 flex-none items-center justify-center rounded-[10px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] ${tile}`}
      >
        <Icon name={icon} size={20} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-2 text-[13px] leading-[1.3] text-ink">
        <span className="flex justify-between gap-8">
          <b className="font-semibold">{title}</b>
          <span className="text-muted">{time}</span>
        </span>
        <span className="text-lead">{text}</span>
      </span>
    </div>
  );
}

const trafficLight = "size-[0.85em] rounded-full shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.2)]";
const tab = "rounded-full px-[0.8em] py-[0.35em]";

/** A drawing of a Mac screen with Notes open and the Yank strip rising from the bottom. Decorative. */
export function HeroScreen() {
  return (
    <div aria-hidden="true" className="relative mx-auto mt-72 max-w-1120 perspective-[1800px]">
      <Notification
        className="note-1 top-70 left-[-70px]"
        tile="tile-yellow"
        icon="clipboard"
        title="Yank"
        time="now"
        text="Saved from Notes: “221 Maple St, Apt 4”"
      />
      <Notification
        className="note-2 top-190 right-[-60px]"
        tile="tile-blue"
        icon="search"
        title="Found in a photo"
        time="1m ago"
        text="“Gate B12, 7:40” in your boarding pass"
      />
      <div className="hero-screen wallpaper relative aspect-[16/10] overflow-hidden rounded-[26px]">
        <div className="blob-2 absolute top-[-20%] left-[-10%] h-[90%] w-[70%] rounded-full bg-sky opacity-55 blur-[60px]" />
        <div className="blob-1 absolute right-[-10%] bottom-[-30%] h-[90%] w-[70%] rounded-full bg-pink opacity-45 blur-[70px]" />

        {/* menu bar */}
        <div className="absolute inset-x-0 top-0 flex h-[2.1em] items-center gap-[1.4em] bg-[rgba(255,255,255,0.22)] px-[1.2em] text-[0.85em] font-medium text-white backdrop-blur-[20px]">
          <b className="font-bold">Notes</b>
          <span>File</span>
          <span>Edit</span>
          <span>Format</span>
          <span>View</span>
          <span className="ml-auto flex items-center gap-[1em]">
            <Icon name="clipboard" size="1.25em" strokeWidth={2.2} />
            <span>Sun 9:41</span>
          </span>
        </div>

        {/* Notes window */}
        <div className="glass-card absolute top-[13%] left-[7%] flex h-[52%] w-[52%] flex-col overflow-hidden rounded-[1.1em]">
          <div className="flex items-center gap-[1em] border-b border-hair px-[1.1em] py-[0.9em]">
            <span className="flex flex-none gap-[0.5em]">
              <span className={`${trafficLight} bg-[#FF5F57]`} />
              <span className={`${trafficLight} bg-[#FEBC2E]`} />
              <span className={`${trafficLight} bg-[#28C840]`} />
            </span>
            <span className="text-[0.85em] font-semibold text-muted">Trip notes</span>
          </div>
          <div className="flex flex-col gap-[0.7em] px-[1.4em] py-[1.1em] text-ink">
            <span className="font-serif text-[1.9em] font-semibold">Trip notes</span>
            <span className="text-[1.05em]">
              Hotel:{" "}
              <span className="rounded-[0.2em] bg-[rgba(10,132,255,0.22)] px-[0.15em]">
                221 Maple St, Apt 4
              </span>
            </span>
            <span className="h-[0.55em] w-[82%] rounded-[0.3em] bg-hair2" />
            <span className="h-[0.55em] w-[64%] rounded-[0.3em] bg-hair2" />
            <span className="h-[0.55em] w-[72%] rounded-[0.3em] bg-hair2" />
          </div>
        </div>

        {/* the Yank strip */}
        <div className="strip-rise absolute inset-x-[2.5%] bottom-[2.5%] flex h-[34%] flex-col gap-[0.6em] rounded-[1.5em] border border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.4)] px-[1em] pt-[0.8em] pb-[1em] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_-1em_3em_rgba(0,0,0,0.18)] backdrop-blur-[26px] backdrop-saturate-[190%]">
          <div className="flex items-center gap-[0.6em] text-[0.8em] text-[#1D1D1E]">
            <span
              className={`${tab} inline-flex items-center gap-[0.4em] bg-[rgba(255,255,255,0.75)]`}
            >
              <Icon name="search" size="1.1em" strokeWidth={2.2} className="text-[#6E6E73]" />
              <span className="text-muted">Search</span>
            </span>
            <span className={`${tab} bg-graphite font-semibold text-white`}>All copies</span>
            <span className={`${tab} bg-[rgba(255,255,255,0.5)]`}>Travel</span>
            <span className={`${tab} bg-[rgba(255,255,255,0.5)]`}>Work</span>
          </div>
          <div className="relative flex flex-1 gap-[2%]">
            {stripCards.map((card) => (
              <span
                key={card.kind}
                className="flex h-full min-w-0 flex-[1_1_0] flex-col overflow-hidden rounded-[0.9em] bg-surf shadow-[0_0.2em_0.6em_rgba(0,0,0,0.1),inset_0_0_0_1px_rgba(255,255,255,0.9)]"
              >
                <span className="flex items-center gap-[0.4em] px-[0.7em] py-[0.55em] text-[0.78em] font-semibold text-muted">
                  <Icon name={card.icon} size="1.1em" strokeWidth={2.2} />
                  {card.kind}
                </span>
                <span className="flex-1 overflow-hidden px-[0.7em] text-[0.95em] leading-[1.25] text-ink">
                  {card.body}
                </span>
                <span className="border-t border-hair px-[0.7em] py-[0.45em] text-[0.7em] text-muted">
                  {card.source}
                </span>
              </span>
            ))}
            <span className="strip-select absolute inset-y-[-0.3em] left-[2%] ml-[-2%] w-[18.4%] rounded-[1.1em] border-[0.22em] border-accent shadow-[0_0_1.4em_var(--accent)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
