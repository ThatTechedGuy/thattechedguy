import { expect, test } from "bun:test";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

test("sitemap lists the home page, Off the record and every project with absolute bare-domain URLs", () => {
  const urls = sitemap().map((entry) => entry.url);
  expect(urls).toEqual([
    "https://thattechedguy.com/",
    "https://thattechedguy.com/about",
    "https://thattechedguy.com/yank",
  ]);
});

test("robots never allows indexing outside production", () => {
  // bun test runs with NODE_ENV=test, so this is the preview/dev branch.
  expect(robots().rules).toEqual({ userAgent: "*", disallow: "/" });
});
