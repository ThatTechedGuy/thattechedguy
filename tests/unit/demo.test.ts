import { expect, test } from "bun:test";

import {
  boardOf,
  clips,
  demoReducer,
  initialDemoState,
  visibleClips,
  type DemoAction,
  type DemoState,
} from "@/projects/yank/demo/clips";

const run = (...actions: DemoAction[]): DemoState => actions.reduce(demoReducer, initialDemoState);
const ids = (state: DemoState) => visibleClips(state).map((clip) => clip.id);

test("searching “gate” finds only the boarding pass and selects it", () => {
  const state = run({ type: "query", query: "gate" });
  expect(ids(state)).toEqual(["c3"]);
  expect(state.selected).toBe("c3");
});

test("search needs every word, ignores case, and reaches other boards and hex values", () => {
  expect(ids(run({ type: "query", query: "LEMON eggs" }))).toEqual(["c5"]);
  expect(ids(run({ type: "query", query: "lemon train" }))).toEqual([]);
  expect(ids(run({ type: "query", query: "passport" }))).toEqual(["w2"]);
  expect(ids(run({ type: "query", query: "#bf5a" }))).toEqual(["s3"]);
});

test("one character does not search; the open tab stays", () => {
  expect(ids(run({ type: "query", query: " g " }))).toEqual(ids(initialDemoState));
});

test("arrow moves stop at both ends of the row", () => {
  expect(run({ type: "move", by: -1 }).selected).toBe("c1");
  const last = Array.from({ length: 20 }, (): DemoAction => ({ type: "move", by: 1 }));
  expect(run(...last).selected).toBe("c8");
});

test("pasting keeps only the last 8 notes and names the clip in the toast", () => {
  const pastes = clips
    .slice(0, 10)
    .map((clip): DemoAction => ({ type: "paste", plain: false, id: clip.id }));
  const state = run(...pastes);
  expect(state.notes.map((note) => note.text)).toHaveLength(8);
  // c1 and c2 fell off; c3 is an image, pasted as a description, and c4 a colour, pasted as its hex.
  expect(state.notes[0]?.text).toBe("Boarding pass photo");
  expect(state.notes[1]?.text).toBe("#0A84FF");
  expect(state.toast?.text).toBe("Pasted your home address");
  expect(run({ type: "paste", plain: true }).toast?.text).toBe("Pasted without formatting");
});

test("pinning moves a copy to Snippets and back", () => {
  const pinned = run({ type: "select", id: "c2" }, { type: "pin" });
  const c2 = clips.find((clip) => clip.id === "c2");
  if (!c2) throw new Error("c2 missing");
  expect(boardOf(pinned, c2)).toBe("snippets");
  expect(ids(pinned)).not.toContain("c2");
  const back = demoReducer(pinned, { type: "pin" });
  expect(boardOf(back, c2)).toBe("history");
  expect(back.toast?.text).toBe("Moved back to All copies");
});

test("unpinning a snippet sends it to All copies", () => {
  const state = run({ type: "tab", board: "snippets" }, { type: "pin" });
  expect(state.selected).toBe("s1");
  expect(state.toast?.text).toBe("Unpinned");
  expect(ids(state)).toEqual(["s2", "s3"]);
});

test("an old toast timer does not hide a newer toast", () => {
  const first = run({ type: "paste", plain: false });
  const second = demoReducer(first, { type: "paste", plain: true });
  expect(
    demoReducer(second, { type: "hideToast", id: first.toast?.id ?? -1 }).toast,
  ).not.toBeNull();
  expect(demoReducer(second, { type: "hideToast", id: second.toast?.id ?? -1 }).toast).toBeNull();
});
