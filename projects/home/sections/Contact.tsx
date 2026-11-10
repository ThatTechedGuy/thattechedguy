import { site } from "@/site.config";

import { email, linkedinUrl } from "../config";
import icons from "../icons.svg";
import { CopyEmail } from "../islands/CopyEmail";

export function Contact() {
  return (
    <section className="sec" id="contact" aria-labelledby="contact-h">
      <div className="head reveal">
        <h2 id="contact-h">
          Say <i>hello</i>
        </h2>
        <span className="small">
          Work, collaborations, a good engineering problem, or just coffee
        </span>
      </div>
      <div className="letters">
        <div className="reveal">
          <CopyEmail email={email} />
        </div>
        <ul className="links reveal">
          <li>
            <a href={linkedinUrl} data-cursor="Open">
              <span className="nm">
                <svg className="ic" aria-hidden="true">
                  <use href={`${icons.src}#i-linkedin`} />
                </svg>
                LinkedIn
              </span>
              <span className="h">
                vishg05 <span className="arr">↗</span>
              </span>
            </a>
          </li>
          <li>
            <a href={site.githubUrl} data-cursor="Open">
              <span className="nm">
                <svg className="ic" aria-hidden="true">
                  <use href={`${icons.src}#i-github`} />
                </svg>
                GitHub
              </span>
              <span className="h">
                ThatTechedGuy <span className="arr">↗</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
