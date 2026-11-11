import { Draft, Gap } from "./Draft";
import { chess, interests, tennis, type Feature } from "./hobbies";

function FeatureCard({ id, name, lede, specs }: Feature) {
  return (
    <article className="feature reveal" aria-labelledby={`${id}-h`}>
      <h3 id={`${id}-h`}>{name}</h3>
      <p className="feature-lede">{lede}</p>
      <dl>
        {specs.map(({ label, value, detail }) => (
          <div key={value}>
            <dt className="small">{label}</dt>
            <dd>
              {value}
              {detail ? <span className="small spec-detail">{detail}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

/** Tennis and chess as features, then everything else as compact rows. */
export function Hobbies() {
  return (
    <section className="sec" id="clock" aria-labelledby="clock-h">
      <div className="head reveal">
        <h2 id="clock-h">
          Off the <i>clock</i>
        </h2>
        <span className="small">Courts, boards, and stories I keep going back to</span>
      </div>
      <div className="features">
        <FeatureCard {...tennis} />
        <FeatureCard {...chess} />
      </div>
      <h3 className="label interests-h">Also, in no particular order</h3>
      <ul className="interests">
        {interests.map(({ name, kind, note, draft }) => (
          <li className="interest reveal" key={name}>
            <span className="small">{kind}</span>
            <span className="interest-name">{name}</span>
            <p>
              {note ?? <Gap />}
              {draft ? <Draft /> : null}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
