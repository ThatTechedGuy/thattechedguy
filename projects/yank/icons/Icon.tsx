import type { ReactNode } from "react";

/** 24×24 stroke icons. The colour comes from the parent's text colour. */
const shapes = {
  clipboard: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2.5" />
      <rect x="9" y="2.5" width="6" height="3.5" rx="1.2" />
    </>
  ),
  play: <path d="M8 5l11 7-11 7z" />,
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
    </>
  ),
  star: <path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.6 6.7 19.4l1.2-6L3.4 9.3l6-.7z" />,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
  download: <path d="M12 4v12M6 11l6 6 6-6M5 20h14" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
  text: <path d="M5 6h14M12 6v13" />,
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1" />
    </>
  ),
  image: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M21 16l-5-5-8 8" />
    </>
  ),
  color: (
    <>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </>
  ),
  file: (
    <>
      <path d="M7 3h7l5 5v13H7z" />
      <path d="M14 3v5h5" />
    </>
  ),
  copy: (
    <>
      <rect x="8" y="8" width="12" height="13" rx="2.5" />
      <path d="M16 8V5.5A2.5 2.5 0 0 0 13.5 3h-7A2.5 2.5 0 0 0 4 5.5v9A2.5 2.5 0 0 0 6.5 17H8" />
    </>
  ),
  command: <path d="M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3z" />,
  return: (
    <>
      <path d="M20 5v7a3 3 0 0 1-3 3H5" />
      <path d="M9 11l-4 4 4 4" />
    </>
  ),
  pin: (
    <>
      <path d="M9 3h6l-1 6 3 3H7l3-3z" />
      <path d="M12 15v6" />
    </>
  ),
  numbered: (
    <>
      <path d="M10 6h10M10 12h10M10 18h10" />
      <path d="M4 5l1.5-1v5M3.5 13.5a1.5 1.5 0 1 1 2.5 1.2L3.5 18H6.5" />
    </>
  ),
  pencil: (
    <>
      <path d="M4 20l1-4L16 5l3 3L8 19z" />
      <path d="M14 7l3 3" />
    </>
  ),
  wand: (
    <>
      <path d="M4 20L16 8" />
      <path d="M15 4v3M19 8h-3M18.5 5.5l-2 2M20 12v2M10 3v2" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2.5" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  noAccount: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20a7 7 0 0 1 14 0" />
      <path d="M4 4l16 16" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="3.5" />
      <path d="M11.5 12H21M17 12v3M20 12v2" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof shapes;

interface IconProps {
  name: IconName;
  /** Pixels, or a CSS length such as "1.1em" inside the scaled-down screen mock-ups. */
  size?: number | string;
  strokeWidth?: number;
  className?: string;
}

/** Always decorative: the text next to an icon, or the control's aria-label, names it. */
export function Icon({ name, size = 24, strokeWidth = 2, className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {shapes[name]}
    </svg>
  );
}
