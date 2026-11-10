import { yank } from "../config";

/** Carries the download section's colours, so the page colour does not change under it. */
export function Footer() {
  return (
    <footer
      data-bg="#F5F5F7"
      data-bg-dark="#07070B"
      data-fg="#1D1D1F"
      data-fg-dark="#F5F5F7"
      className="mx-auto flex max-w-1320 flex-wrap justify-between gap-16 px-32 pt-48 pb-130 text-[14px] text-muted"
    >
      <span>
        Yank · Free and open source · macOS 26.4 or later ·{" "}
        <a href={yank.downloadUrl} className="text-muted">
          Download Yank
        </a>
      </span>
      <span className="flex flex-wrap gap-20">
        <a href={yank.repoUrl} className="text-lead">
          Source code
        </a>
        <a href="#privacy" className="text-lead">
          Privacy
        </a>
        <a href="#top" className="text-lead">
          Back to top
        </a>
      </span>
    </footer>
  );
}
