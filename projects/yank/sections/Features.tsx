import { Icon, type IconName } from "../icons/Icon";
import { PatternCanvas } from "../patterns/PatternCanvas";
import { PinboardCard, SearchCard } from "./FeatureHighlights";

const smallFeatures: { title: string; text: string; icon: IconName; colour: string }[] = [
  {
    title: "Paste in order",
    text: "Copy your name, email and address, then paste them one after another into a form.",
    icon: "numbered",
    colour: "text-purple",
  },
  {
    title: "Fix it first",
    text: "Spot a typo? Edit a saved text or picture, then paste the right version.",
    icon: "pencil",
    colour: "text-orange",
  },
  {
    title: "Clean paste",
    text: "Paste text without its old fonts and colors.",
    icon: "wand",
    colour: "text-green",
  },
];

export function Features() {
  return (
    <section
      id="features"
      data-chap=""
      data-bg="#F5F5F7"
      data-bg-dark="#0C0C0F"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="relative isolate mx-auto flex max-w-1320 flex-col gap-22 px-32 py-150"
    >
      <PatternCanvas kind="flow" colour="#5E5CE6" alpha={0.4} />
      <h2 data-reveal="" className="display mt-0 mb-30 max-w-900 text-[clamp(44px,5.6vw,84px)]">
        Small touches. <span className="serif-italic text-muted">Big time savers.</span>
      </h2>
      <div className="flex flex-wrap gap-22">
        <SearchCard />
        <PinboardCard />
      </div>
      <div className="flex flex-wrap gap-22">
        {smallFeatures.map((feature) => (
          <div
            key={feature.title}
            data-tilt=""
            className="glass-card flex min-w-0 flex-[1_1_300px] flex-col gap-12 rounded-[32px] p-36"
          >
            <span className={feature.colour}>
              <Icon name={feature.icon} size={30} />
            </span>
            <h3 data-reveal="" className="display m-0 text-[32px]">
              {feature.title}
            </h3>
            <p className="m-0 text-[17px] leading-normal text-lead">{feature.text}</p>
            {feature.title === "Clean paste" && (
              // A real checkbox, so it toggles without JavaScript.
              <label className="mt-auto flex cursor-pointer items-center justify-between gap-12 rounded-[14px] bg-chip px-14 py-12 text-[16px]">
                <span>Always paste without formatting</span>
                <input type="checkbox" className="ios-switch" defaultChecked />
              </label>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
