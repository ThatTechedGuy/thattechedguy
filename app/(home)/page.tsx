import { ThemeSwitch } from "@/projects/home/ThemeSwitch";
import { projects, site } from "@/site.config";

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col px-6 py-16 font-sans sm:py-24">
      <header className="flex justify-end">
        <ThemeSwitch />
      </header>
      <main className="mt-10 flex-1">
        <h1 className="font-serif text-[40px] leading-[1.1] font-semibold tracking-[-0.01em]">
          {site.name}
        </h1>
        <p className="mt-3 text-[17px] opacity-65">
          New things are on the way. For now, here’s what I’ve made.
        </p>
        <section aria-labelledby="projects" className="mt-12">
          <h2 id="projects" className="text-[12px] tracking-[0.08em] uppercase opacity-60">
            Projects
          </h2>
          <ul className="mt-3 flex flex-col gap-3">
            {projects.map((project) => (
              <li key={project.path}>
                {/* A plain link: each project has its own root layout, so this is a full page load anyway. */}
                <a
                  href={project.path}
                  className="border-rule grid grid-cols-[44px_1fr] items-center gap-x-4 rounded-[12px] border p-4 text-ink no-underline transition-colors hover:bg-[rgba(128,128,128,0.08)]"
                >
                  {/* A static SVG: next/image cannot optimise it and would add client JS to a page meant to have almost none. */}
                  {/* oxlint-disable-next-line nextjs/no-img-element */}
                  <img
                    src={project.iconPath}
                    alt=""
                    width={44}
                    height={44}
                    className="row-span-2"
                  />
                  <span className="self-end text-[17px] font-semibold">{project.name}</span>
                  <span className="self-start text-[15px] opacity-65">{project.summary}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer className="mt-16 text-[13px] opacity-60">
        <a href={site.githubUrl} className="text-ink underline-offset-4 hover:underline">
          GitHub ↗
        </a>
      </footer>
    </div>
  );
}
