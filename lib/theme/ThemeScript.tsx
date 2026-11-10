import { themeInitScript, type ThemeDefault } from "./theme";

/** Put this first in <head>. The <html> element needs suppressHydrationWarning, because the script adds data-theme. */
export function ThemeScript({
  storageKey,
  fallback,
}: {
  storageKey: string;
  fallback: ThemeDefault;
}) {
  // oxlint-disable-next-line react-perf/jsx-no-new-object-as-prop -- a Server Component renders once; there is nothing to memoize.
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript(storageKey, fallback) }} />;
}
