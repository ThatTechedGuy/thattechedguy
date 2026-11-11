import type { CSSProperties } from "react";

import { HoverCard } from "../islands/HoverCard";
import { NameSwap } from "../islands/NameSwap";
import eightSeats from "../logos/8seats.webp";
import dreamwalk from "../logos/dreamwalk.webp";
import smallcase from "../logos/smallcase.webp";
import { Logo } from "./Logo";

/** --i staggers the words' rise: word i starts 40 ms after word i - 1. */
const word = (i: number): CSSProperties & Record<"--i", number> => ({ "--i": i });

/** Splits text into words that rise in one after another, numbered from `from`, keeping the spaces. */
function Words({ from, text }: { from: number; text: string }) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .map((part, k) => ({ part, n: from + k }))
    .flatMap(({ part, n }, k, all) => [
      <span key={n} className="w" style={word(n)}>
        {part}
      </span>,
      // Spaces between words, and around them where the text has them.
      k < all.length - 1 || /\s$/.test(text) ? " " : "",
    ]);
}

const chessWord = word(29);

const westpacCard = (
  <>
    <svg className="card-mark" aria-hidden="true">
      <use href="#i-westpac" />
    </svg>
    <span className="card-h">Westpac Group</span>
    <span className="card-p">
      Founded in 1817 as the Bank of New South Wales, it was Australia’s first bank and is still its
      oldest company.
    </span>
  </>
);

const tennisCard = (
  <>
    <span className="card-h">On court</span>
    <span className="card-r">
      <b>Style</b>Baseliner
    </span>
    <span className="card-r">
      <b>Backhand</b>Two-handed
    </span>
    <span className="card-r">
      <b>Game</b>Hits hard, and would rather out-rally you than volley
    </span>
  </>
);

const chessCard = (
  <>
    <span className="card-h">My repertoire</span>
    <span className="card-r">
      <b>As White</b>Ruy Lopez, Queen’s Gambit
    </span>
    <span className="card-r">
      <b>Against 1.d4</b>Nimzo-Indian
    </span>
    <span className="card-r">
      <b>Against 1.e4</b>Sicilian: the Najdorf or the Dragon
    </span>
  </>
);

export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <h1 id="hero">
        <span className="w" style={word(0)}>
          I’m
        </span>{" "}
        <NameSwap />
        <span className="sr-only">Vishal Gupta, also known as ThatTechedGuy,</span>
        <br />
        <Words
          from={1}
          text="an AI engineer in Brisbane building cloud and agentic products for one of "
        />
        <HoverCard label="Westpac" cardClassName="card card-wbc" card={westpacCard}>
          <Words from={14} text="Australia’s oldest banks" />
        </HoverCard>
        <Words from={17} text=". Off the clock I’m on a " />
        <HoverCard label="Tennis" card={tennisCard}>
          <Words from={24} text="tennis court" />
        </HoverCard>
        <Words from={26} text=", over a " />
        <HoverCard label="Openings" className="w hov" style={chessWord} card={chessCard}>
          chessboard
        </HoverCard>
        <Words from={30} text=", or making things about code and games." />
      </h1>
      <dl className="facts">
        <div>
          <dt className="label">Currently</dt>
          <dd className="with-mark">
            <svg className="mark" aria-hidden="true">
              <use href="#i-westpac" />
            </svg>
            <span>Software Engineer, Westpac Group, Gold Coast Engineering Hub</span>
          </dd>
        </div>
        <div>
          <dt className="label">Previously</dt>
          <dd className="chips">
            <span className="chip">
              <Logo src={eightSeats} alt="" eager />
              8seats
            </span>{" "}
            <span className="chip">
              <Logo src={dreamwalk} alt="" eager />
              DreamWalk
            </span>{" "}
            <span className="chip">
              <Logo src={smallcase} alt="" eager />
              smallcase
            </span>
          </dd>
        </div>
        <div>
          <dt className="label">Works in</dt>
          <dd className="poly">
            <del>
              Elixir, TypeScript, React Native, Next.js, NestJS, Bun, Swift, Java, Rust, AWS, Azure
            </del>{" "}
            <span className="poly-say">Whatever the problem needs. I pick up tools as I go.</span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
