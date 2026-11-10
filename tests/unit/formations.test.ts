import { expect, test } from "bun:test";

import { halfWidth, pose, shapeCounts, type ShapeKind } from "@/projects/yank/backdrop/formations";
import { chapters } from "@/projects/yank/config";

const kinds: ShapeKind[] = ["card", "key", "blob", "ring", "hook"];

// Readability rule: 3D shapes must never sit in the middle of the screen, where the text is.
test("every shape stays out of the middle band in every chapter", () => {
  for (const aspect of [1.6, 2.2, 0.7]) {
    const edge = halfWidth(aspect) * (aspect < 0.8 ? 1.02 : 0.62);
    for (const { id } of chapters) {
      for (const kind of kinds) {
        for (let index = 0; index < shapeCounts[kind]; index++) {
          for (let seed = 0; seed < 100; seed += 7.3) {
            for (const t of [0, 1.7, 12.4, 300]) {
              const x = pose(id, { kind, index, seed }, t, aspect).position[0];
              expect(Math.abs(x)).toBeGreaterThanOrEqual(edge);
            }
          }
        }
      }
    }
  }
});
