import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt =
  "Yank: your clipboard, now with a memory. A free, open-source clipboard manager for Mac.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// shortcut: the fonts are subsets holding only the glyphs below; re-download them (README) if this text changes.
const file = (name: string) => readFile(join(process.cwd(), "projects/yank/og", name));
const asset = (name: string) => readFile(join(process.cwd(), "public/yank", name), "base64");

/** The share card, in the site's light look: logo, the hero headline with its gradient, and the facts line. */
export default async function OpenGraphImage() {
  const [bold, medium, italic, logo] = await Promise.all([
    file("inter-bold.ttf"),
    file("inter-medium.ttf"),
    file("newsreader-italic.ttf"),
    asset("icon.svg"),
  ]);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 84px",
        background: "linear-gradient(160deg, #F5F5F7 0%, #EEF3FC 60%, #F3ECFA 100%)",
        color: "#1D1D1F",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <img src={`data:image/svg+xml;base64,${logo}`} width={72} height={72} alt="" />
        <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.02em" }}>Yank</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.02 }}>
        <span style={{ fontSize: 104, fontWeight: 700, letterSpacing: "-0.045em" }}>
          Your clipboard,
        </span>
        <span
          style={{
            fontFamily: "Newsreader",
            fontStyle: "italic",
            fontSize: 112,
            letterSpacing: "-0.025em",
            backgroundImage:
              "linear-gradient(90deg, #005bd3 0%, #7a2fc4 38%, #c8174c 70%, #b84e00 100%)",
            backgroundClip: "text",
            color: "transparent",
            paddingBottom: 12,
          }}
        >
          now with a memory.
        </span>
      </div>
      <span style={{ fontSize: 25, fontWeight: 500, color: "#424245" }}>
        Free and open-source clipboard manager for Mac · macOS 26.4 or later · ⇧⌘V
      </span>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter", data: bold, weight: 700, style: "normal" },
        { name: "Inter", data: medium, weight: 500, style: "normal" },
        { name: "Newsreader", data: italic, weight: 400, style: "italic" },
      ],
    },
  );
}
