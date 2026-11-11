/**
 * The copy for Off the record. Edit the words here; the components only lay them out.
 *
 * `draft: true` marks copy Vish hasn’t confirmed: a guess drawn from the work history on the home page, or a gap to fill.
 * The page shows a dashed "Draft" stamp beside it until the flag is removed, so nothing unconfirmed ships
 * quietly. `take: null` is a gap with no guess at all.
 */

/** Simple Icons ids that exist in ../icons.svg. */
export type IconId =
  | "elixir"
  | "typescript"
  | "react"
  | "bun"
  | "graphql"
  | "amazonwebservices"
  | "nextdotjs"
  | "swift"
  | "amazondynamodb";

export interface Take {
  name: string;
  icon?: IconId;
  take: string | null;
  draft?: boolean;
}

export interface Verdict {
  id: "swear-by" | "depends" | "swear-at";
  /** The heading, in two parts: plain, then italic. */
  title: readonly [string, string];
  /** One line under the heading. */
  blurb: string;
  takes: readonly Take[];
}

export const verdicts: readonly Verdict[] = [
  {
    id: "swear-by",
    title: ["Swear", "by"],
    blurb: "Reach for these first",
    takes: [
      {
        name: "Elixir and Phoenix",
        icon: "elixir",
        take: "The BEAM makes real-time boring, in the best way. Pattern matching ruined every other language’s if statements for me.",
        draft: true,
      },
      {
        name: "TypeScript",
        icon: "typescript",
        take: "I don’t write plain JavaScript any more. The compiler is the cheapest reviewer on any team.",
        draft: true,
      },
      {
        name: "Expo",
        icon: "react",
        take: "Moving a chat app onto the managed workflow deleted 300,000 lines. I stay managed until it physically can’t do the job.",
        draft: true,
      },
      {
        name: "Bun",
        icon: "bun",
        take: "Package manager, runner and test runner in one, quick enough that I stopped noticing installs. This site runs on it.",
        draft: true,
      },
      {
        name: "GraphQL code generation",
        icon: "graphql",
        take: "Types from the schema, not from memory. It replaced 10,000 hand-written lines at 8seats.",
        draft: true,
      },
    ],
  },
  {
    id: "depends",
    title: ["It", "depends"],
    blurb: "Good tools, with caveats",
    takes: [
      {
        name: "AWS",
        icon: "amazonwebservices",
        take: "It can do anything. It also names everything as if it can’t decide what it does.",
        draft: true,
      },
      {
        name: "DynamoDB",
        icon: "amazondynamodb",
        take: "Brilliant once you know every query up front. Painful the day product asks a new question.",
        draft: true,
      },
      {
        name: "Next.js",
        icon: "nextdotjs",
        take: "My default for the web, as long as I read the release notes before I upgrade.",
        draft: true,
      },
      {
        name: "Swift and SwiftUI",
        icon: "swift",
        take: "Yank is written in it. Lovely to write, until you need something Apple hasn’t wrapped yet.",
        draft: true,
      },
    ],
  },
  {
    id: "swear-at",
    title: ["Swear", "at"],
    blurb: "Used them, moved on",
    takes: [
      {
        name: "Amplify DataStore",
        take: "Offline sync that worked right up until it didn’t. I led the move off it, and I’d do it again.",
        draft: true,
      },
      {
        name: "Hand-written API types",
        take: "Every one of them is a bug waiting for a schema change.",
        draft: true,
      },
      {
        name: "Your pick",
        take: null,
        draft: true,
      },
    ],
  },
];

export interface DailyDriver {
  label: string;
  value: string | null;
  draft?: boolean;
}

/** The quick-fire list under the verdicts. */
export const dailyDrivers: readonly DailyDriver[] = [
  { label: "Machine", value: "A Mac", draft: true },
  { label: "Editor", value: null, draft: true },
  { label: "Terminal", value: null, draft: true },
  { label: "Clipboard", value: "Yank, obviously" },
];
