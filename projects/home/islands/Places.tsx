"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { prefersReducedMotion } from "@/lib/motion/media";

/** The footer slot that fades between Brisbane and the Gold Coast every 5 s, paused on hover or in a hidden tab. */
export function Places({ places }: { places: readonly { id: string; content: ReactNode }[] }) {
  const [shown, setShown] = useState(0);
  const held = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const id = setInterval(() => {
      if (!held.current && !document.hidden) setShown((k) => (k + 1) % places.length);
    }, 5000);
    return () => clearInterval(id);
  }, [places.length]);
  const hold = useCallback(() => (held.current = true), []);
  const release = useCallback(() => (held.current = false), []);

  return (
    <div className="places reveal" aria-live="off" onMouseEnter={hold} onMouseLeave={release}>
      {places.map(({ id, content }, k) => (
        <div key={id} className={k === shown ? "place on" : "place"}>
          {content}
        </div>
      ))}
    </div>
  );
}

// Brisbane's clock, read once a minute. The server renders the fallback text; the clock appears after hydration.
const subscribeMinute = (onChange: () => void) => {
  const id = setInterval(onChange, 30_000);
  return () => clearInterval(id);
};
const currentMinute = () => Math.floor(Date.now() / 60_000);
const noMinute = () => null;

const brisbane = (minute: number, options: Intl.DateTimeFormatOptions) =>
  new Date(minute * 60_000).toLocaleString("en-AU", { timeZone: "Australia/Brisbane", ...options });
const brisbaneHour = (minute: number) =>
  Number(brisbane(minute, { hour: "numeric", hourCycle: "h23" }));

const useMinute = () => useSyncExternalStore(subscribeMinute, currentMinute, noMinute);

/** "It’s 9:41 am here, probably shipping". */
export function BrisbaneTime() {
  const minute = useMinute();
  if (minute === null) return "AEST";
  const time = brisbane(minute, { hour: "numeric", minute: "2-digit" }).replace(" ", "\u00a0");
  const h = brisbaneHour(minute);
  const mood =
    h < 5
      ? "probably asleep"
      : h < 9
        ? "coffee first"
        : h < 17
          ? "probably shipping"
          : h < 21
            ? "probably on court"
            : "probably playing chess";
  return `It’s ${time} here, ${mood}`;
}

/** A day/night line for the Gold Coast, which shares Brisbane's clock. */
export function GoldCoastSky() {
  const minute = useMinute();
  if (minute === null) return "Usually sunny";
  const h = brisbaneHour(minute);
  return h >= 6 && h < 18 ? "Sun’s up, surf’s on" : "Lights on in Surfers";
}
