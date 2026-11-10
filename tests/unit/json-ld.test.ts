import { expect, test } from "bun:test";

import { JsonLd } from "@/lib/seo/json-ld";
import { homeJsonLd } from "@/projects/home/seo";
import { yankJsonLd } from "@/projects/yank/seo";

interface Graph {
  "@context": string;
  "@graph": Record<string, unknown>[];
}

/** The data parsed back from JSON, the way a crawler reads the page's script tag. */
const parse = (data: object): Graph => {
  const parsed: Graph = JSON.parse(JSON.stringify(data));
  return parsed;
};
const byType = (data: object, type: string) =>
  parse(data)["@graph"].find((thing) => [thing["@type"]].flat().includes(type));

test("Yank's JSON-LD describes a free macOS app with absolute URLs and no ratings", () => {
  expect(parse(yankJsonLd)["@context"]).toBe("https://schema.org");
  const app = byType(yankJsonLd, "SoftwareApplication");
  expect(app).toMatchObject({
    name: "Yank",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS 26.4 or later",
    isAccessibleForFree: true,
    offers: { price: "0", priceCurrency: "USD" },
    codeRepository: "https://github.com/ThatTechedGuy/Yank",
  });
  for (const key of ["url", "screenshot"]) {
    expect(String(app?.[key])).toStartWith("https://thattechedguy.com/");
  }
  expect(app?.["downloadUrl"]).toBe("https://github.com/ThatTechedGuy/Yank/releases/latest");
  expect(String(app?.["license"])).toStartWith("https://");
  expect(app).not.toContainKey("aggregateRating");
  expect(app).not.toContainKey("review");
  expect(byType(yankJsonLd, "WebSite")).toBeDefined();
  expect(byType(yankJsonLd, "Organization")?.["sameAs"]).toContain(
    "https://github.com/ThatTechedGuy/Yank",
  );
});

test("the home page's JSON-LD has a WebSite and a Person", () => {
  expect(byType(homeJsonLd, "WebSite")?.["url"]).toBe("https://thattechedguy.com/");
  expect(byType(homeJsonLd, "Person")?.["sameAs"]).toContain("https://github.com/thattechedguy");
});

test("a '<' in the data cannot close the script tag", () => {
  const html = JSON.stringify(JsonLd({ data: { name: "</script><b>" } }).props);
  expect(html).not.toContain("</script>");
});
