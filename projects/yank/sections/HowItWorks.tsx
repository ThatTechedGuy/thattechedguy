import { Icon, type IconName } from "../icons/Icon";
import { PatternCanvas } from "../patterns/PatternCanvas";

const steps: { title: string; text: string; icon: IconName; tile: string }[] = [
  {
    title: "Copy",
    text: "Use ⌘C like you always do. Yank quietly saves each copy for you.",
    icon: "copy",
    tile: "tile-blue",
  },
  {
    title: "Open",
    text: "Press ⇧⌘V in any app. Your clipboard history slides up along the bottom of the screen.",
    icon: "command",
    tile: "tile-purple",
  },
  {
    title: "Paste",
    text: "Click the one you want. It lands right where you were typing.",
    icon: "return",
    tile: "tile-green",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how"
      data-chap=""
      data-bg="#F1ECFA"
      data-bg-dark="#140F24"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="relative isolate mx-auto max-w-1320 px-32 py-150"
    >
      <PatternCanvas kind="orbits" colour="#5E5CE6" alpha={0.35} />
      <p className="mt-0 mb-14 text-[17px] font-semibold text-eyebrow-purple">How it works</p>
      <h2 data-reveal="" className="display mt-0 mb-56 max-w-900 text-[clamp(44px,5.6vw,84px)]">
        Three steps. <span className="serif-italic text-muted">You already know two of them.</span>
      </h2>
      <div className="flex flex-wrap gap-22">
        {steps.map((step, index) => (
          <div
            key={step.title}
            data-reveal=""
            data-tilt=""
            data-spot=""
            className="glass flex min-w-0 flex-[1_1_300px] flex-col gap-14 rounded-[30px] p-34 [--spot:rgba(255,255,255,0.7)]"
          >
            <span
              className={`flex size-64 items-center justify-center rounded-[16px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_24px_rgba(0,0,0,0.14)] ${step.tile}`}
            >
              <Icon name={step.icon} size={32} />
            </span>
            <span className="mt-12 text-[14px] font-semibold text-muted">Step {index + 1}</span>
            <h3 className="display m-0 text-[40px]">{step.title}</h3>
            <p className="m-0 text-[18px] leading-normal text-lead">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
