import icons from "../icons.svg";
import { HoverCard } from "../islands/HoverCard";
import {
  cloud,
  frameworks,
  gear,
  hobbies,
  languages,
  tiers,
  verdictNames,
  type Ranked,
} from "./data";
import { Motif } from "./Madhubani";

/** The opening statement, and what's on the page. */
export function Intro() {
  return (
    <section className="sp-intro" aria-labelledby="sp-h">
      <p className="label">Opinions</p>
      <h1 id="sp-h">
        The tools I reach for, the ones I’d <i>rather not,</i> and what I do once the laptop shuts.
      </h1>
      <dl className="facts">
        <div>
          <dt className="label">On this page</dt>
          <dd className="sp-toc">
            <a href="#stack">Stack</a>
            <a href="#gear">Gear</a>
            <a href="#play">Play</a>
          </dd>
        </div>
        <div>
          <dt className="label">The small print</dt>
          <dd>Opinions are mine, not my employer’s, and change when I learn something.</dd>
        </div>
        <div>
          <dt className="label">Last updated</dt>
          <dd>
            <time dateTime="2026-11">November 2026</time>
          </dd>
        </div>
      </dl>
    </section>
  );
}

/** One S to D tier list: a row per tier, each item a logo cell whose name and take open in a hover card. */
function TierList({ label, items }: { label: string; items: readonly Ranked[] }) {
  return (
    <div className="layer tierlist reveal">
      <span className="label">{label}</span>
      <ol className="tiers">
        {tiers.map(([tier, meaning]) => (
          <li key={tier} className={`tier t-${tier}`}>
            <span className="tletter">
              {tier}
              <span className="label">{meaning}</span>
            </span>
            <span className="tchips">
              {items
                .filter((item) => item.tier === tier)
                .map((item) => (
                  <HoverCard
                    key={item.name}
                    label={`${tier} tier`}
                    className="hov tchip"
                    card={
                      <>
                        <span className="card-h">{tier} tier</span>
                        <span className="card-t">{item.name}</span>
                        <span className="card-p">{item.take}</span>
                      </>
                    }
                  >
                    {item.icon ? (
                      <>
                        <svg className="ic" aria-hidden="true">
                          <use href={`${icons.src}#i-${item.icon}`} />
                        </svg>
                        <span className="sr-only">{item.name}</span>
                      </>
                    ) : (
                      item.name
                    )}
                  </HoverCard>
                ))}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The stack as three tier lists: languages, frameworks, and cloud and data. */
export function Stack() {
  return (
    <section className="sec" id="stack" aria-labelledby="stack-h">
      <div className="head reveal">
        <h2 id="stack-h">
          The <i>stack</i>
        </h2>
        <span className="small">Hover or tap one for the why</span>
      </div>
      <TierList label="Languages" items={languages} />
      <TierList label="Frameworks and runtimes" items={frameworks} />
      <TierList label="Cloud and data" items={cloud} />
    </section>
  );
}

/** The hardware and everyday software, in the stack's ruled rows; the operating systems get verdicts. */
export function Gear() {
  return (
    <section className="sec" id="gear" aria-labelledby="gear-h">
      <div className="head reveal">
        <h2 id="gear-h">
          The <i>gear</i>
        </h2>
      </div>
      {gear.map((group) => (
        <div key={group.name} className="layer reveal">
          <span className="label">{group.name}</span>
          <ul className="tools">
            {group.items.map(([name, detail, verdict]) => (
              <li key={name}>
                <span className="tname">{name}</span>
                {verdict && <span className={`verdict ${verdict}`}>{verdictNames[verdict]}</span>}
                <p className="ttake">{detail}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

/** Hobbies as tiles, each with its motif. */
export function Play() {
  return (
    <section className="sec" id="play" aria-labelledby="play-h">
      <div className="head reveal">
        <h2 id="play-h">
          Off the <i>clock</i>
        </h2>
        <span className="small">Courts, boards, and stories I keep going back to</span>
      </div>
      <ul className="play">
        {hobbies.map((hobby) => (
          <li key={hobby.name} className={hobby.size ? `${hobby.size} reveal` : "reveal"}>
            <Motif id={hobby.motif} />
            <h3>
              <span className="label">{hobby.kind}</span>
              {hobby.name}
            </h3>
            <div>
              {hobby.specs && (
                <dl>
                  {hobby.specs.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {hobby.list && (
                <ul className="games">
                  {hobby.list.map(([name, aside]) => (
                    <li key={name}>
                      {name}
                      {aside && <span className="aside"> ({aside})</span>}
                    </li>
                  ))}
                </ul>
              )}
              {hobby.footnote && <p className="small fine">{hobby.footnote}</p>}
              {hobby.note && <p>{hobby.note}</p>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
