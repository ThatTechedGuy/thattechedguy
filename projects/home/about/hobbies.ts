/**
 * The copy for Off the record's hobbies. Same rules as stack.ts: `draft: true` shows a "Draft" stamp
 * until Vish confirms the words, and `note: null` is a gap with no guess.
 */

export interface Spec {
  label: string;
  value: string;
  /** A smaller second line, such as an opening's first moves. */
  detail?: string;
}

export interface Feature {
  id: string;
  name: string;
  /** One serif line under the name. */
  lede: string;
  specs: readonly Spec[];
}

export const tennis: Feature = {
  id: "tennis",
  name: "Tennis",
  lede: "A baseliner who would rather out-rally you than come to the net.",
  specs: [
    { label: "Style", value: "Baseliner" },
    { label: "Backhand", value: "Two-handed" },
    { label: "Game", value: "Hits hard from the back of the court" },
  ],
};

/** Each opening's first moves are in algebraic notation, as a chess book would print them. */
export const chess: Feature = {
  id: "chess",
  name: "Chess",
  lede: "Classical with White, sharp with Black.",
  specs: [
    { label: "As White", value: "Ruy Lopez", detail: "1.e4 e5 2.Nf3 Nc6 3.Bb5" },
    { label: "As White", value: "Queen’s Gambit", detail: "1.d4 d5 2.c4" },
    { label: "Against 1.d4", value: "Nimzo-Indian", detail: "1.d4 Nf6 2.c4 e6 3.Nc3 Bb4" },
    {
      label: "Against 1.e4",
      value: "Sicilian: the Najdorf or the Dragon",
      detail: "1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3, then a6 or g6",
    },
  ],
};

export interface Interest {
  name: string;
  kind: string;
  note: string | null;
  draft?: boolean;
}

/** The smaller rows under the two features, in no particular order. */
export const interests: readonly Interest[] = [
  {
    name: "Pickleball and padel",
    kind: "More racquets",
    note: "Tennis’s friendlier cousins: smaller courts, more chat, and I still hit too hard.",
    draft: true,
  },
  {
    name: "Harry Potter",
    kind: "Books",
    note: "Read more times than I’ll admit to.",
    draft: true,
  },
  {
    name: "Dragon Ball Z",
    kind: "Anime",
    note: "Where my idea of a training montage comes from.",
    draft: true,
  },
  {
    name: "Solo Leveling",
    kind: "Manhwa and anime",
    note: "The best levelling-up arc since Dragon Ball.",
    draft: true,
  },
  {
    name: "Infinity Blade",
    kind: "Games",
    note: "The game that taught me what a parry window is.",
    draft: true,
  },
  { name: "Kolkata", kind: "Place", note: null, draft: true },
  { name: "The number 5", kind: "Lucky number", note: null, draft: true },
];
