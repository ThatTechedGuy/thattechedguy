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
  | "pulumi"
  | "javascript"
  | "python"
  | "c"
  | "cplusplus"
  | "php"
  | "sql"
  | "drizzle"
  | "typeorm"
  | "express"
  | "jquery"
  | "bootstrap"
  | "styledcomponents"
  | "redux"
  | "gatsby"
  | "tanstack"
  | "openapiinitiative"
  | "postgresql"
  | "sst"
  | "terraform"
  | "githubactions"
  | "mongodb"
  | "prisma"
  | "mongoose"
  | "knexdotjs"
  | "sequelize";

export type Verdict = "love" | "like" | "complicated" | "hate";

export const verdictNames: Record<Verdict, string> = {
  love: "Love it",
  like: "Like it",
  complicated: "It’s complicated",
  hate: "Hate it",
};

export type Tier = "S" | "A" | "B" | "C" | "D";

/** Each tier's row, best first, with a few words on what the letter means. */
export const tiers: readonly (readonly [tier: Tier, meaning: string])[] = [
  ["S", "Reach for it first"],
  ["A", "Happy to"],
  ["B", "Right tool, right job"],
  ["C", "Only if I must"],
  ["D", "No, thank you"],
];

/** A language or framework in a tier list. */
export interface Ranked {
  /** Left out when Simple Icons has none. */
  icon?: IconId;
  name: string;
  tier: Tier;
  /** Shown on hover or focus. */
  take: string;
}

/** The languages, tiered. Within a tier, the order here is the order on the page. */
export const languages: readonly Ranked[] = [
  {
    icon: "elixir",
    name: "Elixir",
    tier: "S",
    take: "My go-to for backends. Concurrency and real-time come built in: channels for the live parts, and the BEAM underneath, where processes talk by passing messages. Functional is how backends should be written, and the ecosystem has everything I need.",
  },
  {
    icon: "rust",
    name: "Rust",
    tier: "S",
    take: "A big fan. The compiler catches what code review misses, Cargo makes building boring in the best way, and the community is huge. It’s also the best language I’ve found for writing agents.",
  },
  {
    icon: "typescript",
    name: "TypeScript",
    tier: "A",
    take: "Great for full-stack work, and the ecosystem is the best there is. My only complaint is that it’s slow.",
  },
  {
    icon: "c",
    name: "C",
    tier: "A",
    take: "Everything stems from it, and the tooling is superb. But managing memory by hand means segmentation faults, and these days Rust gives me the same control without them.",
  },
  {
    icon: "openjdk",
    name: "Java",
    tier: "B",
    take: "My first language. Solid, proven and everywhere, and the best place to do SOLID, clean architecture properly; I like that it’s both compiled and interpreted. But I can’t stand the tooling, it’s falling behind, and for every job it does, something else does it better.",
  },
  {
    icon: "swift",
    name: "Swift",
    tier: "B",
    take: "What Yank is written in, and lovely for native apps across the Apple ecosystem. Outside it, though, it barely gets used, and the community there is small.",
  },
  {
    icon: "sql",
    name: "SQL",
    tier: "B",
    take: "One DELETE without a WHERE and the table is gone. Still, it’s the only query language that feels comfortable and intuitive. Some days I think its authors are trolling: NULL = NULL isn’t true, it’s NULL.",
  },
  {
    icon: "cplusplus",
    name: "C++",
    tier: "C",
    take: "Everything I don’t like about C, segmentation faults included, with a lot more on top. For the same jobs, I’ll take Rust.",
  },
  {
    icon: "javascript",
    name: "JavaScript",
    tier: "D",
    take: "Slow, and no type safety. TypeScript fixes half of that.",
  },
  {
    icon: "python",
    name: "Python",
    tier: "D",
    take: "Slow, and people call it readable, but it isn’t: too much happens in a single line. It tries to do everything, and I still can’t tell what problem it’s solving.",
  },
  {
    icon: "php",
    name: "PHP",
    tier: "D",
    take: "Lmao. No further questions.",
  },
];

/** Frameworks, runtimes and libraries, tiered the same way. */
export const frameworks: readonly Ranked[] = [
  {
    icon: "react",
    name: "React Native",
    tier: "S",
    take: "Still the quickest way for one team to ship to both app stores. Expo brings amazing tooling, it runs at near-native speed, and over-the-air updates do something native apps can’t. Agents get on with it well, too.",
  },
  {
    icon: "phoenixframework",
    name: "Phoenix",
    tier: "S",
    take: "Nothing is better for writing backends. Production grade, and ten years ahead of the JavaScript world. LiveView does in a few lines what usually takes a whole frontend.",
  },
  {
    icon: "bun",
    name: "Bun",
    tier: "S",
    take: "What Deno tried to be. An amazing runtime with the tooling built in, and it makes the whole JavaScript ecosystem ten times better. Fast enough that I stopped noticing installs. This site runs on it.",
  },
  {
    icon: "nestjs",
    name: "NestJS",
    tier: "S",
    take: "Gives a big Node backend structure before it needs it, and has a recipe for everything, which agents love. On Bun with Fastify it’s very powerful, and the latest release fixed the last of its shortcomings.",
  },
  {
    icon: "drizzle",
    name: "Drizzle",
    tier: "S",
    take: "The ORM I reach for in TypeScript. No dependencies, plenty of plugins and a big community, and queries read like SQL or like an ORM, whichever suits.",
  },
  {
    icon: "elixir",
    name: "Ecto",
    tier: "S",
    take: "Phoenix’s database half, and just as good.",
  },
  {
    icon: "nextdotjs",
    name: "Next.js",
    tier: "A",
    take: "My default for the web, and with Bun the pair is just too powerful. But it’s never clear what runs on the server, it leans on Vercel and is tough to host anywhere else, and I dread the upgrade notes. Still, nothing in the community beats it right now.",
  },
  {
    icon: "tanstack",
    name: "TanStack",
    tier: "A",
    take: "Everything in it is good, and fast.",
  },
  {
    icon: "typeorm",
    name: "TypeORM",
    tier: "B",
    take: "It does the job, but it’s far too verbose.",
  },
  {
    icon: "react",
    name: "React",
    tier: "B",
    take: "Slow, with a big bundle, and faster alternatives exist. People overcomplicate it, too.",
  },
  {
    icon: "express",
    name: "Express",
    tier: "C",
    take: "Fine for a quick server. Anything bigger gets NestJS.",
  },
  {
    name: "Zustand",
    tier: "A",
    take: "Small and simple, and its selectors keep re-renders in check.",
  },
  {
    icon: "jquery",
    name: "jQuery",
    tier: "D",
    take: "Its time has passed.",
  },
  {
    icon: "bootstrap",
    name: "Bootstrap",
    tier: "D",
    take: "Its time has passed, too.",
  },
  {
    icon: "styledcomponents",
    name: "styled-components",
    tier: "D",
    take: "It slows the page down.",
  },
  {
    icon: "redux",
    name: "Redux",
    tier: "D",
    take: "Not even the latest version changed my mind. No.",
  },
  {
    icon: "gatsby",
    name: "Gatsby",
    tier: "D",
    take: "My first love. It has only got worse, and far better things exist now.",
  },
  {
    icon: "prisma",
    name: "Prisma",
    tier: "D",
    take: "Slow, with a learning curve to match.",
  },
  {
    icon: "mongoose",
    name: "Mongoose",
    tier: "D",
    take: "Ugh.",
  },
  {
    icon: "knexdotjs",
    name: "Knex",
    tier: "D",
    take: "What is it even solving?",
  },
  {
    icon: "sequelize",
    name: "Sequelize",
    tier: "D",
    take: "Solves nothing.",
  },
];

/** Cloud, APIs, databases and the tools that ship them, tiered the same way. */
export const cloud: readonly Ranked[] = [
  {
    icon: "amazonwebservices",
    name: "AWS",
    tier: "S",
    take: "It can do anything, and when it wants to, it can be as easy as Vercel. Picking the right one of its two hundred services is the hard part.",
  },
  {
    icon: "postgresql",
    name: "Postgres",
    tier: "S",
    take: "The database I reach for first.",
  },
  {
    icon: "sst",
    name: "SST",
    tier: "S",
    take: "Infrastructure that plugs straight into the codebase.",
  },
  {
    icon: "githubactions",
    name: "GitHub Actions",
    tier: "S",
    take: "CI where the code already lives. Everyone’s on GitHub anyway.",
  },
  {
    icon: "graphql",
    name: "GraphQL",
    tier: "A",
    take: "I love it, and it should be the default, but it takes a bit of setup. Worth it in the end, if only for the generated types.",
  },
  {
    icon: "pulumi",
    name: "Pulumi",
    tier: "A",
    take: "Infrastructure in a real language, with real loops and real types, and plenty of languages to pick from.",
  },
  {
    icon: "openapiinitiative",
    name: "REST",
    tier: "B",
    take: "Just works, and quick to get going, but useless without an OpenAPI spec or a convention. Done properly, GraphQL is worth far more; otherwise, set up OpenAPI, Swagger and type generation.",
  },
  {
    icon: "amazondynamodb",
    name: "DynamoDB",
    tier: "C",
    take: "Fast and cheap, and brilliant when you know every query up front. But it’s easy to mess up, the data has no sanctity, and the day the business changes direction or the core domain shifts, RIP.",
  },
  {
    icon: "terraform",
    name: "Terraform",
    tier: "C",
    take: "A lot to learn.",
  },
  {
    icon: "mongodb",
    name: "MongoDB",
    tier: "D",
    take: "Eww. Ban it.",
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
