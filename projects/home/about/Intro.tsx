import { aboutNav } from "../config";

/** The page's opening statement, and what's on it. */
export function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-h">
      <p className="label">Off the record</p>
      <h1 id="intro-h">
        Strong opinions about my tools, <i>loosely held.</i> And what I do once the laptop shuts.
      </h1>
      <dl className="facts">
        <div>
          <dt className="label">On this page</dt>
          <dd className="intro-toc">
            {aboutNav.sections.map(({ id, name }) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
          </dd>
        </div>
        <div>
          <dt className="label">The small print</dt>
          <dd>These opinions are mine, not my employer’s.</dd>
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
