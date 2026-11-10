import { yankPath } from "../config";
import uq from "../logos/uq.webp";
import vegassess from "../logos/vegassess.webp";
import { Logo } from "./Logo";

/** Selected work and Education, both as compact one-line rows. */
export function Work() {
  return (
    <>
      <section className="sec minor" id="work" aria-labelledby="work-h">
        <div className="head reveal">
          <h2 id="work-h">
            Selected <i>work</i>
          </h2>
          <span className="small">One for a client, one for me</span>
        </div>
        <ol className="projects">
          <li className="proj reveal">
            <a href={yankPath} data-cursor="View">
              <span className="small">2026</span>
              <span className="pname">
                <svg className="pico" aria-hidden="true">
                  <use href="#i-yank" />
                </svg>
                Yank
              </span>
              <span className="pdesc">
                A keyboard-first clipboard manager for the Mac. Personal project.
              </span>
              <span className="small pstack">Swift · SwiftUI</span>
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
          <li className="proj reveal">
            <a href="https://vegassess.com.au/" data-cursor="View">
              <span className="small">2023</span>
              <span className="pname">
                <Logo className="pico tile" src={vegassess} alt="" />
                VegAssess
              </span>
              <span className="pdesc">
                A tablet app ecologists use to survey flora and fauna in the field. Built at
                DreamWalk.
              </span>
              <span className="small pstack">React Native · Redux</span>
              <span className="arr" aria-hidden="true">
                ↗
              </span>
            </a>
          </li>
        </ol>
      </section>

      <section className="sec minor" id="education" aria-labelledby="edu-h">
        <div className="head reveal">
          <h2 id="edu-h">
            <i>Education</i>
          </h2>
          <span className="small">Brisbane, Queensland</span>
        </div>
        <div className="proj school-row reveal">
          <a href="https://uq.edu.au/" data-cursor="View">
            <span className="small">2021 – 2022</span>
            <span className="pname">
              <Logo className="pico tile" src={uq} alt="" />
              The University of Queensland
            </span>
            <span className="pdesc">Bachelor of Engineering (Honours), Software Engineering</span>
            <span className="small pstack">Compilers, scalable systems, databases</span>
            <span className="arr" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </section>
    </>
  );
}
