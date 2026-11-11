import type { CSSProperties } from "react";

import band from "./mithila-band.svg";
import mithila from "./mithila.svg";

// The artwork is cached files used as CSS masks, so the HTML stays small and the ink follows the palette.
const artwork: CSSProperties & Record<"--mithila" | "--mithila-band", string> = {
  "--mithila": `url(${mithila.src})`,
  "--mithila-band": `url(${band.src})`,
};

/**
 * The decorative Madhubani-style art (styles/about.css): two borders down the page's sides, or on phones,
 * where there's no room beside the text, one band of the same motifs across the top.
 */
export function MithilaBorders() {
  return (
    <div className="mithila" style={artwork} aria-hidden="true">
      <span />
      <span />
      <span className="mithila-band" />
    </div>
  );
}
