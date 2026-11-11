import type { MetadataRoute } from "next";

import { aboutPath } from "@/projects/home/config";
import { projects, site } from "@/site.config";

/** The home page, Off the record, and one entry per project in site.config.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.origin}/`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site.origin}${aboutPath}`, changeFrequency: "monthly", priority: 0.5 },
    ...projects.map((project) => ({
      url: `${site.origin}${project.path}`,
      changeFrequency: "weekly" as const,
      priority: 1,
    })),
  ];
}
