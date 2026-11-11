/**
 * The stack page's copy. Edit the words here; the components only lay them out.
 *
 * `draft: true` marks a line Vish hasn't confirmed yet. The page shows a dashed "Draft" stamp beside it until
 * the flag is removed, so nothing unconfirmed ships quietly. `note: null` is a gap with no guess at all.
 */

import type { MotifId } from "./madhubani";

/** Simple Icons ids that exist in ../icons.svg. */
export type IconId =
  | "typescript"
  | "elixir"
  | "swift"
  | "rust"
  | "openjdk"
  | "react"
  | "phoenixframework"
  | "nextdotjs"
  | "nestjs"
  | "bun"
  | "amazonwebservices"
  | "graphql"
  | "amazondynamodb"
  | "pulumi";

export type Verdict = "love" | "like" | "complicated";

export const verdictNames: Record<Verdict, string> = {
  love: "Love it",
  like: "Like it",
  complicated: "It’s complicated",
};

export interface Tool {
  icon: IconId;
  name: string;
  verdict: Verdict;
  take: string;
  draft?: boolean;
}

export interface Layer {
  name: string;
  tools: readonly Tool[];
}

export const layers: readonly Layer[] = [
  {
    name: "Languages",
    tools: [
      {
        icon: "typescript",
        name: "TypeScript",
        verdict: "love",
        take: "My default for anything with a UI or an API. Types are documentation that can’t go out of date.",
        draft: true,
      },
      {
        icon: "elixir",
        name: "Elixir",
        verdict: "love",
        take: "Pattern matching and the BEAM make real-time features feel easy. I miss both in every other language.",
        draft: true,
      },
      {
        icon: "swift",
        name: "Swift",
        verdict: "like",
        take: "What Yank is written in. A native Mac app still feels better than anything wrapped in a browser.",
        draft: true,
      },
      {
        icon: "rust",
        name: "Rust",
        verdict: "like",
        take: "For when it has to be fast and correct. I reach for it less often than I’d like to.",
        draft: true,
      },
      {
        icon: "openjdk",
        name: "Java",
        verdict: "complicated",
        take: "Solid, proven and everywhere. Mostly, everywhere.",
        draft: true,
      },
    ],
  },
  {
    name: "Frameworks and runtimes",
    tools: [
      {
        icon: "react",
        name: "React Native",
        verdict: "love",
        take: "Still the quickest way for one team to ship to both app stores.",
        draft: true,
      },
      {
        icon: "phoenixframework",
        name: "Phoenix",
        verdict: "love",
        take: "LiveView does in a few lines what usually takes a whole frontend.",
        draft: true,
      },
      {
        icon: "nextdotjs",
        name: "Next.js",
        verdict: "like",
        take: "My default for the web, as long as everyone is clear on what runs on the server.",
        draft: true,
      },
      {
        icon: "nestjs",
        name: "NestJS",
        verdict: "like",
        take: "Gives a big Node backend some structure before it needs it.",
        draft: true,
      },
      {
        icon: "bun",
        name: "Bun",
        verdict: "like",
        take: "Fast enough that I stopped noticing installs. This site runs on it.",
        draft: true,
      },
    ],
  },
  {
    name: "Cloud and data",
    tools: [
      {
        icon: "amazonwebservices",
        name: "AWS",
        verdict: "complicated",
        take: "It can do anything. Picking the right one of its two hundred services is the hard part.",
        draft: true,
      },
      {
        icon: "graphql",
        name: "GraphQL",
        verdict: "like",
        take: "Worth it for the generated types alone.",
        draft: true,
      },
      {
        icon: "amazondynamodb",
        name: "DynamoDB",
        verdict: "complicated",
        take: "Brilliant when you know every query up front. Painful the day product asks a new one.",
        draft: true,
      },
      {
        icon: "pulumi",
        name: "Pulumi",
        verdict: "like",
        take: "Infrastructure in a real language, with real loops and real types.",
        draft: true,
      },
    ],
  },
];

/** "Yes, please" on the left, "Rather not" on the right; the right-hand side is struck through. */
export const takes: readonly (readonly [yes: string, no: string])[] = [
  ["Boring technology that pages nobody at 3am", "Rewriting it in the new thing because it’s new"],
  ["Small pull requests, merged often", "The 4,000-line pull request on a Friday"],
  ["Types generated from the source of truth", "Hand-written types that drift from the API"],
  ["One well-structured app until it hurts", "Microservices before anyone has users"],
  ["Tests that describe what the code should do", "Snapshot tests nobody reads"],
  ["Reading the docs first", "Pasting the first answer that compiles"],
];
export const takesDraft = true;

export interface Hobby {
  motif: MotifId;
  name: string;
  kind: string;
  /** A spec list, for the two big tiles. */
  specs?: readonly (readonly [label: string, value: string])[];
  note?: string | null;
  draft?: boolean;
  size?: "big" | "wide";
}

export const hobbies: readonly Hobby[] = [
  {
    motif: "tennis",
    name: "Tennis",
    kind: "On court",
    size: "big",
    specs: [
      ["Style", "Baseliner"],
      ["Backhand", "Two-handed"],
      ["Game", "Hits hard, and would rather out-rally you than volley"],
    ],
  },
  {
    motif: "chess",
    name: "Chess",
    kind: "Over the board",
    size: "big",
    specs: [
      ["As White", "Ruy Lopez, Queen’s Gambit"],
      ["Against 1.d4", "Nimzo-Indian"],
      ["Against 1.e4", "Sicilian: the Najdorf or the Dragon"],
    ],
  },
  {
    motif: "pickleball",
    name: "Pickleball",
    kind: "More racquets",
    note: "Tennis’s friendlier cousin. I still hit it too hard.",
    draft: true,
  },
  {
    motif: "padel",
    name: "Padel",
    kind: "More racquets",
    note: "The walls are part of the court. Still getting used to that.",
    draft: true,
  },
  {
    motif: "dragon",
    name: "Dragons",
    kind: "A soft spot",
    note: "The Sicilian kind, and the fire-breathing kind.",
    draft: true,
  },
  {
    motif: "wizard",
    name: "Harry Potter",
    kind: "Books and films",
    note: "Read more times than I’ll admit to.",
    draft: true,
  },
  {
    motif: "orb",
    name: "Dragon Ball Z",
    kind: "Anime",
    note: "Where my idea of a training montage comes from.",
    draft: true,
  },
  {
    motif: "gate",
    name: "Solo Leveling",
    kind: "Manhwa and anime",
    note: "The best levelling-up arc since Dragon Ball.",
    draft: true,
  },
  {
    motif: "sword",
    name: "Infinity Blade",
    kind: "Games",
    note: "The iPhone game that taught me what a parry window is.",
    draft: true,
  },
  { motif: "kolkata", name: "Kolkata", kind: "Place", note: null, draft: true },
  {
    motif: "five",
    name: "The number 5",
    kind: "Favourite number",
    note: null,
    draft: true,
    size: "wide",
  },
];
