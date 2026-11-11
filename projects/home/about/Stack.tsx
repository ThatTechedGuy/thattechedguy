import icons from "../icons.svg";
import { Draft, Gap } from "./Draft";
import { dailyDrivers, verdicts, type Take } from "./stack";

function TakeRow({ name, icon, take, draft }: Take) {
  return (
    <li className="take reveal">
      <span className="take-name">
        {icon ? (
          <svg className="take-icon" aria-hidden="true">
            <use href={`${icons.src}#i-${icon}`} />
          </svg>
        ) : null}
        {name}
      </span>
      <p className="take-text">
        {take ?? <Gap />}
        {draft ? <Draft /> : null}
      </p>
    </li>
  );
}

/** The tools, sorted into three verdicts, then the daily drivers. */
export function Stack() {
  return (
    <section className="sec" id="stack" aria-labelledby="stack-h">
      <div className="head reveal">
        <h2 id="stack-h">
          The <i>stack</i>
        </h2>
        <span className="small">What I reach for, and what I’d rather not</span>
      </div>
      {verdicts.map(({ id, title: [plain, italic], blurb, takes }) => (
        <section className="verdict" key={id} aria-labelledby={`${id}-h`}>
          <div className="verdict-head reveal">
            <h3 id={`${id}-h`}>
              {plain} <i>{italic}</i>
            </h3>
            <span className="small">{blurb}</span>
          </div>
          <ul className="takes">
            {takes.map((take) => (
              <TakeRow key={take.name} {...take} />
            ))}
          </ul>
        </section>
      ))}
      <div className="drivers reveal">
        <h3 className="label">Daily drivers</h3>
        <dl>
          {dailyDrivers.map(({ label, value, draft }) => (
            <div key={label}>
              <dt className="small">{label}</dt>
              <dd>
                {value ?? <Gap />}
                {draft ? <Draft /> : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
