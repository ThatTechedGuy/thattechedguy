/**
 * The stack page's copy. Edit the words here; the components only lay them out.
 */

import type { MotifId } from "./art";

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

export type Verdict = "love" | "like" | "complicated" | "hate";

export const verdictNames: Record<Verdict, string> = {
  love: "Love it",
  like: "Like it",
  complicated: "It’s complicated",
  hate: "Hate it",
};

export interface Tool {
  icon: IconId;
  name: string;
  verdict: Verdict;
  take: string;
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
      },
      {
        icon: "elixir",
        name: "Elixir",
        verdict: "love",
        take: "Pattern matching and the BEAM make real-time features feel easy. I miss both in every other language.",
      },
      {
        icon: "swift",
        name: "Swift",
        verdict: "like",
        take: "What Yank is written in. A native Mac app still feels better than anything wrapped in a browser.",
      },
      {
        icon: "rust",
        name: "Rust",
        verdict: "like",
        take: "For when it has to be fast and correct. I reach for it less often than I’d like to.",
      },
      {
        icon: "openjdk",
        name: "Java",
        verdict: "complicated",
        take: "Solid, proven and everywhere. Mostly, everywhere.",
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
      },
      {
        icon: "phoenixframework",
        name: "Phoenix",
        verdict: "love",
        take: "LiveView does in a few lines what usually takes a whole frontend.",
      },
      {
        icon: "nextdotjs",
        name: "Next.js",
        verdict: "like",
        take: "My default for the web, as long as everyone is clear on what runs on the server.",
      },
      {
        icon: "nestjs",
        name: "NestJS",
        verdict: "like",
        take: "Gives a big Node backend some structure before it needs it.",
      },
      {
        icon: "bun",
        name: "Bun",
        verdict: "like",
        take: "Fast enough that I stopped noticing installs. This site runs on it.",
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
      },
      {
        icon: "graphql",
        name: "GraphQL",
        verdict: "like",
        take: "Worth it for the generated types alone.",
      },
      {
        icon: "amazondynamodb",
        name: "DynamoDB",
        verdict: "complicated",
        take: "Brilliant when you know every query up front. Painful the day product asks a new one.",
      },
      {
        icon: "pulumi",
        name: "Pulumi",
        verdict: "like",
        take: "Infrastructure in a real language, with real loops and real types.",
      },
    ],
  },
];

/** What it all runs on: each row is a name, a line about it, and an optional verdict. */
export interface GearGroup {
  name: string;
  items: readonly (readonly [name: string, detail: string, verdict?: Verdict])[];
}

export const gear: readonly GearGroup[] = [
  {
    name: "Devices",
    items: [
      ["MacBook Pro 16-inch", "M4 Pro"],
      ["Lenovo Legion Pro 7i", "RTX 4080, dual-booting Arch Linux and Windows"],
      ["Samsung Galaxy S25 Ultra", "Phone"],
    ],
  },
  {
    name: "Operating systems",
    items: [
      ["Arch Linux", "On the Legion, with KDE Plasma on Wayland", "love"],
      ["macOS", "On the MacBook", "like"],
      ["Windows", "For gaming, and nothing else", "hate"],
    ],
  },
  {
    name: "Software",
    items: [
      ["Ghostty", "Terminal"],
      ["VS Code", "Editor"],
      ["Zsh", "Shell, with the zsh4humans preset"],
      ["Amp", "Coding agent, on a Claude Max subscription"],
    ],
  },
  {
    name: "Wearables",
    items: [
      ["Galaxy Watch Ultra", "Watch"],
      ["Galaxy Ring", "Ring"],
    ],
  },
  {
    name: "Sound",
    items: [
      ["KZ Duonic", "In-ear monitors"],
      ["HyperX Cloud Alpha", "Headphones"],
      ["Sony WH-1000XM5", "Headphones, for music"],
    ],
  },
];

export interface Hobby {
  motif: MotifId;
  name: string;
  kind: string;
  /** A spec list, for the two big tiles. */
  specs?: readonly (readonly [label: string, value: string])[];
  /** A list of names shown as chips, each with an optional aside. */
  list?: readonly (readonly [name: string, aside?: string])[];
  /** A line under the list. */
  footnote?: string;
  note?: string;
  size?: "big" | "span3";
}

export const hobbies: readonly Hobby[] = [
  {
    motif: "tennis",
    name: "Tennis",
    kind: "On court",
    size: "big",
    specs: [
      ["Style", "Baseliner who hits hard"],
      ["Backhand", "Two-handed"],
      ["Racket", "Wilson Blade v8, 16x19"],
      ["For fun", "Wilson Clash 100 v2, 16x19"],
      ["Strings", "Luxilon Alu Power at 24 kg, mains and crosses"],
      ["Court", "Hard court"],
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
    note: "Played with a Ben Johns Pro Stock paddle. I still hit it too hard.",
  },
  {
    motif: "padel",
    name: "Padel",
    kind: "More racquets",
    note: "The walls are part of the court. Still getting used to that.",
  },
  {
    motif: "dragon",
    name: "Dragons",
    kind: "A soft spot",
    note: "The Sicilian kind, and the fire-breathing kind.",
  },
  {
    motif: "wizard",
    name: "Harry Potter",
    kind: "Books and films",
    note: "Read more times than I’ll admit to.",
  },
  {
    motif: "orb",
    name: "Dragon Ball Z",
    kind: "Anime",
    note: "Where my idea of a training montage comes from.",
  },
  {
    motif: "gate",
    name: "Solo Leveling",
    kind: "Manhwa and anime",
    note: "The best levelling-up arc since Dragon Ball.",
  },
  { motif: "kolkata", name: "Kolkata", kind: "Place" },
  {
    motif: "five",
    name: "The number 5",
    kind: "Favourite number",
  },
  {
    motif: "mocha",
    name: "Coffee",
    kind: "Fuel",
    note: "A mocha with caramel and hazelnut syrup. Coke Zero when it’s not coffee o’clock.",
  },
  {
    motif: "sword",
    name: "Games",
    kind: "Controller in hand",
    size: "span3",
    list: [
      ["Infinity Blade"],
      ["Critical Ops"],
      ["Hogwarts Legacy"],
      ["Elden Ring", "not finished, and I struggle a lot"],
      ["Assassin’s Creed IV: Black Flag"],
      ["GTA V"],
      ["Project IGI"],
      ["Valorant"],
      ["Call of Duty: Warzone"],
      ["Hitman: World of Assassination"],
    ],
    footnote: "In no particular order.",
  },
];
