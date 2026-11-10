import { projects, site } from "@/site.config";

// Built once at build time from the projects list, like the sitemap.
export const dynamic = "force-static";

/** /llms.txt (llmstxt.org): a plain-text summary of the site for AI assistants. */
export function GET() {
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.name} makes small, careful software for the Mac.`,
    "",
    ...projects.flatMap((project) => [
      `## ${project.name}`,
      "",
      `${project.summary} ${site.origin}${project.path}`,
      "",
      ...project.facts.map((fact) => `- ${fact}`),
      "",
    ]),
    "## Links",
    "",
    `- [Home](${site.origin}/)`,
    ...projects.map((project) => `- [${project.name}](${site.origin}${project.path})`),
    `- [GitHub](${site.githubUrl})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
