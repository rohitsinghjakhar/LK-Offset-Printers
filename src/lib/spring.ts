/**
 * Minimal 2D spring (semi-implicit Euler on rAF) for pointer-driven effects in the initial
 * bundle — Magnetic, Tilt. Matches spring.ui / spring.soft from lib/motion.
 */
export type SpringConfig = { stiffness: number; damping: number; mass?: number };

export function createSpring2D(apply: (x: number, y: number) => void, { stiffness, damping, mass = 1 }: SpringConfig) {
  let x = 0;
  let y = 0;
  let vx = 0;
  let vy = 0;
  let tx = 0;
  let ty = 0;
  let frame = 0;
  let last = 0;

  const step = (now: number) => {
    const dt = Math.min(0.032, (now - last) / 1000 || 0.016);
    last = now;
    const ax = (-stiffness * (x - tx) - damping * vx) / mass;
    const ay = (-stiffness * (y - ty) - damping * vy) / mass;
    vx += ax * dt;
    vy += ay * dt;
    x += vx * dt;
    y += vy * dt;
    apply(x, y);
    const settled = Math.abs(x - tx) < 0.01 && Math.abs(y - ty) < 0.01 && Math.abs(vx) < 0.01 && Math.abs(vy) < 0.01;
    if (settled) {
      x = tx;
      y = ty;
      apply(x, y);
      frame = 0;
    } else {
      frame = requestAnimationFrame(step);
    }
  };

  return {
    set(nextX: number, nextY: number) {
      tx = nextX;
      ty = nextY;
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(step);
      }
    },
    stop() {
      cancelAnimationFrame(frame);
      frame = 0;
    },
  };
}

export function prefersMotion() {
  return window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
