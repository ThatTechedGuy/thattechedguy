/** Yank's search and sharing metadata: title, description, structured data. */

import type { Metadata, Viewport } from "next";

import { graph, webSite } from "@/lib/seo/json-ld";
import { isIndexable, site } from "@/site.config";

import { plainPage, yank } from "./config";

const url = `${site.origin}/yank`;
const title = "Yank: free, open-source clipboard manager for Mac";
const description =
  "Yank remembers everything you copy on your Mac. Search it, pin it, paste it back with ⇧⌘V. Free, open source, and private: nothing leaves your Mac.";
const absolute = (path: string) => new URL(path, url).href;

export const yankMetadata: Metadata = {
  metadataBase: new URL(site.origin),
  title,
  description,
  alternates: { canonical: "/yank" },
  // robots.txt already blocks previews; the meta tag also keeps them out if one gets linked.
  robots: { index: isIndexable, follow: isIndexable },
  manifest: "/yank/manifest.webmanifest",
  openGraph: { type: "website", url, siteName: "Yank", title, description, locale: "en_US" },
  twitter: { card: "summary_large_image", title, description },
};

export const yankViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: plainPage["data-bg"] },
    { media: "(prefers-color-scheme: dark)", color: plainPage["data-bg-dark"] },
  ],
};

export const yankJsonLd = graph(
  {
    // Also SoftwareSourceCode, because codeRepository belongs to that type. No ratings or reviews: there are none.
    "@type": ["SoftwareApplication", "SoftwareSourceCode"],
    "@id": `${url}#app`,
    name: "Yank",
    url,
    description,
    operatingSystem: "macOS 26.4 or later",
    applicationCategory: "UtilitiesApplication",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    downloadUrl: absolute(yank.downloadUrl),
    screenshot: absolute("/yank/screenshot.jpg"),
    license: yank.licenseUrl,
    codeRepository: yank.repoUrl,
  },
  webSite("Yank", url, description),
  {
    "@type": "Organization",
    "@id": `${site.origin}#organization`,
    name: site.name,
    url: site.origin,
    logo: absolute("/yank/icon.svg"),
    sameAs: [yank.repoUrl, site.githubUrl],
  },
);
