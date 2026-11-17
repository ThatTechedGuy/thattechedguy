/** schema.org JSON-LD builders and the tag that embeds them. Look-free: every project passes its own facts. */

type Thing = Record<string, unknown>;

export const webSite = (name: string, url: string, description: string): Thing => ({
  "@type": "WebSite",
  "@id": `${url}#website`,
  name,
  url,
  description,
  inLanguage: "en",
});

/** One @graph per page, so the things can point at each other by @id. */
export const graph = (...things: Thing[]) => ({
  "@context": "https://schema.org",
  "@graph": things,
});

/** Put this in <head>. `<` is escaped so no string in the data can close the script tag. */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
