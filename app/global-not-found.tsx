import type { Metadata } from "next";
import Link from "next/link";

// No project owns an unmatched URL, so this page has no project look: system fonts and colours only.
const css = `:root{color-scheme:light dark;font-family:system-ui,-apple-system,sans-serif}
body{margin:0;min-height:100vh;display:grid;place-content:center;gap:12px;padding:24px;text-align:center}
h1{margin:0;font-size:28px}p{margin:0}a{color:LinkText}`;

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist.",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <head>
        <style>{css}</style>
      </head>
      <body>
        <main>
          <h1>Page not found</h1>
          <p>
            This page does not exist. Go to the <Link href="/">home page</Link> or see{" "}
            <Link href="/yank">Yank</Link>.
          </p>
        </main>
      </body>
    </html>
  );
}
