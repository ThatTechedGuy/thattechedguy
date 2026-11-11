/** Off the record's search and sharing metadata. The rest (robots, verification, base URL) comes from the home layout. */

import type { Metadata } from "next";

import { graph } from "@/lib/seo/json-ld";
import { site } from "@/site.config";

import { aboutPath } from "../config";

const url = `${site.origin}${aboutPath}`;
const title = "Off the record: Vishal Gupta on tools, tennis and chess";
const description =
  "The tools Vishal Gupta (ThatTechedGuy) swears by and swears at, from Elixir to Bun, and what the Brisbane AI engineer does off the clock: tennis, chess and more.";

export const aboutMetadata: Metadata = {
  title,
  description,
  alternates: { canonical: aboutPath },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title,
    description,
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const aboutJsonLd = graph({
  "@type": "AboutPage",
  "@id": `${url}#page`,
  url,
  name: title,
  description,
  inLanguage: "en-AU",
  isPartOf: { "@id": `${site.origin}/#website` },
  // The person is described once, on the home page.
  about: { "@id": `${site.origin}/#person` },
});
