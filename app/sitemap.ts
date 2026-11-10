import type { MetadataRoute } from "next";

import { projects, site } from "@/site.config";

/** The home page plus one entry per project in site.config.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.origin}/`, changeFrequency: "monthly", priority: 0.6 },
    ...projects.map((project) => ({
      url: `${site.origin}${project.path}`,
      changeFrequency: "weekly" as const,
      priority: 1,
    })),
  ];
}
