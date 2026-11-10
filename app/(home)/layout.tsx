import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { JsonLd } from "@/lib/seo/json-ld";
import { ThemeScript } from "@/lib/theme/ThemeScript";
import { homeThemeKey } from "@/projects/home/config";
import { homeJsonLd, homeMetadata, homeViewport } from "@/projects/home/seo";

import "@/projects/home/styles/home.css";

export const metadata: Metadata = homeMetadata;
export const viewport: Viewport = homeViewport;

export default function HomeRootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: ThemeScript adds data-theme before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript storageKey={homeThemeKey} fallback="auto" />
        <JsonLd data={homeJsonLd} />
      </head>
      <body>{children}</body>
    </html>
  );
}
