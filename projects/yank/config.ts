/** Yank's settings. These were runtime tweaks (data-props) in the prototype; here they are build-time constants. */

import type { ThemeDefault } from "@/lib/theme/theme";

export type NavStyle = "dock" | "tab" | "menubar";
export type Effects = "3D" | "patterns";

interface YankConfig {
  accent: `#${string}`;
  /** Dock by default; "tab" is the pull-cord ball, "menubar" the macOS-style bar. */
  nav: NavStyle;
  /** "auto" follows the system until the visitor uses the switch. */
  theme: ThemeDefault;
  /** "3D" adds the Three.js background on desktop; "patterns" keeps only the canvas patterns. */
  effects: Effects;
  /** Where every Download button goes. */
  downloadUrl: string;
  repoUrl: string;
  licenseUrl: string;
  /** Per-project key, so Yank's dark mode never leaks into another project. */
  themeStorageKey: string;
}

export const yank: YankConfig = {
  accent: "#0A84FF",
  nav: "dock",
  theme: "auto",
  effects: "3D",
  // The DMG's file name carries the version, so this is the newest release's page, not the file.
  downloadUrl: "https://github.com/ThatTechedGuy/Yank/releases/latest",
  repoUrl: "https://github.com/ThatTechedGuy/Yank",
  licenseUrl: "https://github.com/ThatTechedGuy/Yank/blob/main/LICENSE",
  themeStorageKey: "ttg:yank:theme",
};

/** The page's chapters, in order. The ids are the stable section anchors. */
export const chapters = [
  { id: "top", label: "Intro" },
  { id: "demo", label: "Try it" },
  { id: "how", label: "How it works" },
  { id: "features", label: "Features" },
  { id: "privacy", label: "Privacy" },
  { id: "free", label: "Open source" },
  { id: "download", label: "Download" },
] as const;

export type ChapterId = (typeof chapters)[number]["id"];
