import { Backdrop } from "../backdrop/Backdrop";
import { Patterns } from "../patterns/Patterns";
import { Cursor } from "./Cursor";
import { PointerEffects } from "./PointerEffects";
import { Reveals } from "./Reveals";
import { Scrollbar } from "./Scrollbar";
import { ScrollProgress } from "./ScrollProgress";
import { SectionTracker } from "./SectionTracker";

/**
 * Everything fixed over the page: the reading progress bar, film grain, overlay scrollbar and custom
 * cursor, plus the small motion islands that drive them. Each island owns one concern and renders
 * nothing or only its own decoration.
 */
export function FixedLayers() {
  return (
    <>
      <SectionTracker />
      <ScrollProgress />
      <Reveals />
      <PointerEffects />
      <Patterns />
      <Backdrop />
      <div aria-hidden="true" className="progress-bar" />
      <svg aria-hidden="true" className="grain">
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
      <Scrollbar />
      <Cursor />
    </>
  );
}
