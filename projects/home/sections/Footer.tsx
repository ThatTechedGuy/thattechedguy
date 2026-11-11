import { site } from "@/site.config";

import { linkedinUrl, yankPath, type PageNav } from "../config";
import { BrisbaneTime, GoldCoastSky, Places } from "../islands/Places";

const brisbane = (
  <>
    <svg className="city" viewBox="0 0 400 150">
      <title>Line drawing of the Story Bridge over the Brisbane River</title>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path
          d="M46 92V40h18v52M70 92V22h22v70M98 92V50h14v42M300 92V30h20v62M326 92V46h16v46M348 92V58h14v34"
          opacity=".45"
        />
        <path d="M0 108h400" />
        <path d="M20 92h360" />
        <path d="M128 92V44M272 92V44" />
        <path d="M60 92Q128 30 200 74Q272 30 340 92" />
        <path d="M104 92L128 44L152 92M248 92L272 44L296 92" />
        <path d="M128 44L176 92M128 44L80 92M272 44L224 92M272 44L320 92" opacity=".7" />
        <path d="M128 108V92M272 108V92" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".5">
        <path d="M10 122q10-4 20 0t20 0M90 128q10-4 20 0t20 0M190 120q10-4 20 0t20 0M290 130q10-4 20 0t20 0M350 118q10-4 20 0t20 0" />
      </g>
      <circle cx="352" cy="26" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
    <p className="label">Home base</p>
    <h3>Brisbane, Queensland</h3>
    <p>
      A subtropical river city where winter is mostly a rumour, flying foxes cross the sky at dusk
      and the CityCats are the nicest commute in the country. Hot, humid, and the best place I know
      to lose a set of tennis.
    </p>
    <p className="coords small">
      27.47° S, 153.03° E · <BrisbaneTime />
    </p>
  </>
);

const goldCoast = (
  <>
    <svg className="city" viewBox="0 0 400 150">
      <title>Line drawing of the Surfers Paradise skyline above the beach</title>
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M150 96V28l8-6 8 6v68M158 22V4" />
        <path d="M60 96V58h16v38M82 96V44h18v52M106 96V64h14v32M176 96V40h20v56M202 96V52h16v44M224 96V34h18v62M248 96V60h14v36M268 96V48h16v48M290 96V70h14v26M310 96V56h18v40M334 96V66h14v30" />
        <path d="M0 96h400" />
        <path d="M0 112q50-8 100 0t100 0 100 0 100 0" opacity=".8" />
      </g>
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity=".5">
        <path d="M0 126q20-6 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0M0 138q20-6 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0 40 0" />
      </g>
      <circle cx="44" cy="30" r="11" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M44 12v-6M44 54v-6M26 30h-6M68 30h-6M31 17l-4-4M61 47l-4-4M31 43l-4 4M61 13l-4 4"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
    <p className="label">Day job</p>
    <h3>Gold Coast</h3>
    <p>
      An hour down the M1, where I work out of Westpac’s engineering hub. Fifty-odd kilometres of
      beach with a skyline parked on top of it, and theme parks just behind. It’s hard to be grumpy
      about a stand-up there.
    </p>
    <p className="coords small">
      28.02° S, 153.40° E · <GoldCoastSky />
    </p>
  </>
);

const places = [
  { id: "brisbane", content: brisbane },
  { id: "gold-coast", content: goldCoast },
];

/** The footer: the two places, a sitemap for the page it sits on, and the nameplate. */
export function Footer({ nav }: { nav: PageNav }) {
  return (
    <footer>
      <div className="foot-grid">
        <Places places={places} />
        <nav className="sitemap reveal" aria-label="Sitemap">
          <p className="label">Sitemap</p>
          <ul>
            <li>
              <a href={nav.mark.href === "#top" ? "#top" : "/"}>Home</a>
            </li>
            {nav.sections.map(({ id, name }) => (
              <li key={id}>
                <a href={`#${id}`}>{name}</a>
              </li>
            ))}
            {nav.page.href === "/" ? null : (
              <li>
                <a href={nav.page.href}>{nav.page.name}</a>
              </li>
            )}
          </ul>
          <ul>
            <li>
              <a href={yankPath}>
                Yank <span className="arr">↗</span>
              </a>
            </li>
            <li>
              <a href={site.githubUrl}>
                GitHub <span className="arr">↗</span>
              </a>
            </li>
            <li>
              <a href={linkedinUrl}>
                LinkedIn <span className="arr">↗</span>
              </a>
            </li>
          </ul>
          <a className="totop" href="#top" data-cursor="Up">
            Back to top ↑
          </a>
        </nav>
      </div>
      <div className="nameplate">
        That<i>Teched</i>Guy
      </div>
      <div className="colophon">
        <span className="small">© 2026 Vishal Gupta · Brisbane, Australia</span>
      </div>
    </footer>
  );
}
