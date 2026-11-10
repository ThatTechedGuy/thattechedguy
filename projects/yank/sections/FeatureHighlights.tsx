import type { ReactNode } from "react";

import { Icon, type IconName } from "../icons/Icon";

const pinboards = [
  { name: "All copies", dot: "bg-[#8E8E93]" },
  { name: "Travel", dot: "bg-accent", selected: true },
  { name: "Work", dot: "bg-orange" },
  { name: "Family", dot: "bg-green" },
];

function SearchResult({
  icon,
  tile,
  children,
}: {
  icon: IconName;
  tile: string;
  children: ReactNode;
}) {
  return (
    <div className="hover-row flex items-center gap-12 px-16 py-12">
      <span className={`flex size-30 items-center justify-center rounded-[8px] text-white ${tile}`}>
        <Icon name={icon} size={16} strokeWidth={2.2} />
      </span>
      <span>{children}</span>
    </div>
  );
}

function Match({ children }: { children: string }) {
  return (
    <mark className="rounded-[3px] bg-[rgba(10,132,255,0.2)] px-2 text-inherit">{children}</mark>
  );
}

/** "Find anything by typing", with a search box that types "gate" on a loop. */
export function SearchCard() {
  return (
    <div
      data-tilt=""
      data-spot=""
      className="glass-card flex min-w-0 flex-[1_1_420px] flex-col gap-16 rounded-[32px] p-44 [--spot:rgba(10,132,255,0.12)]"
    >
      <span className="text-accent">
        <Icon name="search" size={34} />
      </span>
      <h3 data-reveal="" className="display m-0 text-[44px]">
        Find anything by typing
      </h3>
      <p className="m-0 text-[18px] leading-normal text-lead">
        Type a word and Yank searches your copy and paste history, even words inside your
        screenshots and photos.
      </p>
      <div className="mt-14 overflow-hidden rounded-[16px] bg-chip text-[16px]">
        <div className="flex items-center gap-10 border-b border-hair px-16 py-14 text-[#6E6E73]">
          <Icon name="search" size={18} />
          <span className="type-loop text-[20px] font-medium text-ink">gate</span>
        </div>
        <SearchResult icon="image" tile="bg-[linear-gradient(135deg,#FFD60A,#FF9F0A)]">
          Boarding pass: “<Match>Gate</Match> B12, 7:40”
        </SearchResult>
        <SearchResult icon="text" tile="bg-[linear-gradient(135deg,#64D2FF,#0A84FF)]">
          Email from Ana: “meet at the garden <Match>gate</Match>”
        </SearchResult>
      </div>
    </div>
  );
}

/** "Keep the ones you reuse": dark in both themes, with a row of pinboard chips. */
export function PinboardCard() {
  return (
    <div
      data-tilt=""
      className="glass-dark flex min-w-0 flex-[1_1_420px] flex-col gap-16 rounded-[32px] bg-[linear-gradient(160deg,#2C2C2E,#1C1C1E)] p-44 text-fog"
    >
      <span className="text-orange">
        <Icon name="pin" size={34} />
      </span>
      <h3 data-reveal="" className="display m-0 text-[44px]">
        Keep the ones you reuse
      </h3>
      <p className="m-0 text-[18px] leading-normal text-[#A1A1A6]">
        Pin your address, your email sign-off or a favourite link to a pinboard. It stays there
        until you remove it.
      </p>
      <div className="mt-auto flex flex-wrap gap-10 text-[15px]">
        {pinboards.map((board) => (
          <span
            key={board.name}
            className={`inline-flex items-center gap-8 rounded-full px-15 py-9 ${
              board.selected
                ? "nudge bg-surf font-semibold text-ink"
                : "bg-[rgba(255,255,255,0.08)]"
            }`}
          >
            <span className={`size-10 rounded-full ${board.dot}`} />
            {board.name}
          </span>
        ))}
      </div>
    </div>
  );
}
