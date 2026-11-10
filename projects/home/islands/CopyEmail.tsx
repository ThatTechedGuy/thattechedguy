"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** The email address and its Copy button. Where the clipboard is blocked, it selects the address instead. */
export function CopyEmail({ email }: { email: string }) {
  const [label, setLabel] = useState("Copy email");
  const address = useRef<HTMLSpanElement>(null);
  const reset = useRef(0);
  useEffect(() => () => clearTimeout(reset.current), []);

  const select = useCallback(() => {
    if (!address.current) return;
    const range = document.createRange();
    range.selectNodeContents(address.current);
    getSelection()?.removeAllRanges();
    getSelection()?.addRange(range);
    setLabel("Selected");
  }, []);
  const copied = useCallback(() => {
    setLabel("Copied");
    clearTimeout(reset.current);
    reset.current = window.setTimeout(() => setLabel("Copy email"), 1600);
  }, []);
  const copy = useCallback(() => {
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(email).then(copied, select);
    else select();
  }, [email, copied, select]);

  return (
    <>
      <p className="big">
        <span ref={address}>{email}</span>
      </p>
      <button className="copy-btn" type="button" onClick={copy}>
        {label}
      </button>
    </>
  );
}
