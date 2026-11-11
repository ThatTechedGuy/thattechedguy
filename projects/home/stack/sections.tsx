import icons from "../icons.svg";
import { hobbies, layers, takes, takesDraft, verdictNames } from "./data";
import { Draft } from "./Draft";
import { Frieze, Motif } from "./Madhubani";

/** The opening statement, and what's on the page. */
export function Intro() {
  return (
    <section className="sp-intro" aria-labelledby="sp-h">
      <p className="label">Stack and play</p>
      <h1 id="sp-h">
        The tools I reach for, the ones I’d <i>rather not,</i> and what I do once the laptop shuts.
      </h1>
      <dl className="facts">
        <div>
          <dt className="label">On this page</dt>
          <dd className="sp-toc">
            <a href="#stack">Stack</a>
            <a href="#takes">Takes</a>
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
      <Frieze />
    </section>
  );
}

/** Every tool, grouped by layer, with a verdict and a one-line take. */
export function Stack() {
  return (
    <section className="sec" id="stack" aria-labelledby="stack-h">
      <div className="head reveal">
        <h2 id="stack-h">
          The <i>stack</i>
        </h2>
        <span className="small legend">
          <span className="verdict love">{verdictNames.love}</span>
          <span className="verdict like">{verdictNames.like}</span>
          <span className="verdict complicated">{verdictNames.complicated}</span>
        </span>
      </div>
      {layers.map((layer) => (
        <div key={layer.name} className="layer reveal">
          <span className="label">{layer.name}</span>
          <ol className="tools">
            {layer.tools.map((tool) => (
              <li key={tool.name}>
                <span className="tname">
                  <svg className="ic" aria-hidden="true">
                    <use href={`${icons.src}#i-${tool.icon}`} />
                  </svg>
                  {tool.name}
                </span>
                <span className={`verdict ${tool.verdict}`}>{verdictNames[tool.verdict]}</span>
                <p className="ttake">
                  {tool.take}
                  <Draft when={tool.draft} />
                </p>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}

/** A two-column ledger. islands/Drift.tsx strikes the right-hand column once it scrolls into view. */
export function Takes() {
  return (
    <section className="sec" id="takes" aria-labelledby="takes-h">
      <div className="head reveal">
        <h2 id="takes-h">
          Strong opinions, <i>loosely held</i>
        </h2>
        <span className="small">
          Hover a struck line to give it a second chance
          <Draft when={takesDraft} />
        </span>
      </div>
      <div className="ledger reveal">
        <span className="label">Yes, please</span>
        <span className="label">Rather not</span>
        {takes.map(([yes, no]) => [
          <p key={`y-${yes}`} className="yes">
            {yes}
          </p>,
          <p key={`n-${no}`} className="no">
            <s>{no}</s>
          </p>,
        ])}
      </div>
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
              {hobby.specs ? (
                <dl>
                  {hobby.specs.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p>
                  {hobby.note ?? <span className="gap">A line about this goes here.</span>}
                  <Draft when={hobby.draft} />
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
