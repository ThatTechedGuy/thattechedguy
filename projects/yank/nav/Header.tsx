import { yank } from "../config";
import { Logo } from "../icons/Logo";
import { ThemePill } from "../theme/ThemePill";

/** The quiet top row: logo and the day/night switch. Navigation itself is the Dock or the pull cord. */
export function Header() {
  return (
    <header
      data-bg="#F5F5F7"
      data-bg-dark="#07070B"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="relative z-5 mx-auto flex max-w-1320 items-center justify-between gap-20 px-32 py-22"
    >
      <a href="#top" className="flex items-center gap-10 text-ink no-underline">
        <Logo size={40} decorative />
        <span className="text-[22px] font-bold tracking-[-0.02em]">Yank</span>
      </a>
      <span className="flex items-center gap-18">
        <span className="text-[14px] text-muted max-desk:hidden">Free and open source</span>
        {/* The pull cord hangs in the top-right corner, so the switch moves out of its way. */}
        <ThemePill className={yank.nav === "tab" ? "mr-112" : ""} />
      </span>
    </header>
  );
}
