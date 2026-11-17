import { ViewTransition } from "react";

import { homeNav } from "@/projects/home/config";
import { Cursor } from "@/projects/home/islands/Cursor";
import { Rail } from "@/projects/home/islands/Rail";
import { Contact } from "@/projects/home/sections/Contact";
import { Footer } from "@/projects/home/sections/Footer";
import { Hero } from "@/projects/home/sections/Hero";
import { Record } from "@/projects/home/sections/Record";
import { Sprite } from "@/projects/home/sections/Sprite";
import { Ticker } from "@/projects/home/sections/Ticker";
import { Work } from "@/projects/home/sections/Work";

/** Vishal Gupta's one-page site. Everything is prerendered; only the small islands hydrate. */
export default function HomePage() {
  return (
    // Mounting a <ViewTransition> makes a <Link> navigation run as a page transition. default="none": nothing in it
    // gets its own layer, so the whole page animates as one (lib/motion/page-transition.css).
    <ViewTransition default="none">
      <Sprite />
      <Rail nav={homeNav} />
      <main className="wrap" id="top">
        <Hero />
        <Ticker />
        <Record />
        <Work />
        <Contact />
        <Footer nav={homeNav} />
      </main>
      <Cursor />
    </ViewTransition>
  );
}
