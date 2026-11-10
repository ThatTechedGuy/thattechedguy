import { yank } from "../config";
import { Icon } from "../icons/Icon";
import { Logo } from "../icons/Logo";
import { PatternCanvas } from "../patterns/PatternCanvas";

/** The closing call to action. */
export function Download() {
  return (
    <section
      id="download"
      data-chap=""
      data-bg="#F5F5F7"
      data-bg-dark="#07070B"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="mx-auto max-w-1320 px-32"
    >
      <div className="cta-gradient relative isolate flex flex-wrap items-center justify-between gap-40 overflow-hidden rounded-[40px] p-[clamp(40px,7vw,96px)] text-white">
        <PatternCanvas
          kind="dither"
          colour="#FFFFFF"
          colour2="#FFFFFF"
          alpha={0.5}
          placement="card"
        />
        <div className="flex min-w-0 flex-[999_1_520px] flex-wrap items-center gap-30">
          <span className="nudge inline-block drop-shadow-[0_24px_40px_rgba(0,0,0,0.3)]">
            <Logo size={128} />
          </span>
          <h2 data-reveal="" className="display m-0 text-[clamp(48px,6vw,88px)] text-white">
            Never lose
            <br />a copy again.
          </h2>
        </div>
        <div className="flex flex-col items-start gap-12">
          <a
            href={yank.downloadUrl}
            className="btn inline-flex min-h-58 items-center gap-10 rounded-full bg-white px-30 text-[18px] font-semibold text-graphite no-underline shadow-[0_14px_30px_rgba(0,0,0,0.2)]"
          >
            <Icon name="download" size={18} strokeWidth={2.2} />
            Download free
          </a>
          <span className="text-[14px] text-[rgba(255,255,255,0.85)]">
            macOS 26.4 or later · Apple silicon and Intel
          </span>
        </div>
      </div>
    </section>
  );
}
