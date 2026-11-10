/** Domain-wide facts. Nothing here may carry colours, fonts or styling. */
export const site = {
  origin: "https://www.thattechedguy.com",
  name: "ThatTechedGuy",
  githubUrl: "https://github.com/thattechedguy",
  /** Google Search Console token; paste it here once the property is created. */
  googleSiteVerification: "",
} as const;

export interface Project {
  /** URL path of the project's page, without a trailing slash. */
  path: `/${string}`;
  name: string;
  /** One plain sentence, shown on the home card and in llms.txt. */
  summary: string;
  /** A static file, so the home page never imports the project's components. */
  iconPath: `/${string}`;
  /** Plain facts for llms.txt, each one a sentence an assistant can quote. Taken from the page's own copy. */
  facts: readonly string[];
}

/** Add a project here and it appears on the home page, in the sitemap and in llms.txt. */
export const projects: readonly Project[] = [
  {
    path: "/yank",
    name: "Yank",
    summary: "A free, open-source clipboard manager for Mac.",
    iconPath: "/yank/icon.svg",
    facts: [
      "Yank is a clipboard manager for macOS: it keeps a history of everything you copy.",
      "Press ⇧⌘V in any app to open your clipboard history along the bottom of the screen, then click a copy to paste it where you were typing.",
      "Search your copies, pin the ones you reuse, paste several in order, edit a copy before pasting, and paste without formatting.",
      "It saves text, links, images, colours and files.",
      "Private: nothing is uploaded, there is no account, copies from password apps are never saved, and you can pause saving, ignore an app or clear your history at any time.",
      "Free and open source, with no trial, subscription or ads. The code is at https://github.com/ThatTechedGuy/Yank.",
      "Requires macOS 26.4 or later.",
    ],
  },
];

/** Only the production deployment may be indexed; previews stay out of search. */
export const isIndexable = process.env["VERCEL_ENV"]
  ? process.env["VERCEL_ENV"] === "production"
  : process.env.NODE_ENV === "production";
