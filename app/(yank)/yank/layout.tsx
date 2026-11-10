import type { Metadata, Viewport } from "next";
import type { CSSProperties, ReactNode } from "react";

import { JsonLd } from "@/lib/seo/json-ld";
import { ThemeScript } from "@/lib/theme/ThemeScript";
import { yank } from "@/projects/yank/config";
import { fontVariables } from "@/projects/yank/fonts";
import { yankJsonLd, yankMetadata, yankViewport } from "@/projects/yank/seo";

import "@/projects/yank/styles/yank.css";

export const metadata: Metadata = yankMetadata;
export const viewport: Viewport = yankViewport;

// The stylesheet reads the accent from this variable, so the colour lives only in the config.
const accent: CSSProperties & Record<"--accent", string> = { "--accent": yank.accent };

export default function YankRootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: ThemeScript adds data-theme before React hydrates.
    <html lang="en" className={fontVariables} style={accent} suppressHydrationWarning>
      <head>
        <ThemeScript storageKey={yank.themeStorageKey} fallback={yank.theme} />
        {/* Reveals hide content only after a script arms them; this keeps it visible if scripts are off. */}
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <JsonLd data={yankJsonLd} />
      </head>
      <body>{children}</body>
    </html>
  );
}
