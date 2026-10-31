"use client";

import { forwardRef } from "react";
import { cx } from "@/lib/cx";
import { Magnetic } from "./Magnetic";
import { TransitionLink } from "./TransitionLink";

type Variant = "primary" | "ghost" | "paper" | "ghost-paper" | "inverse";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  /** Classes for the magnetic wrapper, e.g. "w-full sm:w-auto" for full-width mobile buttons. */
  wrapperClassName?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  "data-cursor"?: string;
};

type ButtonProps = CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & { href?: undefined };
type LinkProps = CommonProps & {
  href: string;
  external?: boolean;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  "aria-label"?: string;
};

export type InkButtonProps = ButtonProps | LinkProps;

const base =
  "group/ink relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-card font-medium tracking-[-0.005em] transition-[color,transform,border-color] duration-300 ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magenta disabled:pointer-events-none disabled:opacity-50";

// Text flips to ink on the magenta fill (4.5:1) and to paper on the ink fill.
const variants: Record<Variant, { root: string; fill: string }> = {
  primary: { root: "bg-ink text-paper hover:text-ink", fill: "bg-magenta" },
  ghost: { root: "border border-ink/80 text-ink hover:text-paper", fill: "bg-ink" },
  paper: { root: "bg-paper text-ink hover:text-ink", fill: "bg-magenta" },
  "ghost-paper": { root: "border border-paper/70 text-paper hover:text-ink", fill: "bg-paper" },
  // On magenta surfaces the magenta fill would vanish, so ink fills with paper instead.
  inverse: { root: "bg-ink text-paper hover:text-ink", fill: "bg-paper" },
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-small",
  md: "h-12 px-6 text-[0.975rem]",
  lg: "h-14 px-7 text-base md:h-16 md:px-9 md:text-[1.05rem]",
};

function setOrigin(event: React.PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--ink-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--ink-y", `${event.clientY - rect.top}px`);
}

function Inner({ children, icon, fill }: { children: React.ReactNode; icon?: React.ReactNode; fill: string }) {
  return (
    <>
      <span
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-0 -z-10 transition-[clip-path] duration-[550ms] ease-out [clip-path:circle(0%_at_var(--ink-x,50%)_var(--ink-y,50%))] group-hover/ink:[clip-path:circle(150%_at_var(--ink-x,50%)_var(--ink-y,50%))]",
          fill,
        )}
      />
      <span className="relative">{children}</span>
      {icon ? <span className="relative -mr-1 inline-flex transition-transform duration-300 ease-out group-hover/ink:translate-x-0.5">{icon}</span> : null}
    </>
  );
}

/** Primary CTA: magenta ink expands from the exact entry point, text colour flips. */
export const InkButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, InkButtonProps>(function InkButton(props, ref) {
  const { variant = "primary", size = "md", magnetic = true, className, wrapperClassName, children, icon } = props;
  const v = variants[variant];
  const classes = cx(base, v.root, sizes[size], className);

  let element: React.ReactNode;
  if (props.href !== undefined) {
    const { href, external, target, rel, onClick } = props;
    const isExternal = external || /^(https?:|tel:|mailto:)/.test(href);
    element = isExternal ? (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
        rel={rel ?? (href.startsWith("http") ? "noopener noreferrer" : undefined)}
        className={classes}
        onPointerEnter={setOrigin}
        onPointerLeave={setOrigin}
        onClick={onClick}
        aria-label={props["aria-label"]}
        data-cursor={props["data-cursor"]}
      >
        <Inner icon={icon} fill={v.fill}>
          {children}
        </Inner>
      </a>
    ) : (
      <TransitionLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        onPointerEnter={setOrigin}
        onPointerLeave={setOrigin}
        onClick={onClick}
        aria-label={props["aria-label"]}
        data-cursor={props["data-cursor"]}
      >
        <Inner icon={icon} fill={v.fill}>
          {children}
        </Inner>
      </TransitionLink>
    );
  } else {
    const { variant: _v, size: _s, magnetic: _m, className: _c, wrapperClassName: _w, children: _ch, icon: _i, type, ...rest } = props;
    element = (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? "button"}
        className={classes}
        onPointerEnter={setOrigin}
        onPointerLeave={setOrigin}
        {...rest}
      >
        <Inner icon={icon} fill={v.fill}>
          {children}
        </Inner>
      </button>
    );
  }

  return magnetic ? (
    <Magnetic strength={0.35} max={10} className={wrapperClassName}>
      {element}
    </Magnetic>
  ) : wrapperClassName ? (
    <span className={cx("inline-flex", wrapperClassName)}>{element}</span>
  ) : (
    element
  );
});
