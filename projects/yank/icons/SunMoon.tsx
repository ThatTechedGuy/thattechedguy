import { useId } from "react";

/** A sun that morphs into a crescent moon in dark mode (theme-switch.css drives it from data-theme). */
export function SunMoon({ size }: { size: number }) {
  const mask = useId();
  return (
    <span className="sun-moon" aria-hidden="true">
      <svg viewBox="0 0 24 24" width={size} height={size} className="overflow-visible">
        <defs>
          <mask id={mask}>
            <rect x="-4" y="-4" width="32" height="32" fill="#FFFFFF" />
            <circle className="sun-moon-cut" cx="25" cy="-1" r="6.5" fill="#000000" />
          </mask>
        </defs>
        <circle
          className="sun-moon-core"
          cx="12"
          cy="12"
          r="5"
          fill="currentColor"
          mask={`url(#${mask})`}
        />
        <g className="sun-moon-rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 1.5v2.2M12 20.3v2.2M1.5 12h2.2M20.3 12h2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
        </g>
      </svg>
    </span>
  );
}
