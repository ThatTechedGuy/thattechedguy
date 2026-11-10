"use client";

import { applyTheme, readTheme } from "@/lib/theme/theme";
import { useTheme } from "@/lib/theme/use-theme";

import { homeThemeKey } from "./config";

const toggle = () => applyTheme(homeThemeKey, readTheme() === "dark" ? "light" : "dark");

/** The home page's only client code: a plain light/dark switch, remembered for the home page alone. */
export function ThemeSwitch() {
  const dark = useTheme() === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={toggle}
      className="flex cursor-pointer items-center gap-2.5 border-0 bg-transparent text-[13px] text-ink"
    >
      <span className="opacity-70">Dark mode</span>
      <span aria-hidden="true" className="home-switch" />
    </button>
  );
}
