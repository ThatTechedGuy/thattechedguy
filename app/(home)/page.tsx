import { JsonLd } from "@/lib/seo/json-ld";
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
import { homeJsonLd } from "@/projects/home/seo";

/** Vishal Gupta's one-page site. Everything is prerendered; only the small islands hydrate. */
export default function HomePage() {
  return (
    <>
      <JsonLd data={homeJsonLd} />
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
    </>
  );
}
