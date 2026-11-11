/** The home page's search and sharing metadata, and the facts about its owner that llms.txt repeats. */

import type { Metadata, Viewport } from "next";

import { graph, person, webSite } from "@/lib/seo/json-ld";
import { isIndexable, site } from "@/site.config";

import { linkedinUrl } from "./config";

const url = `${site.origin}/`;
const title = "Vishal Gupta (ThatTechedGuy): AI Engineer in Brisbane";
const description =
  "Vishal Gupta (ThatTechedGuy) is an AI engineer in Brisbane building cloud and agentic products at Westpac. Elixir, React Native and AWS, with 20+ products shipped.";

export const homeMetadata: Metadata = {
  metadataBase: new URL(site.origin),
  title,
  description,
  authors: [{ name: "Vishal Gupta", url }],
  alternates: { canonical: "/" },
  robots: { index: isIndexable, follow: isIndexable },
  openGraph: {
    type: "profile",
    firstName: "Vishal",
    lastName: "Gupta",
    username: site.name,
    url,
    siteName: site.name,
    title,
    description,
    locale: "en_AU",
  },
  twitter: { card: "summary_large_image", title, description },
  ...(site.googleSiteVerification ? { verification: { google: site.googleSiteVerification } } : {}),
};

export const homeViewport: Viewport = {
  // The page uses env(safe-area-inset-*), so it draws under the notch and home indicator.
  viewportFit: "cover",
  // No themeColor: the paper is random per visit, so islands/Rail.tsx renders it once it is known.
};

export const homeJsonLd = graph(
  webSite(site.name, url, description),
  {
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    name: title,
    inLanguage: "en-AU",
    isPartOf: { "@id": `${url}#website` },
    mainEntity: { "@id": `${url}#person` },
  },
  {
    ...person("Vishal Gupta", url, [site.githubUrl, linkedinUrl]),
    alternateName: site.name,
    description,
    jobTitle: "AI Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Westpac Group",
      url: "https://www.westpac.com.au/",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "The University of Queensland",
      url: "https://uq.edu.au/",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    },
    knowsAbout: [
      "Software engineering",
      "Cloud computing",
      "Artificial intelligence",
      "Elixir",
      "Phoenix",
      "TypeScript",
      "React Native",
      "Next.js",
      "AWS",
      "GraphQL",
      "Python",
      "Django",
      "Stripe",
      "Swift",
    ],
  },
);

/** Plain facts for llms.txt, each one a sentence an assistant can quote. Taken from the page's own copy. */
export const homeFacts: readonly string[] = [
  "Vishal Gupta, also known as ThatTechedGuy, is an AI engineer in Brisbane, Australia.",
  "Since 2025 he has been an AI Engineer at Westpac Group's Gold Coast Engineering Hub, working on cloud and AI problems for consumer retail banking on Westpac UNITE.",
  "From 2023 to 2025 he was a Software Engineer at 8seats in Sydney: he led a squad of six moving a chat app to Expo, led the move to a distributed Elixir and Phoenix backend, and built payments and subscriptions on Stripe.",
  "From 2022 to 2023 he was a Software Engineer at DreamWalk in Brisbane, where he built VegAssess, a React Native tablet app ecologists use to survey flora and fauna.",
  "From 2020 to 2021 he was a Software Engineer at smallcase in Bengaluru, as its React Native app grew from 100,000 to more than 2 million users.",
  "He has shipped 20+ products since 2020, across fintech, SaaS, agriculture, retail and telecoms.",
  "He holds a Bachelor of Engineering (Honours) in Software Engineering from The University of Queensland (2021 to 2022).",
  "He works in Elixir, TypeScript, React Native, Next.js, NestJS, Bun, Swift, Java, Rust, AWS and Azure.",
  "Off the clock he plays tennis and chess.",
];
