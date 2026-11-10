/**
 * The icons that show above the fold or need their gradients, inline: the Westpac W and Yank's Glass Hook.
 * Every other icon (Simple Icons, CC0) lives in icons.svg, a cached file, so the page carries them once
 * instead of twice (HTML and React payload). Use with <svg><use href="#i-name" /></svg>.
 */
export function Sprite() {
  return (
    <svg width="0" height="0" className="sprite" aria-hidden="true" focusable="false">
      <linearGradient id="yk-a" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5AC8FA" />
        <stop offset=".55" stopColor="#0A84FF" />
        <stop offset="1" stopColor="#5E5CE6" />
      </linearGradient>
      <linearGradient id="yk-b" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity=".95" />
        <stop offset="1" stopColor="#FFFFFF" stopOpacity=".7" />
      </linearGradient>
      <linearGradient id="yk-c" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFFFFF" stopOpacity=".55" />
        <stop offset=".5" stopColor="#FFFFFF" stopOpacity="0" />
      </linearGradient>
      <symbol id="i-yank" viewBox="0 0 64 64">
        <rect x="2" y="2" width="60" height="60" rx="0" fill="url(#yk-a)" />
        <rect x="2" y="2" width="60" height="60" rx="0" fill="url(#yk-c)" />
        <rect x="11" y="34" width="40" height="22" rx="6" fill="#FFFFFF" fillOpacity=".25" />
        <g transform="rotate(-8 32 36)">
          <rect x="13" y="26" width="38" height="23" rx="6" fill="url(#yk-b)" />
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
          rx="0"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity=".45"
        />
      </symbol>
      <symbol id="i-westpac" viewBox="0 0 69 28">
        <path d="M24.4 25L17.6 4.1C16.7 0.9 15 0 12.6 0H0c1 0.4 1.6 2.9 1.6 2.9l6.1 21c0.7 2.6 2.9 4 5.4 4h13.3C25.4 27.8 24.4 25 24.4 25" />
        <path d="M44.6 25l6.8-20.9C52.3 0.9 54 0 56.4 0H69c-1 0.4-1.6 2.9-1.6 2.9l-6.1 21c-0.7 2.6-2.9 4-5.4 4H42.6C43.6 27.8 44.6 25 44.6 25" />
        <rect x="27" width="15" height="28" />
      </symbol>
    </svg>
  );
}
