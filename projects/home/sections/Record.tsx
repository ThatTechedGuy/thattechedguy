import eightSeats from "../logos/8seats.webp";
import dreamwalk from "../logos/dreamwalk.webp";
import smallcase from "../logos/smallcase.webp";
import { Logo } from "./Logo";

/** The one figure, then the work history. Each job is a native <details>, so it opens without JavaScript. */
export function Record() {
  return (
    <>
      <section className="sec shipped" aria-label="Products shipped">
        <div className="stat reveal">
          <span className="fig">20+</span>
          <p>
            products shipped since 2020, across fintech, SaaS, agriculture, retail and telecoms. For
            banks, startups and the occasional ecologist.
          </p>
        </div>
      </section>

      <section className="sec" id="record" aria-labelledby="record-h">
        <div className="head reveal">
          <h2 id="record-h">
            The <i>record</i>
          </h2>
        </div>
        <ol className="jobs">
          <li>
            <details className="job reveal">
              <summary data-cursor="Open">
                <span className="small yrs">2025 – now</span>
                <span className="co">
                  <span className="logo wbc">
                    <svg>
                      <title>Westpac logo</title>
                      <use href="#i-westpac" />
                    </svg>
                  </span>
                  Westpac Group
                </span>
                <span className="role">
                  AI Engineer<span>Gold Coast, Queensland</span>
                </span>
                <span className="plus" aria-hidden="true" />
              </summary>
              <div className="more">
                <span className="spacer" />
                <div>
                  <p className="lede">
                    Consumer retail banking on Westpac UNITE, the bank’s multi-billion-dollar
                    technology programme, working on cloud and AI problems from the Gold Coast
                    Engineering Hub.
                  </p>
                </div>
              </div>
            </details>
          </li>
          <li>
            <details className="job reveal">
              <summary data-cursor="Open">
                <span className="small yrs">2023 – 2025</span>
                <span className="co">
                  <Logo className="logo" src={eightSeats} alt="8seats logo" />
                  8seats
                </span>
                <span className="role">
                  Software Engineer<span>Sydney, New South Wales</span>
                </span>
                <span className="plus" aria-hidden="true" />
              </summary>
              <div className="more">
                <span className="spacer" />
                <div>
                  <p className="lede">
                    A Sydney startup taking on WhatsApp and Slack with a real-time messaging
                    platform.
                  </p>
                  <ul>
                    <li>
                      Led a squad of six moving the legacy chat app to an Expo managed workflow,
                      removing more than 300,000 lines of code.
                    </li>
                    <li>
                      Led the move from a serverless Amplify DataStore and Node backend to a
                      distributed, test-driven Elixir and Phoenix backend.
                    </li>
                    <li>
                      Designed and built payments and subscriptions on Stripe, single-handed, in
                      Elixir and Phoenix.
                    </li>
                    <li>
                      Built an in-app blog for web and mobile on Contentful and Apollo GraphQL.
                    </li>
                    <li>
                      Migrated 800,000+ production DynamoDB records off row-level encryption, which
                      sped up reads and writes and unblocked AI summaries and search.
                    </li>
                    <li>
                      Set up GraphQL code generation, replacing more than 10,000 hand-written lines.
                    </li>
                    <li>Mentored juniors and onboarded new engineers.</li>
                  </ul>
                  <p className="small stack">
                    Elixir · Phoenix · Absinthe · Ecto · TypeScript · React Native · AWS · Apollo
                    GraphQL · Go · Pulumi · Stripe
                  </p>
                </div>
              </div>
            </details>
          </li>
          <li>
            <details className="job reveal">
              <summary data-cursor="Open">
                <span className="small yrs">2022 – 2023</span>
                <span className="co">
                  <Logo className="logo" src={dreamwalk} alt="DreamWalk logo" />
                  DreamWalk
                </span>
                <span className="role">
                  Software Engineer<span>Brisbane, Queensland</span>
                </span>
                <span className="plus" aria-hidden="true" />
              </summary>
              <div className="more">
                <span className="spacer" />
                <div>
                  <p className="lede">
                    End-to-end product work at an award-winning app consultancy, for enterprises and
                    startups in law, transport, e-commerce and agriculture.
                  </p>
                  <ul>
                    <li>
                      Built VegAssess, a React Native tablet app that lets ecologists file flora and
                      fauna assessments for large plots in Victoria and New South Wales, with nested
                      auto-saving forms and fuzzy search over millions of species records.
                    </li>
                    <li>
                      Wrote native Android and iOS modules for large content uploads on Native
                      Creators, before the Expo SDK offered it.
                    </li>
                    <li>Shipped onboarding with SMS phone verification on Twilio.</li>
                    <li>
                      Built a business and consumer marketplace in Python, Django and Stripe with a
                      React Native front end.
                    </li>
                    <li>
                      Led two high-profile projects to contract extensions and looked after seven of
                      the company’s largest client projects.
                    </li>
                  </ul>
                  <p className="small stack">
                    React Native · Next.js · Python · Django · GraphQL · Redux · RxJS · PostgreSQL ·
                    Stripe
                  </p>
                </div>
              </div>
            </details>
          </li>
          <li>
            <details className="job reveal">
              <summary data-cursor="Open">
                <span className="small yrs">2020 – 2021</span>
                <span className="co">
                  <Logo className="logo" src={smallcase} alt="smallcase logo" />
                  smallcase
                </span>
                <span className="role">
                  Software Engineer<span>Bengaluru, India</span>
                </span>
                <span className="plus" aria-hidden="true" />
              </summary>
              <div className="more">
                <span className="spacer" />
                <div>
                  <p className="lede">
                    A fintech unicorn making stock market investing simpler for beginners.
                  </p>
                  <ul>
                    <li>
                      Improved the React Native app’s performance through major upgrades,
                      memoisation and leaner state management.
                    </li>
                    <li>Introduced RxJS streams for app-wide pop-ups and bottom sheets.</li>
                    <li>
                      Integrated Firebase, Branch and CleverTap analytics for the product team.
                    </li>
                    <li>
                      Worked from customer interviews as the app grew from 100,000 to more than 2
                      million users.
                    </li>
                  </ul>
                  <p className="small stack">
                    React · React Native · Redux · RxJS · Strapi · Java · Android
                  </p>
                </div>
              </div>
            </details>
          </li>
        </ol>
      </section>
    </>
  );
}
