"use client";

import {
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * A dotted phrase in the intro that opens its card on hover or keyboard focus.
 * The card shifts left (--cx) when it would run off the right edge, so it never widens the page.
 */
export function HoverCard({
  label,
  card,
  cardClassName = "card",
  className = "hov",
  style,
  children,
}: {
  /** The custom cursor's label. */
  label: string;
  /** What the card shows. */
  card: ReactNode;
  cardClassName?: string;
  className?: string;
  style?: CSSProperties;
  /** The dotted phrase. */
  children: ReactNode;
}) {
  const trigger = useRef<HTMLAnchorElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);
  const cardId = useId();

  // Neither box below depends on --cx, so measuring never needs it reset first.
  const place = () => {
    if (!trigger.current || !cardRef.current) return;
    const over =
      trigger.current.getBoundingClientRect().left +
      cardRef.current.offsetWidth -
      (document.documentElement.clientWidth - 16);
    setShift(over > 0 ? -over : 0);
  };

  const onLayout = useEffectEvent(place);
  useEffect(() => {
    const relayout = () => onLayout();
    relayout();
    addEventListener("resize", relayout);
    void document.fonts.ready.then(relayout);
    return () => removeEventListener("resize", relayout);
  }, []);

  const placed: CSSProperties & Record<"--cx", string> = { ...style, "--cx": `${shift}px` };

  return (
    // A link to its note, like a footnote: focusable, and it wraps across lines inside the sentence (a <button>
    // cannot). Focus opens the card for keyboard and touch, as hover does for the mouse; the click stays on the page
    // and focuses the link, since Safari does not focus links on click or tap. The card is its description.
    <a
      ref={trigger}
      href={`#${cardId}`}
      className={className}
      style={placed}
      data-cursor={label}
      aria-describedby={cardId}
      onMouseEnter={place}
      onFocus={place}
      onClick={(event) => {
        event.preventDefault();
        event.currentTarget.focus();
      }}
    >
      {children}
      <span ref={cardRef} id={cardId} className={cardClassName} aria-hidden="true">
        {card}
      </span>
    </a>
  );
}
