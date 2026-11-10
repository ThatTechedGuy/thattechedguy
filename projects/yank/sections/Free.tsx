import { yank } from "../config";
import { PatternCanvas } from "../patterns/PatternCanvas";

export function Free() {
  return (
    <section
      id="free"
      data-chap=""
      data-bg="#FFF3E6"
      data-bg-dark="#1E140A"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="relative isolate mx-auto flex max-w-1320 flex-wrap items-end gap-48 px-32 py-150"
    >
      <PatternCanvas kind="paper" colour="#FF9F0A" colour2="#FF375F" alpha={0.45} />
      <h2
        data-reveal=""
        className="display m-0 min-w-0 flex-[999_1_560px] text-[clamp(64px,10vw,164px)] leading-[0.92] tracking-[-0.05em]"
      >
        <span className="word">Free</span> <span className="word word-2">for</span>{" "}
        <span className="word word-3">everyone.</span>{" "}
        <span className="word word-4 grad-text">Forever.</span>
      </h2>
      <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-20">
        <p className="m-0 text-[20px] leading-[1.55] text-lead">
          No trial, no subscription, no ads. Yank is an open-source macOS clipboard app: its code is
          public, so anyone can see exactly what it does.
        </p>
        <a
          href={yank.repoUrl}
          className="btn glass inline-flex min-h-48 items-center gap-8 self-start rounded-full px-22 font-semibold text-ink no-underline"
        >
          See the code →
        </a>
      </div>
    </section>
  );
}
