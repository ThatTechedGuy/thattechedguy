# thattechedguy.com

One Next.js project for the whole domain:

| URL           | What                                                  | Code                                 |
| ------------- | ----------------------------------------------------- | ------------------------------------ |
| `/`           | Vishal Gupta's one-page site (editorial look)         | `app/(home)/`, `projects/home/`      |
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

Each page remembers its own colours: the home page its paper (`ttg:home:palette`), Yank its light/dark theme (`ttg:yank:theme`).

### The home page

The design came as one static `index.html` (an editorial magazine page). Its markup is ported to Server Components in `projects/home/sections/`, its CSS to `projects/home/styles/home.css` almost verbatim, and its script to small client islands in `projects/home/islands/` (the rail and its menus, the typed name, hover cards, the copy button, the footer places and clock, the cursor). Two measurements the script did are now pure CSS, so nothing moves when it hydrates: the name slot reserves the longer name's width, and the footer nameplate fills the column with container units.

- Copy lives in the section components; the palettes, links, email and section list in `projects/home/config.ts`. **The email is still the design's placeholder `hello@thattechedguy.com`.**
- Search and sharing: `projects/home/seo.ts` (title, description, a `ProfilePage` and `Person` JSON-LD built from the résumé, and the facts `llms.txt` repeats).
- Logos are 96 px WebP files in `projects/home/logos/`, re-encoded from the design's 1024 px sources. Icons that show above the fold sit inline in `sections/Sprite.tsx`; the tool, GitHub and LinkedIn icons are in `projects/home/icons.svg`, one cached file, so the page does not carry them twice (once in the HTML and once in React's payload).
- No data is fetched: the Brisbane clock is the visitor's own clock read in the `Australia/Brisbane` time zone.

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

The home page self-hosts Newsreader (roman and italic) and Inter Tight from `projects/home/font-files/`, all preloaded. They are Google's latin variable files with the weight axis narrowed to what the design uses (Newsreader 250 to 400, Inter Tight 400 to 600; Newsreader's optical-size axis is kept whole) and the glyphs cut to latin text: 89, 97 and 25 KB, against 129, 144 and 44 KB as Google serves them. To rebuild them, with fonttools and brotli installed:

```sh
U="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2010-2027,U+2030-203A,U+2044,U+20AC,U+2122,U+2190-2199,U+2212,U+2713,U+263C"
fonttools varLib.instancer newsreader.woff2 wght=250:400 -o nr.ttf
fonttools varLib.instancer inter-tight.woff2 wght=400:600 -o it.ttf
pyftsubset nr.ttf --unicodes="$U" --layout-features+=tnum,lnum,onum,pnum --flavor=woff2 --output-file=newsreader-var.woff2
```

(the same for the italic and Inter Tight), where the inputs are the `/* latin */` files from `https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..600;1,6..72,200..600&family=Inter+Tight:wght@400..600` fetched with a current browser's user agent.

Yank:

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
| Lighthouse desktop                                                    | 100 / 100 / 100 / 100 |                                                            |
| LCP (Lighthouse's slow-4G estimate)                                   | 0.9 s                 | 2.9 s                                                      |
| CLS                                                                   | 0                     | 0                                                          |
| JavaScript (brotli)                                                   | 119 KB                | 129 KB on a phone; +115 KB Three.js on desktop, after idle |

`/yank` misses the brief's LCP budget of 1.5 s. The real paint happens about 0.15 s after navigation, but Lighthouse's simulation charges LCP for every byte requested before it. With every script and font blocked, it still estimates 1.8 s; the rest is the Next.js and React runtime (about 114 KB of the JavaScript above, shared by every page) and Newsreader for non-Apple browsers.

Interactions on a phone with the CPU slowed four times take at most 80 ms, except the theme switch (105 to 190 ms): it restyles and repaints the whole page.
