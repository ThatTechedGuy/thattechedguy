import { yank } from "../config";
import { Icon } from "../icons/Icon";
import { PatternCanvas } from "../patterns/PatternCanvas";
import { HeroScreen } from "./HeroScreen";

export function Hero() {
  return (
    <section
      id="top"
      data-chap=""
      data-bg="#F5F5F7"
      data-bg-dark="#07070B"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="relative isolate px-32 pt-64 pb-140"
    >
      <PatternCanvas kind="dots" colour="ink" alpha={0.55} placement="hero" />
      {/* Three soft colour blobs drifting behind the headline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-120px] left-1/2 -z-1 ml-[-600px] h-760 w-1200 opacity-[0.32] blur-[80px]"
      >
        <div className="blob-1 absolute top-[18%] left-[8%] h-[60%] w-[46%] rounded-full bg-accent" />
        <div className="blob-2 absolute top-[10%] right-[6%] h-[56%] w-[42%] rounded-full bg-purple" />
        <div className="blob-3 absolute top-[46%] left-[34%] h-[50%] w-[40%] rounded-full bg-orange opacity-70" />
      </div>

      <div className="scrim mx-auto flex max-w-1200 flex-col items-center text-center">
        <span className="rise-in glass inline-flex items-center gap-8 rounded-full py-7 pr-14 pl-8 text-[14px] font-medium text-lead">
          <span className="rounded-full bg-accent px-9 py-3 text-[12px] font-semibold text-white">
            Free
          </span>
          Made for macOS 26. Feels right at home.
        </span>
        <h1 className="rise-in mt-26 mb-0 font-sans text-[clamp(52px,7.2vw,112px)] leading-none font-bold tracking-[-0.045em]">
          Your clipboard,
          <br />
          <span className="grad-text">now with a memory.</span>
        </h1>
        <p className="rise-in-2 mt-28 mb-0 max-w-640 text-[22px] leading-[1.45] tracking-[-0.01em] text-lead">
          Your Mac forgets what you copied the moment you copy something else. Yank is a clipboard
          manager for Mac that remembers all of it. Press ⇧⌘V to get any of it back.
        </p>
        <div className="rise-in-3 mt-36 flex flex-wrap justify-center gap-12">
          <a
            href={yank.downloadUrl}
            className="btn btn-accent inline-flex min-h-54 items-center gap-10 rounded-full px-28 text-[17px] font-semibold no-underline shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_10px_24px_rgba(10,132,255,0.35)]"
          >
            <Icon name="download" size={18} strokeWidth={2.2} />
            Download for Mac
          </a>
          <a
            href="#demo"
            className="btn glass inline-flex min-h-54 items-center gap-8 rounded-full px-24 text-[17px] font-semibold text-ink no-underline"
          >
            <Icon name="play" size={16} strokeWidth={2.2} />
            Try it here
          </a>
        </div>
        <p className="rise-in-3 mt-18 mb-0 text-[14px] text-muted">
          Free, open-source clipboard manager · macOS 26.4 or later
        </p>
      </div>

      <HeroScreen />
    </section>
  );
}
