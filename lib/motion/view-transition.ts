import { prefersReducedMotion } from "./media";

/** Starts a View Transition, or returns null where the browser has none (Firefox before 144, old Safari). */
export function startViewTransition(update: () => void): ViewTransition | null {
  if (!("startViewTransition" in document)) return null;
  try {
    return document.startViewTransition(update);
  } catch {
    return null;
  }
}

let jumping: ViewTransition | null = null;

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
  const html = document.documentElement;
  const way = target.getBoundingClientRect().top >= 0 ? "jump-down" : "jump-up";
  html.classList.remove("jump-down", "jump-up");
  html.classList.add(way);
  const transition = startViewTransition(jump);
  // A newer jump replaces this one; only the latest takes its class off.
  const done = () => {
    if (jumping === transition) html.classList.remove(way);
  };
  jumping = transition;
  if (!transition) {
    done();
    return Promise.resolve(jump());
  }
  void transition.finished.then(done, done);
  return transition.updateCallbackDone;
}
