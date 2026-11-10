import type { Theme } from "@/lib/theme/theme";

/** Sparks that burst from the switch: stars when going dark, sun rays when going light. */

const PHONE_MAX_WIDTH = 761;
const NIGHT_COLOURS = ["#FFFFFF", "#FFD60A", "#C9B6FF", "#7FD1FF", "#FFFFFF"] as const;
const DAY_COLOURS = ["#FFD60A", "#FF9F0A", "#FF375F", "#FFE066", "#FF6F3C"] as const;

type SparkKind = "flip-spark-dot" | "flip-spark-star" | "flip-spark-ray";

/** The fixed layer the sparks live in. It sits above the View Transition (theme-flip.css). */
export function createSparkLayer(): HTMLDivElement {
  const layer = document.createElement("div");
  layer.className = "flip-fx";
  layer.setAttribute("aria-hidden", "true");
  document.body.append(layer);
  return layer;
}

function sparkKind(next: Theme, index: number): SparkKind {
  if (next === "dark") return index % 3 === 0 ? "flip-spark-dot" : "flip-spark-star";
  return index % 2 === 0 ? "flip-spark-ray" : "flip-spark-dot";
}

function sparkSize(kind: SparkKind): number {
  if (kind === "flip-spark-ray") return 22 + Math.random() * 18;
  return kind === "flip-spark-dot" ? 6 + Math.random() * 7 : 12 + Math.random() * 14;
}

/** One expanding ring plus a burst of sparks from (x, y). */
export function fireSparks(layer: HTMLElement, next: Theme, x: number, y: number): void {
  const dark = next === "dark";
  const phone = window.innerWidth < PHONE_MAX_WIDTH;
  const colours = dark ? NIGHT_COLOURS : DAY_COLOURS;

  const ring = document.createElement("span");
  ring.className = "flip-ring";
  ring.style.setProperty("--c", dark ? "#C9B6FF" : "#FF9F0A");
  ring.style.left = `${x}px`;
  ring.style.top = `${y}px`;
  layer.append(ring);
  ring.animate(
    [
      { transform: "scale(.2)", opacity: 1 },
      { transform: "scale(14)", opacity: 0 },
    ],
    { duration: 900, easing: "cubic-bezier(.15,.8,.3,1)", fill: "forwards" },
  );

  const count = phone ? 16 : 26;
  for (let k = 0; k < count; k++) {
    const kind = sparkKind(next, k);
    const spark = document.createElement("span");
    spark.className = `flip-spark ${kind}`;
    spark.style.setProperty("--z", `${sparkSize(kind).toFixed(1)}px`);
    spark.style.setProperty("--c", colours[k % colours.length] ?? "#FFFFFF");
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    layer.append(spark);

    const angle = (k / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const distance = (phone ? 110 : 170) + Math.random() * (phone ? 120 : 230);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const isRay = kind === "flip-spark-ray";
    // Rays point away from the centre; stars and dots tumble.
    const turn = isRay ? (angle * 180) / Math.PI : Math.random() * 540 - 270;
    spark.animate(
      [
        { transform: `translate(0px,0px) rotate(${turn}deg) scale(.2)`, opacity: 0 },
        {
          transform: `translate(${(dx * 0.35).toFixed(1)}px,${(dy * 0.35).toFixed(1)}px) rotate(${turn * 0.6}deg) scale(1.15)`,
          opacity: 1,
          offset: 0.25,
        },
        {
          transform: `translate(${dx.toFixed(1)}px,${(dy + 40).toFixed(1)}px) rotate(${isRay ? turn : turn * 1.8}deg) scale(0)`,
          opacity: 0,
        },
      ],
      {
        duration: 950 + Math.random() * 350,
        delay: k * 9,
        easing: "cubic-bezier(.2,.75,.3,1)",
        fill: "both",
      },
    );
  }
}
