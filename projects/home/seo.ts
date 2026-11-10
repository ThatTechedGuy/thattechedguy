/** The home page's search and sharing metadata. */

import type { Metadata, Viewport } from "next";

import { graph, person, webSite } from "@/lib/seo/json-ld";
import { isIndexable, site } from "@/site.config";

const title = "ThatTechedGuy: software engineer and programming polyglot";
const description =
  "Software engineer, programming polyglot, tennis and chess player. New things are on the way. For now, meet Yank, a free, open-source clipboard manager for Mac.";

export const homeMetadata: Metadata = {
  metadataBase: new URL(site.origin),
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: isIndexable, follow: isIndexable },
  openGraph: {
    type: "website",
    url: `${site.origin}/`,
    siteName: site.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  ...(site.googleSiteVerification ? { verification: { google: site.googleSiteVerification } } : {}),
};

export const homeViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF9F5" },
    { media: "(prefers-color-scheme: dark)", color: "#121210" },
  ],
};

export const homeJsonLd = graph(
  webSite(site.name, `${site.origin}/`, description),
  person(site.name, `${site.origin}/`, [site.githubUrl]),
);
