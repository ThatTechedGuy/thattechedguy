# thattechedguy.com

One Next.js project for the whole domain:

| URL           | What                                                  | Code                                 |
| ------------- | ----------------------------------------------------- | ------------------------------------ |
| `/`           | The home page ("Paper" look, almost no JavaScript)    | `app/(home)/`, `projects/home/`      |
| `/yank`       | Yank, the free, open-source clipboard manager for Mac | `app/(yank)/yank/`, `projects/yank/` |
| anything else | A plain 404 with no project's look                    | `app/global-not-found.tsx`           |

`robots.txt`, `sitemap.xml` and `llms.txt` are built at the domain root from `site.config.ts`.

## Commands

Bun is the package manager, script runner and test runner. Nothing needs Node: Next.js, the build, Playwright and Lighthouse all run under Bun.

```sh
bun install
bun run dev          # Turbopack dev server
bun run build        # production build (every page and image is prerendered)
bun run start        # serve the build
bun run check        # oxfmt, oxlint (type-aware), tsc, unit tests
bun run test:e2e     # Playwright in Chromium, WebKit and Firefox (reuses a server on :3100)
```

First time only: `bunx --bun playwright install chromium webkit firefox`.

On macOS 27, Firefox started from a terminal cannot read its own app-data folder and quits with "Could not find profile folder" ([Mozilla bug 2060476](https://bugzilla.mozilla.org/show_bug.cgi?id=2060476)). `playwright.config.ts` points `CFFIXED_USER_HOME` at an empty folder for Firefox on macOS; remove that once the bug is fixed.

Lighthouse (mobile, the default):

```sh
CHROME_PATH="$(ls -d ~/Library/Caches/ms-playwright/chromium-*/chrome-mac*/*.app/Contents/MacOS/* | head -1)" \
  bunx --bun lighthouse http://localhost:3100/yank --view
```

## How the code is laid out

```
app/                 routes only: layouts, pages, metadata files
  (home)/            the home page's root layout (<html>, theme script, metadata) and page
  (yank)/yank/       Yank's root layout and page, its OG image and icons
lib/                 shared and look-free: theme storage, reduced motion, View Transitions, JSON-LD
projects/<name>/     everything one project looks like: tokens, CSS, fonts, components, settings
site.config.ts       the domain, the GitHub link, the projects list, the Search Console token
```

Each route group has its own root layout, so a project's CSS, fonts and client code never load on another project's page. Shared code in `lib/` may not import a project or a route, and a project may not import another project; oxlint enforces both.

Each project remembers its own light/dark choice (`ttg:home:theme`, `ttg:yank:theme`).

### Yank's settings

`projects/yank/config.ts` holds what were runtime tweaks in the prototype: the accent colour, the navigation (`dock`, `tab` for the pull cord, or `menubar`), the default theme (`auto`, `light`, `dark`), the effects (`3D` or `patterns`), and the links. **The Download link is still the placeholder `#download`**: put the real URL in `downloadUrl`.

The 3D backdrop (Three.js) loads only on desktop-sized screens with a mouse, after the page is idle, and never under reduced motion. Phones never download it.

## Adding a project

Say it is called Lumen and lives at `/lumen`.

1. Make `projects/lumen/` with its stylesheet entry (copy the top of `projects/yank/styles/yank.css`: the Tailwind imports, `@source` lines and its own `@theme`), its fonts and components.
2. Make `app/(lumen)/lumen/layout.tsx` with its own `<html lang="en">`, the `ThemeScript` from `lib/theme` with a new storage key such as `ttg:lumen:theme`, its stylesheet import and its metadata. Add `page.tsx`, and `opengraph-image.tsx` and `icon.svg` if it needs them.
3. Add one entry to `projects` in `site.config.ts` (path, name, summary, icon, facts). The home page card, the sitemap and `llms.txt` pick it up.
4. Put its icon under `public/lumen/`.

Nothing else changes.

## Deploying on Vercel

Vercel detects `bun.lock` and installs and builds with Bun; no settings are needed for that.

1. Import the repository as a new project (framework: Next.js).
2. In **Settings → Domains**, add `thattechedguy.com` (connected to Production) and `www.thattechedguy.com`.
3. For `www.thattechedguy.com`, choose **Redirect to** `thattechedguy.com` with **308 Permanent Redirect**. At your DNS provider, set the records Vercel shows (an `A` record for the bare domain, a `CNAME` for `www`).
4. After the first production deploy, create a Google Search Console property for `https://thattechedguy.com`, choose the HTML tag method, and paste the token into `googleSiteVerification` in `site.config.ts`.

Only production deployments may be indexed (`VERCEL_ENV === "production"`): preview deployments serve a `robots.txt` that disallows everything and a `noindex` meta tag. In production every crawler is allowed, with the main AI crawlers named outright.

URLs have no trailing slash; `/yank/` redirects to `/yank`.

## Fonts

Apple devices use their system fonts (SF Pro, New York, SF Mono) and download nothing. Other devices get self-hosted Inter, JetBrains Mono (both through `next/font/google`) and Newsreader.

Newsreader is served from static files in `projects/yank/font-files/` (Google's latin 400, 400 italic and 600 cuts, 70 KB together) instead of `next/font/google`, whose variable files weigh 121 KB for the same text. To refresh them, ask Google Fonts for static cuts with a browser that predates variable fonts:

```sh
curl -s -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400"
```

and download the `/* latin */` URLs.

The share images (`opengraph-image.tsx`) use tiny font subsets in `projects/*/og/` that hold only the glyphs of their text. **If you change the text on a share image, download the subsets again**, passing the new text:

```sh
curl -s -A "Mozilla/4.0" "https://fonts.googleapis.com/css2?family=Inter:wght@700&text=Your%20clipboard%2C"
```

and fetch the `src` URL it returns into the matching `.ttf`.

## Measured results (local production build)

| Check                                                                 | `/`                   | `/yank`                                                    |
| --------------------------------------------------------------------- | --------------------- | ---------------------------------------------------------- |
| Lighthouse mobile: Performance / Accessibility / Best Practices / SEO | 100 / 100 / 100 / 100 | 95 / 100 / 100 / 100                                       |
| LCP (Lighthouse's slow-4G estimate)                                   | 0.8 s                 | 2.9 s                                                      |
| CLS                                                                   | 0                     | 0                                                          |
| JavaScript (brotli)                                                   | 119 KB on a phone     | 129 KB on a phone; +115 KB Three.js on desktop, after idle |

`/yank` misses the brief's LCP budget of 1.5 s. The real paint happens about 0.15 s after navigation, but Lighthouse's simulation charges LCP for every byte requested before it. With every script and font blocked, it still estimates 1.8 s; the rest is the Next.js and React runtime (about 114 KB of the JavaScript above, shared by every page) and Newsreader for non-Apple browsers.

Interactions on a phone with the CPU slowed four times take at most 80 ms, except the theme switch (105 to 190 ms): it restyles and repaints the whole page.
