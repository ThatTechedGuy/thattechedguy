import { Icon, type IconName } from "../icons/Icon";
import { PatternCanvas } from "../patterns/PatternCanvas";

const promises: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Stays on your Mac",
    text: "Nothing is uploaded. There is no cloud to leak.",
    icon: "lock",
  },
  { title: "No account", text: "Download it and start. No email, no sign-up.", icon: "noAccount" },
  {
    title: "Passwords skipped",
    text: "Copies from your password app are never saved.",
    icon: "key",
  },
  {
    title: "You’re in control",
    text: "Pause saving, ignore an app, or clear your history any time.",
    icon: "color",
  },
];

/** Black in both themes. */
export function Privacy() {
  return (
    <section
      id="privacy"
      data-chap=""
      data-bg="#000000"
      data-bg-dark="#000000"
      data-fg="#F5F5F7"
      data-fg-dark="#F5F5F7"
      className="relative isolate text-fog"
    >
      <PatternCanvas kind="flow" colour="#F5F5F7" alpha={0.55} />
      <div className="mx-auto max-w-1320 px-32 py-150">
        <span className="tile-indigo mb-36 inline-flex size-72 items-center justify-center rounded-[20px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_20px_40px_rgba(94,92,230,0.4)]">
          <Icon name="shield" size={38} />
        </span>
        <h2 data-reveal="" className="display mt-0 mb-64 max-w-1000 text-[clamp(48px,6.4vw,100px)]">
          Private by default. <span className="grad-text">Not by setting.</span>
        </h2>
        <div className="flex flex-wrap gap-18">
          {promises.map((promise) => (
            <div
              key={promise.title}
              data-reveal=""
              className="glass-dark flex min-w-0 flex-[1_1_260px] flex-col gap-12 rounded-[26px] p-28"
            >
              <span className="flex size-46 items-center justify-center rounded-full bg-[rgba(255,255,255,0.1)] text-accent">
                <Icon name={promise.icon} />
              </span>
              <h3 className="mt-8 mb-0 text-[21px] font-semibold tracking-[-0.01em]">
                {promise.title}
              </h3>
              <p className="m-0 text-[17px] leading-normal text-[#A1A1A6]">{promise.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
