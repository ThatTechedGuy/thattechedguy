/** The "Try it" demo's sample clipboard and its rules, kept pure so they are unit-tested apart from the UI. */

export type ClipKind = "link" | "text" | "image" | "color" | "file";
export type Board = "history" | "snippets" | "travel";

export interface Clip {
  id: string;
  /** The list it starts in; pinning can move it (see DemoState.pins). */
  board: Board;
  kind: ClipKind;
  kindLabel: string;
  body?: string;
  /** Second line under links and files. */
  domain?: string;
  /** Big italic words on link and image previews. */
  preview?: string;
  hex?: `#${string}`;
  app: string;
  time: string;
  /** How the toast names it: "Pasted the cabin link". */
  short: string;
  /** Extra words search matches, besides the body and hex. */
  search: string;
}

export const clips: readonly Clip[] = [
  {
    id: "c1",
    board: "history",
    kind: "link",
    kindLabel: "Link",
    body: "Lakeside cabin, 3 nights in June",
    domain: "example.com/cabins",
    preview: "the cabin",
    app: "Safari",
    time: "just now",
    short: "the cabin link",
    search: "link cabin booking safari trip lake",
  },
  {
    id: "c2",
    board: "history",
    kind: "text",
    kindLabel: "Text",
    body: "Meet at 4 by the blue door. Bring the spare keys.",
    app: "Messages",
    time: "2 min ago",
    short: "Meet at 4 by the blue door",
    search: "meet blue door keys messages",
  },
  {
    id: "c3",
    board: "history",
    kind: "image",
    kindLabel: "Image",
    body: "Words found: “Gate B12, 7:40”",
    preview: "Boarding pass",
    app: "Photos",
    time: "9 min ago",
    short: "the boarding pass photo",
    search: "image photo boarding pass gate b12 flight",
  },
  {
    id: "c4",
    board: "history",
    kind: "color",
    kindLabel: "Color",
    hex: "#0A84FF",
    app: "Pages",
    time: "14 min ago",
    short: "#0A84FF",
    search: "color hex pages blue orange",
  },
  {
    id: "c5",
    board: "history",
    kind: "text",
    kindLabel: "Text",
    body: "Lemon cake: 200g butter, 200g sugar, 3 eggs, 1 lemon",
    app: "Notes",
    time: "31 min ago",
    short: "the lemon cake recipe",
    search: "recipe lemon cake butter eggs notes",
  },
  {
    id: "c6",
    board: "history",
    kind: "file",
    kindLabel: "File",
    body: "Tickets.pdf",
    domain: "PDF document",
    app: "Finder",
    time: "1 hr ago",
    short: "Tickets.pdf",
    search: "file tickets pdf finder",
  },
  {
    id: "c7",
    board: "history",
    kind: "text",
    kindLabel: "Text",
    body: "Tracking number 1Z 999 AA1 0123 4567 84",
    app: "Mail",
    time: "3 hr ago",
    short: "the tracking number",
    search: "tracking number parcel mail",
  },
  {
    id: "c8",
    board: "history",
    kind: "link",
    kindLabel: "Link",
    body: "Train times, Saturday",
    domain: "example.com/trains",
    preview: "trains",
    app: "Safari",
    time: "yesterday",
    short: "the train times",
    search: "link train times travel saturday",
  },
  {
    id: "s1",
    board: "snippets",
    kind: "text",
    kindLabel: "Text",
    body: "Thanks so much,\nSam",
    app: "Mail",
    time: "pinned",
    short: "your sign-off",
    search: "signature sign-off thanks sam",
  },
  {
    id: "s2",
    board: "snippets",
    kind: "text",
    kindLabel: "Text",
    body: "221 Maple Street, Apt 4\nSpringfield",
    app: "Contacts",
    time: "pinned",
    short: "your home address",
    search: "address home maple street",
  },
  {
    id: "s3",
    board: "snippets",
    kind: "color",
    kindLabel: "Color",
    hex: "#BF5AF2",
    app: "Pages",
    time: "pinned",
    short: "#BF5AF2",
    search: "color hex brand",
  },
  {
    id: "w2",
    board: "travel",
    kind: "file",
    kindLabel: "File",
    body: "Passport-scan.jpg",
    domain: "Image file",
    app: "Finder",
    time: "pinned",
    short: "Passport-scan.jpg",
    search: "file passport scan travel",
  },
];

export const boards: readonly { id: Board; label: string }[] = [
  { id: "history", label: "All copies" },
  { id: "snippets", label: "Snippets" },
  { id: "travel", label: "Travel" },
];

/** One paste in the notes area. */
export interface Pasted {
  key: number;
  kind: ClipKind;
  text: string;
  hex: string;
  /** Pasted without formatting. */
  plain: boolean;
}

export interface DemoState {
  tab: Board;
  selected: string;
  query: string;
  /** The toast's id restarts its timer when the same message shows twice. */
  toast: { id: number; text: string } | null;
  /** Clips moved by pinning, by id. */
  pins: Partial<Record<string, Board>>;
  notes: Pasted[];
  seq: number;
}

export type DemoAction =
  | { type: "select"; id: string }
  | { type: "tab"; board: Board }
  | { type: "query"; query: string }
  | { type: "move"; by: -1 | 1 }
  | { type: "paste"; plain: boolean; id?: string }
  | { type: "pin" }
  | { type: "clearNotes" }
  | { type: "hideToast"; id: number };

export const initialDemoState: DemoState = {
  tab: "history",
  selected: "c1",
  query: "",
  toast: null,
  pins: {},
  notes: [],
  seq: 0,
};

/** The notes area keeps only the latest pastes. */
export const NOTES_KEPT = 8;
/** Search starts at this many characters. */
const MIN_QUERY = 2;

export const boardOf = (state: DemoState, clip: Clip): Board => state.pins[clip.id] ?? clip.board;

export const isSearching = (state: DemoState): boolean => state.query.trim().length >= MIN_QUERY;

/** The cards in the row: search results while searching (every word must match), otherwise the open tab. */
export function visibleClips(state: DemoState): Clip[] {
  const words = state.query.trim().toLowerCase().split(/\s+/);
  if (!isSearching(state)) return clips.filter((clip) => boardOf(state, clip) === state.tab);
  return clips.filter((clip) => {
    const haystack = `${clip.search} ${clip.body ?? ""} ${clip.hex ?? ""}`.toLowerCase();
    return words.every((word) => haystack.includes(word));
  });
}

const toast = (state: DemoState, text: string): DemoState => ({
  ...state,
  seq: state.seq + 1,
  toast: { id: state.seq + 1, text },
});

function paste(state: DemoState, plain: boolean, id: string): DemoState {
  const clip = clips.find((item) => item.id === id);
  if (!clip) return state;
  const text =
    clip.kind === "color"
      ? (clip.hex ?? "")
      : clip.kind === "image"
        ? "Boarding pass photo"
        : (clip.body ?? "");
  const pasted: Pasted = { key: state.seq + 1, kind: clip.kind, text, hex: clip.hex ?? "", plain };
  const next = { ...state, selected: clip.id, notes: [...state.notes, pasted].slice(-NOTES_KEPT) };
  return toast(next, plain ? "Pasted without formatting" : `Pasted ${clip.short}`);
}

function togglePin(state: DemoState): DemoState {
  const clip = clips.find((item) => item.id === state.selected);
  if (!clip) return state;
  const pins = { ...state.pins };
  let message: string;
  if (boardOf(state, clip) !== "snippets") {
    pins[clip.id] = "snippets";
    message = "Pinned to Snippets";
  } else if (clip.board === "snippets") {
    pins[clip.id] = "history";
    message = "Unpinned";
  } else {
    delete pins[clip.id];
    message = "Moved back to All copies";
  }
  return toast({ ...state, pins }, message);
}

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "select":
      return { ...state, selected: action.id };
    case "tab": {
      const first = clips.find((clip) => boardOf(state, clip) === action.board);
      return { ...state, tab: action.board, query: "", selected: first?.id ?? state.selected };
    }
    case "query": {
      const next = { ...state, query: action.query };
      if (!isSearching(next)) return next;
      // Keep the selection on a visible card, so Return pastes a search result.
      const results = visibleClips(next);
      const first = results[0];
      return first && !results.some((clip) => clip.id === state.selected)
        ? { ...next, selected: first.id }
        : next;
    }
    case "move": {
      const list = visibleClips(state);
      if (list.length === 0) return state;
      const index = list.findIndex((clip) => clip.id === state.selected);
      const target =
        index < 0 ? list[0] : list[Math.max(0, Math.min(list.length - 1, index + action.by))];
      return target ? { ...state, selected: target.id } : state;
    }
    case "paste":
      return paste(state, action.plain, action.id ?? state.selected);
    case "pin":
      return togglePin(state);
    case "clearNotes":
      return { ...state, notes: [] };
    default: // hideToast
      return state.toast?.id === action.id ? { ...state, toast: null } : state;
  }
}
