"use client";

import {
  useCallback,
  useEffect,
  useMemo,
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
  const trigger = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);

  // Neither box below depends on --cx, so measuring never needs it reset first.
  const place = useCallback(() => {
    if (!trigger.current || !cardRef.current) return;
    const over =
      trigger.current.getBoundingClientRect().left +
      cardRef.current.offsetWidth -
      (document.documentElement.clientWidth - 16);
    setShift(over > 0 ? -over : 0);
  }, []);

  useEffect(() => {
    place();
    addEventListener("resize", place);
    void document.fonts.ready.then(place);
    return () => removeEventListener("resize", place);
  }, [place]);

  const placed = useMemo(() => ({ ...style, "--cx": `${shift}px` }), [style, shift]);

  return (
    <span
      ref={trigger}
      className={className}
      style={placed}
      // Focus opens the card for keyboard users, as hover does for the mouse. A <button> would not
      // wrap across lines inside the sentence, so this stays a focusable <span>.
      // oxlint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      data-cursor={label}
      onMouseEnter={place}
      onFocus={place}
    >
      {children}
      <span ref={cardRef} className={cardClassName} role="tooltip">
        {card}
      </span>
    </span>
  );
}
