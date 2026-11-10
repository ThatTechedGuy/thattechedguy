import { chapters, yank } from "../config";
import { Icon } from "../icons/Icon";
import { Logo } from "../icons/Logo";
import { SunMoon } from "../icons/SunMoon";
import { ThemeButton } from "../theme/ThemeButton";

/** The alternative navigation (nav: "menubar"): a macOS menu bar pinned to the top. It replaces the header. */
export function MenuBar() {
  return (
    <>
      {/* Keeps the page's first colour under the fixed bar. */}
      <div
        data-bg="#F5F5F7"
        data-bg-dark="#07070B"
        data-fg="#1D1D1F"
        data-fg-dark="#F5F5F7"
        className="h-44"
      />
      <nav
        aria-label="Main"
        className="menubar glass fixed inset-x-0 top-0 z-9990 flex h-40 items-center gap-4 rounded-none [border-width:0_0_1px_0] px-14 text-[14px] text-ink"
      >
        <a
          href="#top"
          className="flex h-30 items-center gap-8 px-8 font-bold text-ink no-underline"
        >
          <Logo size={20} decorative />
          Yank
        </a>
        {chapters
          .filter((chapter) => chapter.id !== "top" && chapter.id !== "download")
          .map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              data-nav={chapter.id}
              className="menubar-link hover-row inline-flex h-30 items-center rounded-[7px] px-10 text-ink no-underline"
            >
              {chapter.label}
            </a>
          ))}
        <span className="ml-auto flex items-center gap-14 text-ink">
          <span className="menubar-status inline-flex items-center gap-6 text-[13px] text-lead">
            <Icon name="clipboard" size={16} />
            <span>128 copies saved</span>
          </span>
          <ThemeButton className="hover-row inline-flex h-28 w-32 cursor-pointer items-center justify-center rounded-[7px] bg-transparent text-ink">
            <SunMoon size={17} />
          </ThemeButton>
          <a
            href={yank.downloadUrl}
            className="btn inline-flex h-28 items-center rounded-full bg-accent px-14 text-[13px] font-semibold text-white no-underline"
          >
            Download free
          </a>
        </span>
      </nav>
    </>
  );
}
