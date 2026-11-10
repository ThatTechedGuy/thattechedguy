# thattechedguy.com

The source of [thattechedguy.com](https://thattechedguy.com): one Next.js app for the whole domain, where every page brings its own look and nothing leaks between them.

**Next.js 16** · **React 19** with the React Compiler · **Tailwind CSS 4** · **Bun** · **Playwright** · deployed on **Vercel**

| URL           | What                                                    | Code                                 |
| ------------- | ------------------------------------------------------- | ------------------------------------ |
| `/`           | A one-page personal site in an editorial magazine style | `app/(home)/`, `projects/home/`      |
| `/yank`       | Yank, a free, open-source clipboard manager for Mac     | `app/(yank)/yank/`, `projects/yank/` |
| anything else | A plain 404 that wears no project's look                | `app/global-not-found.tsx`           |

`robots.txt`, `sitemap.xml` and `llms.txt` are generated at the domain root from `site.config.ts`.

## Highlights

- **Fully static.** Every page and image is prerendered at build time, and no page fetches data.
- **Isolated projects.** Each page has its own root layout, so its CSS, fonts and client code never load on another page.
- **Fast.** The home page scores 100 on all four Lighthouse categories on mobile and desktop, with CLS 0 (see [Performance](#performance)).
- **Search-ready.** Canonical URLs, Open Graph images, JSON-LD, a sitemap and `llms.txt`, with preview deployments kept out of search.

## Getting started

Bun is the package manager, script runner and test runner. Nothing needs Node: Next.js, the build, Playwright and Lighthouse all run under Bun.

```sh
bun install
bunx --bun playwright install chromium webkit firefox   # first time only
```

| Command            | Does                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| `bun run dev`      | Turbopack dev server                                                  |
| `bun run build`    | Production build, with every page and image prerendered               |
| `bun run start`    | Serves the build                                                      |
| `bun run check`    | oxfmt, oxlint (type-aware), tsc and the unit tests                    |
| `bun run test:e2e` | Playwright in Chromium, WebKit and Firefox (reuses a server on :3100) |

To run Lighthouse (mobile by default) against a running build:

```sh
CHROME_PATH="$(ls -d ~/Library/Caches/ms-playwright/chromium-*/chrome-mac*/*.app/Contents/MacOS/* | head -1)" \
  bunx --bun lighthouse http://localhost:3100/yank --view
```

> **Firefox on macOS 27:** started from a terminal, Firefox cannot read its own app-data folder and quits with "Could not find profile folder" ([Mozilla bug 2060476](https://bugzilla.mozilla.org/show_bug.cgi?id=2060476)). `playwright.config.ts` points `CFFIXED_USER_HOME` at an empty folder to work around it; remove that once the bug is fixed.

## Project structure

```
app/                 routes only: layouts, pages, metadata files
  (home)/            the home page's root layout (<html>, palette script, metadata) and page
  (yank)/yank/       Yank's root layout and page, its OG image and icons
lib/                 shared and look-free: theme storage, reduced motion, View Transitions, JSON-LD
projects/<name>/     everything one project looks like: tokens, CSS, fonts, components, settings
site.config.ts       the domain, the GitHub link, the projects list, the Search Console token
tests/               unit tests (bun test) and end-to-end tests (Playwright)
```

Shared code in `lib/` may not import a project or a route, and a project may not import another project. oxlint enforces both rules.

Each page remembers its own colours:

- **The home page** shows a random paper on every visit until the visitor picks one, which is saved as `ttg:home:palette`. **Random** in the menu forgets it.
- **Yank** remembers its light/dark theme as `ttg:yank:theme`.

## The pages

### Home (`/`)

The design began as one static `index.html`. It is ported like this:

- **Markup** → Server Components in `projects/home/sections/`.
- **CSS** → `projects/home/styles/home.css`, almost verbatim.
- **Script** → small client islands in `projects/home/islands/`: the rail and its menus, the typed name, the hover cards, the copy button, the footer places and clock, and the cursor.

Two things the script used to measure are now pure CSS, so nothing moves when the page hydrates: the name slot reserves the longer name's width, and the footer nameplate fills its column with container units.

| What                                          | Where                                                                                                                 |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Copy                                          | the section components                                                                                                |
| Palettes, links, email, section list          | `projects/home/config.ts`                                                                                             |
| Title, description, JSON-LD, `llms.txt` facts | `projects/home/seo.ts`                                                                                                |
| Logos (96 px WebP)                            | `projects/home/logos/`                                                                                                |
| Icons above the fold                          | inline in `projects/home/sections/Sprite.tsx`                                                                         |
| Tool, GitHub and LinkedIn icons               | `projects/home/icons.svg`, one cached file, so the page doesn't carry them twice (in the HTML and in React's payload) |

The Brisbane clock in the footer reads the visitor's own clock in the `Australia/Brisbane` time zone, so nothing is fetched.

### Yank (`/yank`)

`projects/yank/config.ts` holds what were runtime tweaks in the prototype:

- the accent colour
- the navigation: `dock`, `tab` (a pull cord) or `menubar`
- the default theme: `auto`, `light` or `dark`
- the effects: `3D` or `patterns`
- the links

The 3D backdrop (Three.js) loads only on desktop-sized screens with a mouse, after the page is idle, and never under reduced motion. Phones never download it.

## Adding a project

Say it is called Lumen and lives at `/lumen`:

1. Make `projects/lumen/` with its stylesheet entry (copy the top of `projects/yank/styles/yank.css`: the Tailwind imports, `@source` lines and its own `@theme`), its fonts and its components.
2. Make `app/(lumen)/lumen/layout.tsx` with its own `<html lang="en">`, the `ThemeScript` from `lib/theme` with a new storage key such as `ttg:lumen:theme`, its stylesheet import and its metadata. Add `page.tsx`, plus `opengraph-image.tsx` and `icon.svg` if it needs them.
3. Add one entry to `projects` in `site.config.ts` (path, name, summary, icon, facts). The sitemap and `llms.txt` pick it up.
4. Put its icon under `public/lumen/`.

Nothing else changes.

## Deploying on Vercel

Vercel detects `bun.lock` and installs and builds with Bun, with no extra settings.

1. Import the repository as a new project (framework: Next.js).
2. In **Settings → Domains**, add `thattechedguy.com` (connected to Production) and `www.thattechedguy.com`.
3. For `www.thattechedguy.com`, choose **Redirect to** `thattechedguy.com` with **308 Permanent Redirect**. At your DNS provider, set the records Vercel shows: an `A` record for the bare domain and a `CNAME` for `www`.
4. After the first production deploy, create a Google Search Console property for `https://thattechedguy.com`, choose the HTML tag method, and paste the token into `googleSiteVerification` in `site.config.ts`.

Only production deployments may be indexed (`VERCEL_ENV === "production"`). Preview deployments serve a `robots.txt` that disallows everything, plus a `noindex` meta tag. In production every crawler is allowed, and the main AI crawlers are named outright.

URLs have no trailing slash: `/yank/` redirects to `/yank`.

## Fonts

### Home

The home page self-hosts Newsreader (roman and italic) and Inter Tight from `projects/home/font-files/`, all preloaded. They are Google's latin variable files, trimmed in two ways:

- the weight axis is narrowed to the weights the design uses (Newsreader 250–400, Inter Tight 400–600), while Newsreader's optical-size axis stays whole;
- the glyphs are cut to latin text.

| Font              | As Google serves it | Trimmed |
| ----------------- | ------------------: | ------: |
| Newsreader        |              129 KB |   89 KB |
| Newsreader Italic |              144 KB |   97 KB |
| Inter Tight       |               44 KB |   25 KB |

<details>
<summary>Rebuilding them</summary>

Fetch the `/* latin */` files from `https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..600;1,6..72,200..600&family=Inter+Tight:wght@400..600` with a current browser's user agent. Then, with fonttools and brotli installed:

```sh
U="U+0020-007E,U+00A0-00FF,U+0131,U+0152-0153,U+02C6,U+02DA,U+02DC,U+2010-2027,U+2030-203A,U+2044,U+20AC,U+2122,U+2190-2199,U+2212,U+2713,U+263C"
fonttools varLib.instancer newsreader.woff2 wght=250:400 -o nr.ttf
fonttools varLib.instancer inter-tight.woff2 wght=400:600 -o it.ttf
pyftsubset nr.ttf --unicodes="$U" --layout-features+=tnum,lnum,onum,pnum --flavor=woff2 --output-file=newsreader-var.woff2
```

Do the same for the italic and for Inter Tight.

</details>

### Yank

Apple devices use their system fonts (SF Pro, New York, SF Mono) and download nothing. Other devices get self-hosted Inter and JetBrains Mono (both through `next/font/google`), and Newsreader.

Newsreader comes from static files in `projects/yank/font-files/`: Google's latin 400, 400 italic and 600 cuts, 70 KB together. `next/font/google`'s variable files weigh 121 KB for the same text.

<details>
<summary>Refreshing them</summary>

Ask Google Fonts for static cuts with a browser that predates variable fonts, then download the `/* latin */` URLs:

```sh
curl -s -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36" \
  "https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,600;1,400"
```

</details>

### Share images

The share images (`opengraph-image.tsx`) use tiny font subsets in `projects/*/og/` that hold only the glyphs of their text.

> [!IMPORTANT]
> If you change the text on a share image, download its subsets again, passing the new text, then save the `src` URL it returns into the matching `.ttf`:
>
> ```sh
> curl -s -A "Mozilla/4.0" "https://fonts.googleapis.com/css2?family=Inter:wght@700&text=Your%20clipboard%2C"
> ```

## Performance

Measured on a local production build:

| Check                                                         | `/`                   | `/yank`                                                    |
| ------------------------------------------------------------- | --------------------- | ---------------------------------------------------------- |
| Lighthouse mobile (Performance / A11y / Best Practices / SEO) | 100 / 100 / 100 / 100 | 95 / 100 / 100 / 100                                       |
| Lighthouse desktop                                            | 100 / 100 / 100 / 100 |                                                            |
| LCP (Lighthouse's slow-4G estimate)                           | 0.9 s                 | 2.9 s                                                      |
| CLS                                                           | 0                     | 0                                                          |
| JavaScript (brotli)                                           | 119 KB                | 129 KB on a phone; +115 KB Three.js on desktop, after idle |

**Why `/yank`'s LCP is 2.9 s.** The real first paint happens about 0.15 s after navigation, but Lighthouse's simulation charges LCP for every byte requested before it. Even with every script and font blocked, it estimates 1.8 s. The rest comes from the Next.js and React runtime (about 114 KB of the JavaScript above, shared by every page) and from Newsreader on non-Apple browsers.

On a phone with the CPU slowed four times, every interaction takes at most 80 ms, except Yank's theme switch (105–190 ms), which restyles and repaints the whole page.

## Before launch

- [ ] Paste the Search Console token into `site.config.ts` after the first production deploy.
