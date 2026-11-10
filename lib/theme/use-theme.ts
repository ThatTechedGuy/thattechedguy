"use client";

import { useSyncExternalStore } from "react";

import { readTheme, subscribeTheme, type Theme } from "./theme";

// The server cannot know the visitor's theme. React swaps in the real one right after hydration,
// so only attributes (aria-checked, labels) may depend on this hook, never layout.
const serverTheme = (): Theme => "light";

export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, readTheme, serverTheme);
}
