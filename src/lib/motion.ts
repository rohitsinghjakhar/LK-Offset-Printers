/** Motion tokens shared by Motion, GSAP and WAAPI code. */
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
  press: [0.76, 0, 0.24, 1] as const,
};

export const easeCss = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  press: "cubic-bezier(0.76, 0, 0.24, 1)",
};

export const easeGsap = {
  out: "expo.out",
  inOut: "power3.inOut",
  press: "power4.inOut",
};

export const duration = {
  micro: 0.18,
  ui: 0.35,
  reveal: 0.8,
  hero: 1.2,
  stagger: 0.06,
};

export const spring = {
  ui: { type: "spring", stiffness: 380, damping: 30 } as const,
  soft: { type: "spring", stiffness: 140, damping: 20, mass: 0.8 } as const,
};

export const inView = { once: true, amount: 0.3 } as const;
