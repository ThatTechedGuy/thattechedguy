import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt =
  "ThatTechedGuy: Vishal Gupta, an AI engineer in Brisbane building cloud and agentic products.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// shortcut: the fonts are subsets holding only the glyphs below; re-download them (DOCUMENTATION.md) if this text changes.
const file = (name: string) => readFile(join(process.cwd(), "projects/home/og", name));

/** The home page's share card, on the Butter paper. */
export default async function OpenGraphImage() {
  const [serif, serifItalic, sansMedium, sans] = await Promise.all([
    file("newsreader-light.ttf"),
    file("newsreader-light-italic.ttf"),
    file("inter-tight-medium.ttf"),
    file("inter-tight-regular.ttf"),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px 64px",
        background: "#f3dc6b",
        color: "#1c1a10",
        fontFamily: "Sans",
      }}
    >
      <span style={{ fontWeight: 500, fontSize: 26, letterSpacing: "0.1em", color: "#5b5434" }}>
        VISHAL GUPTA · BRISBANE, AUSTRALIA
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <span
          style={{
            display: "flex",
            fontFamily: "Serif",
            fontSize: 166,
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
          }}
        >
          <span>That</span>
          {/* Italic correction: the tight tracking would run the d into the G. Satori only spaces
              separate elements, so each part is its own span. */}
          <span style={{ fontStyle: "italic", marginRight: 22 }}>Teched</span>
          <span>Guy</span>
        </span>
        <span style={{ fontSize: 40 }}>AI engineer building cloud and agentic products.</span>
      </div>
      <span
        style={{
          display: "flex",
          fontSize: 26,
          color: "#5b5434",
          borderTop: "1px solid #1c1a10",
          paddingTop: 18,
        }}
      >
        thattechedguy.com
      </span>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, weight: 300, style: "normal" },
        { name: "Serif", data: serifItalic, weight: 300, style: "italic" },
        { name: "Sans", data: sansMedium, weight: 500, style: "normal" },
        { name: "Sans", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
