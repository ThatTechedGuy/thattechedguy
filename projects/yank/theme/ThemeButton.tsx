"use client";

import type { ReactNode } from "react";

import { useTheme } from "@/lib/theme/use-theme";

import { flipTheme } from "./flip-theme";

/** A plain button that flips the theme and names the mode it switches to. Used by the Dock. */
export function ThemeButton({ className, children }: { className: string; children: ReactNode }) {
  const dark = useTheme() === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={flipTheme}
      className={className}
    >
      {children}
    </button>
  );
}
