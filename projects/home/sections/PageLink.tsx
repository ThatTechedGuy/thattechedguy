import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

interface PageLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
  /** The custom cursor's label. */
  "data-cursor"?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * A link to a page goes through next/link as a page transition (lib/motion/page-transition.css). An in-page #jump
 * stays a plain <a>, so the rail's jumpTo animates it: next/link would take the click first.
 */
export function PageLink({ href, children, ...rest }: PageLinkProps) {
  return href.startsWith("#") ? (
    <a href={href} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={href} transitionTypes={["page"]} {...rest}>
      {children}
    </Link>
  );
}
