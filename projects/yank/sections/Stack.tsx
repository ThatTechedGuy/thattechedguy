import { Icon, type IconName } from "../icons/Icon";
import { PatternCanvas } from "../patterns/PatternCanvas";

/** Top card first. `level` counts up from the bottom card; stack.css turns it into height. */
const cards: { kind: string; icon: IconName; text: string; look: string }[] = [
  {
    kind: "Text",
    icon: "text",
    text: "Meet at 4 by the blue door",
    look: "bg-white text-[#1D1D1E] [--level:5]",
  },
  {
    kind: "Link",
    icon: "link",
    text: "Lakeside cabin, 3 nights",
    look: "bg-graphite text-fog [--level:4]",
  },
  {
    kind: "Color",
    icon: "color",
    text: "Sunny yellow #FFD60A",
    look: "bg-yellow text-[#1D1D1E] [--level:3]",
  },
  {
    kind: "Image",
    icon: "image",
    text: "Boarding pass, Gate B12",
    look: "bg-[#3A1D6E] text-white [--level:2]",
  },
  {
    kind: "File",
    icon: "file",
    text: "Tickets.pdf",
    look: "bg-[#FFE3EC] text-[#1D1D1E] [--level:1]",
  },
  {
    kind: "Text",
    icon: "text",
    text: "Lemon cake: 200g butter…",
    look: "bg-white text-[#1D1D1E] [--level:0]",
  },
];

/** "Layer after layer": the accent-coloured section with six cards stacked in 3D. */
export function Stack() {
  return (
    <section
      data-d3-quiet=""
      data-scroll=""
      data-bg="accent"
      data-bg-dark="accent"
      data-fg="#FFFFFF"
      data-fg-dark="#F5F5F7"
      className="relative isolate mx-auto flex max-w-1320 flex-wrap items-center gap-48 px-32 pt-170 pb-40"
    >
      <PatternCanvas kind="rain" colour="#FFFFFF" colour2="#BF5AF2" alpha={0.5} />
      <div className="min-w-0 flex-[1_1_360px]">
        <h2 data-reveal="" className="display m-0 text-[clamp(44px,5.6vw,88px)] text-white">
          Layer after layer. <span className="serif-italic opacity-70">All kept.</span>
        </h2>
        <p
          data-reveal=""
          className="mt-28 mb-0 max-w-440 text-[20px] leading-normal text-[rgba(255,255,255,0.9)]"
        >
          Every copy sits in a neat stack, newest on top. Scroll to pull the layers apart. Move your
          mouse to turn them.
        </p>
      </div>
      <div data-cursor="Move" aria-hidden="true" className="stack">
        <div className="stack-float floaty">
          <div className="stack-turn">
            <div className="stack-shadow" />
            {cards.map((card) => (
              <div key={card.text} className={`stack-card ${card.look}`}>
                <span className="stack-card-kind">
                  <Icon name={card.icon} size={18} strokeWidth={2.2} />
                  {card.kind}
                </span>
                <span className="stack-card-text">{card.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
