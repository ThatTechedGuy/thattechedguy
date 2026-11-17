import type { Metadata } from "next";

import { opinionsNav } from "@/projects/home/config";
import { Cursor } from "@/projects/home/islands/Cursor";
import { MotifCaption } from "@/projects/home/islands/MotifCaption";
import { Rail } from "@/projects/home/islands/Rail";
import { Frieze, MotifDefs, Painting } from "@/projects/home/opinions/Madhubani";
import { Gear, Intro, Play, Stack } from "@/projects/home/opinions/sections";
import { opinionsMetadata } from "@/projects/home/opinions/seo";
import { Footer } from "@/projects/home/sections/Footer";
import { Sprite } from "@/projects/home/sections/Sprite";

export const metadata: Metadata = opinionsMetadata;

/** The second page: the stack with a verdict on each tool, the gear, and hobbies. */
export default function OpinionsPage() {
  return (
    <>
      <Sprite />
      <MotifDefs />
      <Rail nav={opinionsNav} />
      <div className="opinionspage">
        <Painting />
        <Frieze />
        <MotifCaption />
        <main className="wrap" id="top">
          <Intro />
          <Stack />
          <Gear />
          <Play />
          <Footer nav={opinionsNav} />
        </main>
      </div>
      <Cursor />
    </>
  );
}
