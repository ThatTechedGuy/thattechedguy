import type { ChapterId } from "../config";
import { Icon, type IconName } from "../icons/Icon";
import { Logo } from "../icons/Logo";
import { SunMoon } from "../icons/SunMoon";
import { ThemeButton } from "../theme/ThemeButton";

const links: { id: ChapterId; label: string; icon: IconName; tile: string }[] = [
  { id: "demo", label: "Try it", icon: "play", tile: "tile-blue" },
  { id: "how", label: "How it works", icon: "list", tile: "tile-green" },
  { id: "features", label: "Features", icon: "star", tile: "tile-orange" },
  { id: "privacy", label: "Privacy", icon: "shield", tile: "tile-indigo" },
  { id: "free", label: "Open source", icon: "heart", tile: "tile-pink" },
];

function DockLink({
  id,
  label,
  icon,
  tile,
}: {
  id: ChapterId;
  label: string;
  icon: IconName;
  tile: string;
}) {
  return (
    <a href={`#${id}`} data-nav={id} aria-label={label} className="dock-item">
      <span className={`dock-tile ${tile}`}>
        <Icon name={icon} size={26} />
      </span>
      <span className="dock-tip">{label}</span>
      <span className="dock-dot" />
    </a>
  );
}

/**
 * The macOS-style Dock. Hover magnification, the launch bounce and the dot under the current
 * chapter are all CSS (dock.css); the only client code in it is the theme button.
 */
export function Dock() {
  return (
    <nav
      aria-label="Main"
      className="dock glass fixed bottom-12 left-1/2 z-9990 flex max-w-[calc(100%-24px)] -translate-x-1/2 items-end rounded-[26px] px-10 py-8"
    >
      <a href="#top" data-nav="top" aria-label="Yank, back to top" className="dock-item">
        <span className="dock-tile dock-tile-bare">
          <Logo size={52} decorative />
        </span>
        <span className="dock-tip">Yank</span>
        <span className="dock-dot" />
      </a>
      <span aria-hidden="true" className="dock-sep" />
      {links.map((link) => (
        <DockLink key={link.id} {...link} />
      ))}
      <span aria-hidden="true" className="dock-sep" />
      <ThemeButton className="dock-item cursor-pointer bg-transparent p-0">
        <span className="dock-tile dock-theme-tile">
          <SunMoon size={26} />
        </span>
        <span className="dock-tip">
          <span className="when-light">Dark mode</span>
          <span className="when-dark">Light mode</span>
        </span>
      </ThemeButton>
      <DockLink id="download" label="Download" icon="download" tile="tile-sky" />
    </nav>
  );
}
