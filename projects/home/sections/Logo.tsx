import type { StaticImageData } from "next/image";

/**
 * A logo from logos/ (96 px WebP, hashed and cached for good by the build). A plain <img>, measured
 * against next/image on a 3x phone: the same 7.7 KB of images, but next/image added 5 KB of client JS
 * and sent each file through the image optimizer instead of serving it as a static asset.
 */
export function Logo({
  src,
  alt,
  className,
  eager = false,
}: {
  src: StaticImageData;
  alt: string;
  className?: string;
  /** Above the fold; everything else loads as it nears the viewport. */
  eager?: boolean;
}) {
  return (
    // oxlint-disable-next-line nextjs/no-img-element
    <img
      src={src.src}
      alt={alt}
      className={className}
      width={64}
      height={64}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
