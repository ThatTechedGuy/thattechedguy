import { projects } from "@/site.config";

/** The home page's own settings. Its palette is remembered apart from every project's theme. */
export const homePaletteKey = "ttg:home:palette";

/** Each palette's paper and ink; the full token sets live in styles/tokens.css under :root[data-palette]. */
export const palettes = [
  { id: "butter", name: "Butter", paper: "#f3dc6b", ink: "#1c1a10" },
  { id: "matcha", name: "Matcha", paper: "#cfdcb4", ink: "#142010" },
  { id: "riso", name: "Riso pink", paper: "#f6c6d3", ink: "#2a0d4a" },
  { id: "lilac", name: "Lilac", paper: "#cdc4f0", ink: "#1a1240" },
  { id: "tangerine", name: "Tangerine", paper: "#ff8a4c", ink: "#1a0d05" },
  { id: "blueprint", name: "Blueprint", paper: "#2340c2", ink: "#f2f0e6" },
  { id: "midnight", name: "Midnight", paper: "#0f0f0e", ink: "#edebe5" },
  { id: "newsprint", name: "Newsprint", paper: "#f8f7f3", ink: "#111110" },
] as const;

export type PaletteId = (typeof palettes)[number]["id"];

export const linkedinUrl = "https://www.linkedin.com/in/vishg05/";

/**
 * Yank's page, from the domain's projects list. A plain <a>: Yank has its own root layout, so Next.js
 * would load it as a full page even through <Link>, which only adds 2.6 KB of client JS here.
 */
export const yankPath = projects.find((project) => project.name === "Yank")?.path ?? "/yank";
export const email = "thattechedguy@gmail.com";

/** The sections the side rail and the phone index link to, in page order. */
export const sections = [
  { id: "record", name: "Record" },
  { id: "work", name: "Work" },
  { id: "education", name: "Education" },
  { id: "contact", name: "Contact" },
] as const;
