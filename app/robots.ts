import type { MetadataRoute } from "next";

import { isIndexable, site } from "@/site.config";

/** AI crawlers named outright, so the welcome is explicit for the assistants that check for their own name. */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
];

/** Production allows every crawler, AI crawlers included. Preview deployments allow none. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${site.origin}/sitemap.xml`,
    host: site.origin,
  };
}
