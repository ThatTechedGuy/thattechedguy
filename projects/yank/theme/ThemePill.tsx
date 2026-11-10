"use client";

import { useTheme } from "@/lib/theme/use-theme";

import { flipTheme } from "./flip-theme";

/** The day/night pill in the header. All of its drawing is CSS (theme-switch.css), driven by data-theme. */
export function ThemePill({ className }: { className?: string }) {
  const dark = useTheme() === "dark";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? "Light mode" : "Dark mode"}
      onClick={flipTheme}
      className={`pill flip-keep ${className ?? ""}`}
    >
      <span className="pill-night" aria-hidden="true" />
      <span className="pill-star pill-star-1" aria-hidden="true" />
      <span className="pill-star pill-star-2" aria-hidden="true" />
      <span className="pill-star pill-star-3" aria-hidden="true" />
      <span className="pill-star pill-star-4" aria-hidden="true" />
      <span className="pill-star pill-star-5" aria-hidden="true" />
      <span className="pill-cloud pill-cloud-1" aria-hidden="true" />
      <span className="pill-cloud pill-cloud-2" aria-hidden="true" />
      <span className="pill-knob" aria-hidden="true">
        <span className="pill-moon">
          <span className="pill-crater pill-crater-1" />
          <span className="pill-crater pill-crater-2" />
          <span className="pill-crater pill-crater-3" />
        </span>
      </span>
    </button>
  );
}
