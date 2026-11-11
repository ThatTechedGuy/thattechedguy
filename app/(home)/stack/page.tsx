import type { Metadata } from "next";

import { stackNav } from "@/projects/home/config";
import { Cursor } from "@/projects/home/islands/Cursor";
import { Drift } from "@/projects/home/islands/Drift";
import { Rail } from "@/projects/home/islands/Rail";
import { Footer } from "@/projects/home/sections/Footer";
import { Sprite } from "@/projects/home/sections/Sprite";
import { Borders, MotifDefs } from "@/projects/home/stack/Madhubani";
import { Intro, Play, Stack, Takes } from "@/projects/home/stack/sections";
import { stackMetadata } from "@/projects/home/stack/seo";

export const metadata: Metadata = stackMetadata;

/** The second page: the stack with a verdict on each tool, a ledger of takes, and hobbies. */
export default function StackPage() {
  return (
    <>
      <Sprite />
      <MotifDefs />
      <Rail nav={stackNav} />
      <div className="stackpage">
        <Borders />
        <main className="wrap" id="top">
          <Intro />
          <Stack />
          <Takes />
          <Play />
          <Footer nav={stackNav} />
        </main>
      </div>
      <Drift />
      <Cursor />
    </>
  );
}
