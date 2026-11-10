import { useId } from "react";

interface LogoProps {
  size: number;
  /** Set when the logo sits inside a link or heading that already names it. */
  decorative?: boolean;
}

/** The Yank app icon. Each copy gets its own gradient ids, so several can share a page. */
export function Logo({ size, decorative = false }: LogoProps) {
  const id = useId();
  const body = `${id}-body`;
  const card = `${id}-card`;
  const shine = `${id}-shine`;
  return (
    <svg
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "Yank logo" })}
      width={size}
      height={size}
      viewBox="0 0 64 64"
    >
      <defs>
        <linearGradient id={body} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5AC8FA" />
          <stop offset=".55" stopColor="var(--accent)" />
          <stop offset="1" stopColor="#5E5CE6" />
        </linearGradient>
        <linearGradient id={card} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity=".7" />
        </linearGradient>
        <linearGradient id={shine} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".55" />
          <stop offset=".5" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="15" fill={`url(#${body})`} />
      <rect x="2" y="2" width="60" height="60" rx="15" fill={`url(#${shine})`} />
      <rect x="11" y="34" width="40" height="22" rx="6" fill="#FFFFFF" fillOpacity=".25" />
      <g transform="rotate(-8 32 36)">
        <rect x="13" y="26" width="38" height="23" rx="6" fill={`url(#${card})`} />
        <path
          d="M19 35h20M19 41h12"
          stroke="#5E5CE6"
          strokeOpacity=".55"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M38 2v15a6 6 0 0 1-12 0v-2.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2.5"
        y="2.5"
        width="59"
        height="59"
        rx="14.5"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity=".45"
      />
    </svg>
  );
}
