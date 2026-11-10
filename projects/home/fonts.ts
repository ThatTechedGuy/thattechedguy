import localFont from "next/font/local";

// Google's latin variable files for Newsreader (opsz + wght, roman and italic) and Inter Tight, with the
// weight axis narrowed to the weights the design uses and the glyphs cut to latin text (DOCUMENTATION.md, Fonts).
// Every face shows above the fold on desktop, so all three are preloaded.
const newsreader = localFont({
  src: [
    { path: "./font-files/newsreader-var.woff2", weight: "250 400", style: "normal" },
    { path: "./font-files/newsreader-italic-var.woff2", weight: "250 400", style: "italic" },
  ],
  display: "swap",
  adjustFontFallback: "Times New Roman",
  variable: "--font-newsreader",
});

const interTight = localFont({
  src: "./font-files/inter-tight-var.woff2",
  weight: "400 600",
  style: "normal",
  display: "swap",
  variable: "--font-inter-tight",
});

/** Class names that define the --font-* variables; put them on <html>. */
export const fontVariables = `${newsreader.variable} ${interTight.variable}`;
