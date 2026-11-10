/** Patterns made of moving things: key rain, orbits, flow lines and floating paper. Ported from the source's patInit. */

import { bump, hash, TAU, type Drawer } from "./pattern";

const glyphs = ["⌘", "⇧", "V", "C", "⌥", "⌃", "⏎", "Y", "+", "·"];

export const drawRain: Drawer = (f, t) => {
  const { ctx: c, w, h } = f;
  const cw = 24;
  const ch = 22;
  c.clearRect(0, 0, w, h);
  c.font = "600 15px monospace";
  c.textAlign = "center";
  for (let col = 0, x = cw / 2; x < w; x += cw, col++) {
    const speed = 40 + hash(col) * 90;
    const length = 6 + Math.floor(hash(col + 5) * 10);
    const head = ((t * speed + hash(col + 2) * (h + 400)) % (h + 400)) - 200;
    const near = bump(f, x, head, 160);
    for (let k = 0; k < length; k++) {
      const y = head - k * ch;
      if (y < -ch || y > h + ch) continue;
      // Only the leading glyph keeps changing; the trail stays put as it falls.
      const seed = col * 31 + Math.floor(y / ch) + (k === 0 ? Math.floor(t * 3) : 0);
      c.globalAlpha = f.alpha * (k === 0 ? 1 : (1 - k / length) * 0.5) * (0.6 + near * 0.6);
      c.fillStyle = k === 0 ? f.c2 : f.c1;
      c.fillText(glyphs[Math.floor(hash(seed) * glyphs.length)] ?? "", x, y);
    }
  }
  c.globalAlpha = 1;
};

export const drawOrbits: Drawer = (f, t) => {
  const { ctx: c, w, h } = f;
  // The centre leans a little towards the pointer.
  const cx = w / 2 + (f.mx > -999 ? (f.mx - w / 2) * 0.04 : 0);
  const cy = h / 2;
  c.clearRect(0, 0, w, h);
  const maxR = Math.hypot(w, h) / 2;
  for (let i = 1, r = 60; r < maxR; r += 52, i++) {
    c.globalAlpha = f.alpha * 0.45;
    c.strokeStyle = f.c1;
    c.lineWidth = 1;
    c.setLineDash(i % 3 === 0 ? [3, 7] : []);
    c.beginPath();
    c.arc(cx, cy, r, 0, TAU);
    c.stroke();
    const planets = 1 + (i % 3);
    const direction = i % 2 ? 1 : -1;
    for (let k = 0; k < planets; k++) {
      const angle = direction * t * (14 / r) + k * (TAU / planets) + i;
      c.globalAlpha = f.alpha;
      c.fillStyle = k === 0 ? f.c2 : f.c1;
      c.beginPath();
      c.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, k === 0 ? 4 : 2.5, 0, TAU);
      c.fill();
    }
  }
  c.setLineDash([]);
  c.globalAlpha = 1;
};

export const drawFlow: Drawer = (f, t) => {
  const { ctx: c, w, h } = f;
  if (!f.parts) {
    f.parts = Array.from({ length: 320 }, (_, q) => ({
      x: hash(q) * w,
      y: hash(q + 99) * h,
      age: Math.floor(hash(q + 7) * 200),
    }));
    c.clearRect(0, 0, w, h);
  }
  // Fade the last frames instead of clearing, so each particle leaves a trail.
  c.globalCompositeOperation = "destination-out";
  c.globalAlpha = 0.08;
  c.fillStyle = "#000";
  c.fillRect(0, 0, w, h);
  c.globalCompositeOperation = "source-over";
  c.lineWidth = 1.3;
  for (const [i, p] of f.parts.entries()) {
    const angle = (Math.sin(p.x * 0.0035 + t * 0.15) + Math.cos(p.y * 0.0042 - t * 0.12)) * Math.PI;
    const step = 1.6 + bump(f, p.x, p.y, 150) * 3;
    const nx = p.x + Math.cos(angle) * step;
    const ny = p.y + Math.sin(angle) * step;
    c.globalAlpha = f.alpha * (i % 9 === 0 ? 0.9 : 0.4);
    c.strokeStyle = i % 9 === 0 ? f.c2 : f.c1;
    c.beginPath();
    c.moveTo(p.x, p.y);
    c.lineTo(nx, ny);
    c.stroke();
    p.x = nx;
    p.y = ny;
    p.age++;
    if (p.x < 0 || p.x > w || p.y < 0 || p.y > h || p.age > 260) {
      p.x = hash(i + t) * w;
      p.y = hash(i * 3 + t) * h;
      p.age = 0;
    }
  }
  c.globalAlpha = 1;
};

export const drawPaper: Drawer = (f, t) => {
  const { ctx: c, w, h } = f;
  c.clearRect(0, 0, w, h);
  for (let k = 0; k < 22; k++) {
    const cw = 70 + hash(k) * 70;
    const ch = cw * 0.66;
    const speed = 10 + hash(k + 1) * 22;
    const x = hash(k + 2) * w;
    const y = h + 120 - ((t * speed + hash(k + 3) * (h + 240)) % (h + 240));
    const tilt = Math.sin(t * 0.3 + k) * 0.35 + (hash(k + 4) - 0.5);
    const b = bump(f, x, y, 160);
    // Every fifth card is filled with the second colour; the rest are outlines.
    const filled = k % 5 === 0;
    c.save();
    c.translate(x + b * 30, y - b * 20);
    c.rotate(tilt + b * 0.4);
    c.globalAlpha = f.alpha * (0.35 + hash(k + 5) * 0.4);
    c.beginPath();
    c.roundRect(-cw / 2, -ch / 2, cw, ch, 8);
    if (filled) {
      c.fillStyle = f.c2;
      c.fill();
    } else {
      c.strokeStyle = f.c1;
      c.lineWidth = 1.2;
      c.stroke();
    }
    c.fillStyle = filled ? "#FFFFFF" : f.c1;
    c.globalAlpha *= 0.8;
    c.fillRect(-cw / 2 + 10, -ch / 2 + 14, cw * 0.55, 3);
    c.fillRect(-cw / 2 + 10, -ch / 2 + 24, cw * 0.38, 3);
    c.restore();
  }
  c.globalAlpha = 1;
};
