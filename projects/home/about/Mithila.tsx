import type { CSSProperties } from "react";

import mithila from "./mithila.svg";

// The artwork is a cached file used as a CSS mask, so the HTML stays small and the ink follows the palette.
const artwork: CSSProperties & Record<"--mithila", string> = { "--mithila": `url(${mithila.src})` };

/** The two decorative Madhubani-style borders down the page's sides (styles/about.css). */
export function MithilaBorders() {
  return (
    <div className="mithila" style={artwork} aria-hidden="true">
      <span />
      <span />
    </div>
  );
}
