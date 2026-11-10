import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { JsonLd } from "@/lib/seo/json-ld";
import { fontVariables } from "@/projects/home/fonts";
import { paletteInitScript } from "@/projects/home/palette";
import { homeJsonLd, homeMetadata, homeViewport } from "@/projects/home/seo";

import "@/projects/home/styles/home.css";

export const metadata: Metadata = homeMetadata;
// Sets data-palette before first paint, so the wrong paper never flashes.
const palettePaint = { __html: paletteInitScript };
export const viewport: Viewport = homeViewport;

export default function HomeRootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the palette script adds data-palette before React hydrates.
    <html lang="en-AU" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={palettePaint} />
        <JsonLd data={homeJsonLd} />
      </head>
      <body>{children}</body>
    </html>
  );
}
