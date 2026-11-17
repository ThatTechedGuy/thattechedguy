import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** The home-screen icon: the logo, rasterised from public/yank/icon.svg at build time. */
export default async function AppleIcon() {
  const logo = await readFile(join(process.cwd(), "public/yank/icon.svg"), "base64");
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: `url(data:image/svg+xml;base64,${logo})`,
        backgroundSize: "100% 100%",
      }}
    />,
    size,
  );
}
