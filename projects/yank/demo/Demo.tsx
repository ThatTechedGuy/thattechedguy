"use client";

import {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";

import { ClipCard } from "./ClipCard";
import {
  boardOf,
  boards,
  clips,
  demoReducer,
  initialDemoState,
  isSearching,
  visibleClips,
} from "./clips";
import { NotePad } from "./NotePad";

const TOAST_MS = 1400;
const pill =
  "min-h-44 cursor-pointer rounded-full border-0 px-16 font-sans text-[15px] font-semibold";

function Key({ children, action }: { children: ReactNode; action: string }) {
  return (
    <span>
      <kbd className="rounded-[7px] bg-surf px-7 py-2 font-sans font-bold text-ink shadow-[0_1px_0_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.1)]">
        {children}
      </kbd>{" "}
      {action}
    </span>
  );
}

/**
 * The "Try it" demo: a working copy of Yank's strip. It renders on the server with its starting state,
 * so the sample copies are real text before (and without) JavaScript. Rules live in clips.ts.
 */
export function Demo() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState);
  const rowRef = useRef<HTMLDivElement>(null);
  const keyMoved = useRef(false);
  const list = visibleClips(state);
  const query = state.query.trim();
  const selectedClip = clips.find((clip) => clip.id === state.selected);
  const pinned = selectedClip !== undefined && boardOf(state, selectedClip) === "snippets";

  const toastId = state.toast?.id;
  useEffect(() => {
    if (toastId === undefined) return undefined;
    const timer = setTimeout(() => dispatch({ type: "hideToast", id: toastId }), TOAST_MS);
    return () => clearTimeout(timer);
  }, [toastId]);

  // After an arrow key, scroll the row just enough to show the selected card.
  useEffect(() => {
    if (!keyMoved.current) return;
    keyMoved.current = false;
    const row = rowRef.current;
    const card = row?.querySelector<HTMLElement>(`[data-clip="${state.selected}"]`);
    if (!row || !card) return;
    const left = card.offsetLeft;
    const right = left + card.offsetWidth;
    if (left < row.scrollLeft) row.scrollLeft = left - 12;
    else if (right > row.scrollLeft + row.clientWidth)
      row.scrollLeft = right - row.clientWidth + 12;
  }, [state.selected]);

  const onStripKey = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.target instanceof HTMLInputElement) return;
      const { key } = event;
      if (key === "ArrowRight" || key === "ArrowLeft") {
        keyMoved.current = true;
        dispatch({ type: "move", by: key === "ArrowRight" ? 1 : -1 });
      } else if (key === "Enter") dispatch({ type: "paste", plain: event.shiftKey });
      else if (key === "p" || key === "P") dispatch({ type: "pin" });
      else if (/^[1-9]$/.test(key)) {
        const clip = list[Number(key) - 1];
        if (!clip) return;
        dispatch({ type: "paste", plain: event.shiftKey, id: clip.id });
      } else return;
      event.preventDefault();
    },
    [list],
  );
  const onSearchKey = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") dispatch({ type: "paste", plain: event.shiftKey });
    else if (event.key !== "ArrowDown") return;
    event.preventDefault();
  }, []);
  const onQuery = useCallback(
    (event: ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: "query", query: event.target.value }),
    [],
  );
  const clearQuery = useCallback(() => dispatch({ type: "query", query: "" }), []);
  const pickTab = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const board = boards.find((item) => item.id === event.currentTarget.dataset["board"]);
    if (board) dispatch({ type: "tab", board: board.id });
  }, []);
  const selectClip = useCallback(
    (event: MouseEvent<HTMLButtonElement>) =>
      dispatch({ type: "select", id: event.currentTarget.dataset["clip"] ?? "" }),
    [],
  );
  const pasteClip = useCallback(
    (event: MouseEvent<HTMLButtonElement>) =>
      dispatch({ type: "paste", plain: false, id: event.currentTarget.dataset["clip"] ?? "" }),
    [],
  );
  const pin = useCallback(() => dispatch({ type: "pin" }), []);
  const pastePlain = useCallback(() => dispatch({ type: "paste", plain: true }), []);
  const pasteRich = useCallback(() => dispatch({ type: "paste", plain: false }), []);
  const clearNotes = useCallback(() => dispatch({ type: "clearNotes" }), []);

  return (
    <div className="flex flex-col gap-16 font-sans text-ink">
      <NotePad notes={state.notes} onClear={clearNotes} />
      {/* A toolbar: the strip itself takes the arrow keys, as Yank's real strip does. */}
      <div
        tabIndex={0}
        role="toolbar"
        onKeyDown={onStripKey}
        aria-label="Yank strip. Use the left and right arrow keys to pick a card and Return to paste."
        className="glass relative rounded-[26px] border-2 border-[#E5E5EA] p-18 shadow-[inset_0_1px_0_#FFFFFF,0_30px_80px_rgba(0,0,0,0.12)] outline-none focus-within:border-accent"
      >
        <div className="flex flex-wrap items-center gap-12 px-2 pt-2 pb-16">
          <label className="flex min-h-44 max-w-full min-w-0 flex-[1_1_220px] items-center gap-10 rounded-full bg-[rgba(118,118,128,0.12)] px-16">
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6E6E73"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <span className="sr-only">Search your copies</span>
            <input
              type="text"
              value={state.query}
              onChange={onQuery}
              onKeyDown={onSearchKey}
              placeholder="Search copies, try “gate”"
              className="min-w-0 flex-1 border-0 bg-transparent font-sans text-[16px] text-ink outline-none"
            />
            {query.length > 0 && (
              <button
                type="button"
                onClick={clearQuery}
                aria-label="Clear search"
                className="size-28 cursor-pointer rounded-full border-0 bg-[#E5E5EA] text-[14px] text-graphite"
              >
                ×
              </button>
            )}
          </label>
          <div
            role="tablist"
            aria-label="Lists"
            className="flex max-w-full flex-nowrap gap-2 overflow-x-auto rounded-full bg-[rgba(118,118,128,0.14)] p-3"
          >
            {boards.map((board) => {
              const on = !isSearching(state) && state.tab === board.id;
              const count = clips.filter((clip) => boardOf(state, clip) === board.id).length;
              return (
                <button
                  key={board.id}
                  type="button"
                  role="tab"
                  data-board={board.id}
                  aria-selected={on}
                  onClick={pickTab}
                  className={`min-h-40 flex-none cursor-pointer rounded-full border-0 px-16 font-sans text-[15px] font-semibold whitespace-nowrap transition-colors duration-[120ms] ${on ? "bg-white text-graphite shadow-[0_1px_3px_rgba(0,0,0,0.14),0_0_0_0.5px_rgba(0,0,0,0.04)]" : "bg-transparent text-ink"}`}
                >
                  {board.label} <span className="font-medium opacity-60">{count}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div
          ref={rowRef}
          className="[scrollbar-width:thin] overflow-x-auto scroll-smooth px-2 pt-10 pb-14"
        >
          <div className="flex w-max gap-12">
            {list.map((clip, index) => (
              <ClipCard
                key={clip.id}
                clip={clip}
                badge={index < 9 ? String(index + 1) : ""}
                selected={clip.id === state.selected}
                onSelect={selectClip}
                onPaste={pasteClip}
              />
            ))}
            {list.length === 0 && (
              <div className="flex h-236 w-440 max-w-[calc(100vw-120px)] items-center justify-center rounded-[16px] border-2 border-dashed border-[#D2D2D7] p-24 text-center text-[16px] text-muted">
                {isSearching(state)
                  ? `Nothing matches “${query}”. Try “gate” or “recipe”.`
                  : "Nothing pinned here yet. Pick a card and press P."}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-14 border-t border-hair2 px-2 pt-12 pb-2">
          <div className="flex flex-wrap gap-14 text-[13px] text-muted">
            <Key action="pick">← →</Key>
            <Key action="paste">Return</Key>
            <Key action="no formatting">⇧ Return</Key>
            <Key action="pin">P</Key>
            <Key action="paste that card">1–9</Key>
          </div>
          <div className="flex flex-wrap gap-8">
            <button
              type="button"
              onClick={pin}
              className={`${pill} bg-[rgba(118,118,128,0.12)] text-ink`}
            >
              {pinned ? "Unpin" : "Pin"}
            </button>
            <button
              type="button"
              onClick={pastePlain}
              className={`${pill} bg-[rgba(118,118,128,0.12)] text-ink`}
            >
              Paste without formatting
            </button>
            <button
              type="button"
              onClick={pasteRich}
              className={`${pill} btn-accent px-22 font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_6px_16px_rgba(10,132,255,0.3)]`}
            >
              Paste
            </button>
          </div>
        </div>
        {state.toast && (
          <output
            key={state.toast.id}
            className="toast-pop pointer-events-none absolute -top-22 left-1/2 flex items-center gap-10 rounded-full bg-[rgba(29,29,31,0.78)] px-20 py-11 text-[14px] font-semibold whitespace-nowrap text-white shadow-[0_16px_34px_rgba(0,0,0,0.2)] backdrop-blur-[20px]"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l5 5 9-10" />
            </svg>
            {state.toast.text}
          </output>
        )}
      </div>
    </div>
  );
}
