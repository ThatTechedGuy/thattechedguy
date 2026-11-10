import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/site.config";

export const alt = "ThatTechedGuy: software engineer and programming polyglot. Tennis and chess.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// shortcut: the fonts are subsets holding only the glyphs below; re-download them (README) if this text changes.
const file = (name: string) => readFile(join(process.cwd(), "projects/home/og", name));

/** The home page's share card, in its "Paper" look. */
export default async function OpenGraphImage() {
  const [serif, sans] = await Promise.all([
    file("source-serif-semibold.ttf"),
    file("inter-regular.ttf"),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
        padding: "0 110px",
        background: "#FAF9F5",
        color: "#1C1B18",
      }}
    >
      <span style={{ fontFamily: "Serif", fontSize: 112, letterSpacing: "-0.01em" }}>
        {site.name}
      </span>
      <span style={{ fontFamily: "Sans", fontSize: 38, opacity: 0.7 }}>
        Software engineer · Programming polyglot
      </span>
      <span style={{ fontFamily: "Sans", fontSize: 30, opacity: 0.5 }}>Tennis · Chess</span>
      <span style={{ fontFamily: "Sans", fontSize: 26, opacity: 0.5, marginTop: 40 }}>
        www.thattechedguy.com
      </span>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Serif", data: serif, weight: 600, style: "normal" },
        { name: "Sans", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
