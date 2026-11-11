import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { fontVariables } from "@/projects/home/fonts";
import { paletteInitScript } from "@/projects/home/palette";
import { homeMetadata, homeViewport } from "@/projects/home/seo";

// The home page's stylesheet, one file per part of the page. Only this layout imports it, so none of it reaches
// /yank. The order is the cascade order. Plain imports, not @import: an @import makes Tailwind's PostCSS plugin
// process the CSS, which this page does not use.
import "@/projects/home/styles/tokens.css";
import "@/projects/home/styles/base.css";
import "@/projects/home/styles/rail.css";
import "@/projects/home/styles/hero.css";
import "@/projects/home/styles/ticker.css";
import "@/projects/home/styles/sections.css";
import "@/projects/home/styles/record.css";
import "@/projects/home/styles/contact.css";
import "@/projects/home/styles/work.css";
import "@/projects/home/styles/footer.css";
import "@/projects/home/styles/motion.css";

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
      </head>
      <body>{children}</body>
    </html>
  );
}
