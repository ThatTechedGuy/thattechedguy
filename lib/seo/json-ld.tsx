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

export const organization = (name: string, url: string, logo: string, sameAs: string[]): Thing => ({
  "@type": "Organization",
  "@id": `${url}#organization`,
  name,
  url,
  logo,
  sameAs,
});

export const person = (name: string, url: string, sameAs: string[]): Thing => ({
  "@type": "Person",
  "@id": `${url}#person`,
  name,
  url,
  sameAs,
});

export interface FreeAppFacts {
  name: string;
  url: string;
  description: string;
  operatingSystem: string;
  downloadUrl: string;
  screenshot: string;
  license: string;
  codeRepository: string;
}

/**
 * A free app. It is also typed SoftwareSourceCode, because codeRepository belongs to that type.
 * No ratings or reviews: there are none to report.
 */
export const freeApp = (facts: FreeAppFacts): Thing => ({
  "@type": ["SoftwareApplication", "SoftwareSourceCode"],
  "@id": `${facts.url}#app`,
  ...facts,
  applicationCategory: "UtilitiesApplication",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
});

/** One @graph per page, so the things can point at each other by @id. */
export const graph = (...things: Thing[]) => ({
  "@context": "https://schema.org",
  "@graph": things,
});

/** Put this in <head>. `<` is escaped so no string in the data can close the script tag. */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replaceAll("<", "\\u003c");
  // oxlint-disable-next-line react-perf/jsx-no-new-object-as-prop -- a Server Component renders once; there is nothing to memoize.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
