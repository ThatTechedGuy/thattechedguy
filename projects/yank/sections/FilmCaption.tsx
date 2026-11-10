/** The player bar under the film: title, a progress bar on the film's 12-second clock, and its length. */
export function FilmCaption() {
  return (
    <figcaption className="flex items-center gap-16 px-22 py-16 text-[14px] text-lead">
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="#1D1D1F">
        <path d="M7 4l13 8-13 8z" />
      </svg>
      <span className="font-semibold whitespace-nowrap text-ink">Yank in 12 seconds</span>
      <span className="h-4 flex-1 overflow-hidden rounded-[2px] bg-hair2">
        <span className="film-progress block h-full bg-accent" />
      </span>
      <span className="whitespace-nowrap">0:12</span>
    </figcaption>
  );
}
