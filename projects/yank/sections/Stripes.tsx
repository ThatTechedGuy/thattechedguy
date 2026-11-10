const copiedThings = [
  "a link",
  "grandma’s pie recipe",
  "a screenshot of a whiteboard",
  "the Wi-Fi password",
  "a tracking number",
  "Invoice-0412.pdf",
  "that one perfect sentence",
  "a hex color",
];

const shortcuts = [
  { keys: "⇧⌘V", does: "open" },
  { keys: "Return", does: "paste" },
  { keys: "⇧ Return", does: "paste without formatting" },
  { keys: "⌘P", does: "pin" },
  { keys: "⌘K", does: "more options" },
  { keys: "⌘E", does: "edit" },
  { keys: "⌃⌥⌘V", does: "paste in order" },
];

// Each track holds its list twice: the marquee slides by half its width, then loops without a seam.
const twice = [0, 1];

/** Two tilted marquee bands: things people copy, and Yank's shortcuts. Decorative. */
export function Stripes() {
  return (
    <div
      aria-hidden="true"
      data-bg="#F5F5F7"
      data-bg-dark="#07070B"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="stripes"
    >
      <div className="stripe stripe-brand">
        <div className="stripe-track marquee">
          {twice.flatMap((copy) =>
            copiedThings.flatMap((thing) => [
              <span key={`${copy}-${thing}`}>{thing}</span>,
              <span key={`${copy}-${thing}-bullet`} className="stripe-bullet">
                ●
              </span>,
            ]),
          )}
        </div>
      </div>
      <div className="stripe stripe-dark">
        <div className="stripe-track marquee-reverse">
          {twice.flatMap((copy) =>
            shortcuts.map((shortcut) => (
              <span key={`${copy}-${shortcut.keys}`} className="stripe-shortcut">
                <kbd className="keycap">{shortcut.keys}</kbd>
                {shortcut.does}
              </span>
            )),
          )}
        </div>
      </div>
    </div>
  );
}
