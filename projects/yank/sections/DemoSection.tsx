import type { ReactNode } from "react";

import { PatternCanvas } from "../patterns/PatternCanvas";

/** "Try it": the heading and the interactive demo, which is passed in so this stays a Server Component. */
export function DemoSection({ children }: { children: ReactNode }) {
  return (
    <section
      id="demo"
      data-chap=""
      data-bg="#E8EEF9"
      data-bg-dark="#0B1220"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="relative isolate mx-auto max-w-1320 px-32 pt-120"
    >
      <PatternCanvas kind="grid" colour="ink" alpha={0.3} />
      <div className="mb-48 flex flex-wrap items-end justify-between gap-28">
        <h2 data-reveal="" className="display m-0 max-w-820 text-[clamp(48px,6.4vw,96px)]">
          Try it <span className="grad-text">right here.</span>
        </h2>
        <p className="m-0 max-w-400 text-[19px] leading-normal text-lead">
          This works like the real thing. Click a card, then Paste. Use the arrow keys. Search for
          “gate”.
        </p>
      </div>
      {children}
    </section>
  );
}
