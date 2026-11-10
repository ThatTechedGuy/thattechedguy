/** Patterns drawn as a field over the whole canvas: dots, contours, dither and grid. Ported from the source's patInit. */

import { bump, hash, TAU, type Drawer } from "./pattern";

/** 4×4 ordered-dither thresholds. */
const bayer = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export const drawDots: Drawer = (f, t) => {
  const { ctx: c, w, h } = f;
  const s = 18;
  c.clearRect(0, 0, w, h);
  for (let y = s / 2; y < h; y += s) {
    for (let x = s / 2; x < w; x += s) {
      let v =
        Math.sin(x * 0.011 + t * 0.7) +
        Math.sin(y * 0.016 - t * 0.5) +
        Math.sin((x + y) * 0.006 + t * 0.35);
      v = (v + 3) / 6 + bump(f, x, y, 140) * 0.6;
      if (v < 0.42) continue;
      c.globalAlpha = f.alpha * Math.min(1, 0.25 + v * 0.7);
      c.fillStyle = v > 0.82 ? f.c2 : f.c1;
      c.beginPath();
      c.arc(x, y, Math.min(s * 0.46, (v - 0.42) * s * 0.95), 0, TAU);
      c.fill();
    }
  }
  c.globalAlpha = 1;
};

export const drawContours: Drawer = (f, t) => {
  const { ctx: c, w, h } = f;
  const lines = 34;
  const gap = h / lines;
  c.clearRect(0, 0, w, h);
  for (let i = 0; i < lines; i++) {
    const y0 = i * gap + gap / 2;
    // Every seventh line is drawn bolder in the second colour.
    const hot = i % 7 === 3;
    c.beginPath();
    for (let x = 0; x <= w + 12; x += 12) {
      let y =
        y0 +
        16 * Math.sin(x * 0.0055 + t * 0.45 + i * 0.32) +
        10 * Math.sin(x * 0.013 - t * 0.3 + i * 0.21) +
        6 * Math.sin(x * 0.031 + t * 0.8 + i);
      y -= 46 * bump(f, x, y0, 170);
      if (x === 0) c.moveTo(x, y);
      else c.lineTo(x, y);
    }
    c.globalAlpha = f.alpha * (hot ? 0.75 : 0.16);
    c.strokeStyle = hot ? f.c2 : f.c1;
    c.lineWidth = hot ? 1.6 : 1;
    c.stroke();
  }
  c.globalAlpha = 1;
};

export const drawDither: Drawer = (f, t) => {
  const { ctx: c, w, h } = f;
  const s = 8;
  c.clearRect(0, 0, w, h);
  c.globalAlpha = f.alpha;
  for (let y = 0, j = 0; y < h; y += s, j++) {
    for (let x = 0, i = 0; x < w; x += s, i++) {
      let v =
        0.5 +
        0.28 * Math.sin(x * 0.005 - t * 0.55 + Math.sin(y * 0.004 + t * 0.25) * 2.2) +
        0.2 * Math.sin((x * 0.6 - y) * 0.006 + t * 0.4);
      v += bump(f, x, y, 160) * 0.55;
      if (v <= ((bayer[(j % 4) * 4 + (i % 4)] ?? 0) + 0.5) / 16) continue;
      c.fillStyle = v > 0.92 ? f.c2 : f.c1;
      c.fillRect(x, y, s - 2, s - 2);
    }
  }
  c.globalAlpha = 1;
};

export const drawGrid: Drawer = (f, t) => {
  const { ctx: c, w, h } = f;
  const s = 56;
  const tail = 140;
  c.clearRect(0, 0, w, h);
  c.globalAlpha = f.alpha * 0.35;
  c.strokeStyle = f.c1;
  c.lineWidth = 1;
  c.beginPath();
  for (let x = 0; x <= w; x += s) {
    c.moveTo(x + 0.5, 0);
    c.lineTo(x + 0.5, h);
  }
  for (let y = 0; y <= h; y += s) {
    c.moveTo(0, y + 0.5);
    c.lineTo(w, y + 0.5);
  }
  c.stroke();
  // Fourteen comets run along the grid lines, alternating across and down.
  for (let k = 0; k < 14; k++) {
    const across = k % 2 === 0;
    const speed = 120 + hash(k) * 220;
    const line = Math.floor(hash(k + 9) * (across ? h / s : w / s)) * s + 0.5;
    const span = across ? w : h;
    const pos = ((t * speed + hash(k + 3) * span * 3) % (span + tail * 2)) - tail;
    const gradient = across
      ? c.createLinearGradient(pos, 0, pos + tail, 0)
      : c.createLinearGradient(0, pos, 0, pos + tail);
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, f.c2);
    c.globalAlpha = f.alpha;
    c.strokeStyle = gradient;
    c.lineWidth = 2;
    c.beginPath();
    if (across) {
      c.moveTo(pos, line);
      c.lineTo(pos + tail, line);
    } else {
      c.moveTo(line, pos);
      c.lineTo(line, pos + tail);
    }
    c.stroke();
  }
  // Grid crossings near the pointer light up.
  c.fillStyle = f.c2;
  for (let x = 0; x <= w; x += s) {
    for (let y = 0; y <= h; y += s) {
      const b = bump(f, x, y, 130);
      if (b < 0.05) continue;
      c.globalAlpha = f.alpha * b;
      c.beginPath();
      c.arc(x, y, 2 + b * 4, 0, TAU);
      c.fill();
    }
  }
  c.globalAlpha = 1;
};
