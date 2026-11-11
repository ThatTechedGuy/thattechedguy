import type { Metadata } from "next";

import { JsonLd } from "@/lib/seo/json-ld";
import { Hobbies } from "@/projects/home/about/Hobbies";
import { Intro } from "@/projects/home/about/Intro";
import { MithilaBorders } from "@/projects/home/about/Mithila";
import { aboutJsonLd, aboutMetadata } from "@/projects/home/about/seo";
import { Stack } from "@/projects/home/about/Stack";
import { aboutNav } from "@/projects/home/config";
import { Cursor } from "@/projects/home/islands/Cursor";
import { Rail } from "@/projects/home/islands/Rail";
import { Footer } from "@/projects/home/sections/Footer";
import { Sprite } from "@/projects/home/sections/Sprite";

// This page's own styles, on top of the home stylesheet the (home) layout loads. Only this page imports it.
import "@/projects/home/styles/about.css";

export const metadata: Metadata = aboutMetadata;

/** Off the record: opinions on tools, and hobbies. Same paper, fonts and islands as the home page. */
export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <Sprite />
      <Rail nav={aboutNav} />
      <div className="about">
        <MithilaBorders />
        <main className="wrap" id="top">
          <Intro />
          <Stack />
          <Hobbies />
          <Footer nav={aboutNav} />
        </main>
      </div>
      <Cursor />
    </>
  );
}
