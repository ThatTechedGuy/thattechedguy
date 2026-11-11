import { prefersReducedMotion } from "./media";

let running: { transition: ViewTransition; className: string } | null = null;

/**
 * Starts a View Transition, or returns null where the browser has none (Firefox before 144, old Safari).
 * `className` stays on <html> while it runs, so CSS can style this kind of transition; a newer one replaces it.
 */
export function startViewTransition(update: () => void, className?: string): ViewTransition | null {
  if (!("startViewTransition" in document)) return null;
  const html = document.documentElement;
  if (running?.className) html.classList.remove(running.className);
  if (className) html.classList.add(className);
  try {
    const transition = document.startViewTransition(update);
    const mine = { transition, className: className ?? "" };
    running = mine;
    const done = () => {
      if (running !== mine) return;
      if (className) html.classList.remove(className);
      running = null;
    };
    void transition.finished.then(done, done);
    return transition;
  } catch {
    if (className) html.classList.remove(className);
    return null;
  }
}

/**
 * Jumps to an in-page target as a View Transition that travels the way the page moves (page-transition.css).
 * Resolves once the page is at the target. With reduced motion, or no View Transitions, it is the plain jump.
 */
export function jumpTo(target: Element, hash: string): Promise<void> {
  const jump = () => {
    // Setting the same hash again does not scroll.
    if (location.hash === hash) target.scrollIntoView();
    else location.hash = hash;
  };
  if (prefersReducedMotion()) return Promise.resolve(jump());
  const way = target.getBoundingClientRect().top >= 0 ? "jump-down" : "jump-up";
  const transition = startViewTransition(jump, way);
  return transition ? transition.updateCallbackDone : Promise.resolve(jump());
}
