/** The stack page's search and sharing metadata. The home layout's metadata fills in the rest. */

import type { Metadata } from "next";

import { site } from "@/site.config";

import { stackPath } from "../config";

const title = "Opinions: Vishal Gupta’s tools, takes and hobbies";
const description =
  "The tools Vishal Gupta (ThatTechedGuy) reaches for, the ones he would rather not, and what he does off the clock: tennis, chess, padel and more.";

export const stackMetadata: Metadata = {
  title,
  description,
  alternates: { canonical: stackPath },
  openGraph: {
    type: "website",
    url: `${site.origin}${stackPath}`,
    siteName: site.name,
    title,
    description,
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image", title, description },
};
