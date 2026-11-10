import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Self-hosted fallbacks. Apple devices use their system fonts (see --font-* in styles/yank.css),
// so nothing is preloaded: a preload would cost Mac and iPhone visitors a download they never use.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-inter",
});

// Newsreader is self-hosted from static latin files (Google's own 400, 400 italic and 600 cuts):
// 70 KB for the three faces the design uses, against 121 KB for next/font/google's variable files.
const newsreader = localFont({
  src: [
    { path: "./font-files/newsreader-400.woff2", weight: "400", style: "normal" },
    { path: "./font-files/newsreader-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./font-files/newsreader-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  preload: false,
  adjustFontFallback: "Times New Roman",
  variable: "--font-newsreader",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-jetbrains-mono",
});

/** Class names that define the --font-* variables; put them on <html>. */
export const fontVariables = `${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`;
