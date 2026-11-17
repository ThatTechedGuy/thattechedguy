import { themeInitScript, type ThemeDefault } from "./theme";

/** Put this first in <head>. The <html> element needs suppressHydrationWarning, because the script adds data-theme. */
export function ThemeScript({
  storageKey,
  fallback,
}: {
  storageKey: string;
  fallback: ThemeDefault;
}) {
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript(storageKey, fallback) }} />;
}
