import type { StaticImageData } from "next/image";

/**
 * A logo from logos/ (96 px WebP, hashed and cached for good by the build), drawn as a CSS background. Every logo
 * sits next to its company's name, so it is decorative. next/image would add 5 KB of client JS for the same pixels.
 */
export function Logo({ src, className }: { src: StaticImageData; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className ? `logo-pic ${className}` : "logo-pic"}
      style={{ backgroundImage: `url(${src.src})` }}
    />
  );
}
