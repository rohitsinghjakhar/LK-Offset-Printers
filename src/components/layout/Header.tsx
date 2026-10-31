"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ChevronDown, Menu } from "lucide-react";
import { primaryNav } from "@/config/nav";
import { InkButton } from "@/components/motion/InkButton";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { inkBg } from "@/lib/ink";
import { cx } from "@/lib/cx";
import type { InkColour } from "@/types/catalog";
import { CartButton, type CartLabels } from "./CartButton";
import { LocaleToggle, type LocaleLabels } from "./LocaleToggle";
import { Wordmark } from "./Wordmark";

const MobileMenu = dynamic(() => import("./MobileMenu").then((mod) => mod.MobileMenu), { ssr: false });

export type HeaderCategory = { slug: string; name: string; colour: InkColour; fromLabel: string; top: { slug: string; name: string }[] };
export type HeaderFeatured = { slug: string; name: string; short: string; fromLabel: string; visual: React.ReactNode };
export type HeaderLabels = {
  home: string;
  primary: string;
  catalog: string;
  nav: Record<(typeof primaryNav)[number]["key"], string>;
  getQuote: string;
  openMenu: string;
  featured: string;
  all: string;
  locale: LocaleLabels;
  cart: CartLabels;
};

type HeaderProps = {
  categories: HeaderCategory[];
  featured: HeaderFeatured | null;
  labels: HeaderLabels;
  /** Offer strip (server-rendered, see src/data/content/site.ts), shown above the header row. */
  banner?: React.ReactNode;
  festival?: "off" | "diwali" | "holi" | "wedding";
};

const navLink =
  "relative inline-flex h-11 items-center gap-1 rounded-card px-3.5 text-[0.95rem] font-medium text-ink/80 transition-colors duration-200 hover:text-ink aria-expanded:text-ink";

/**
 * Transparent over the hero; paper + blur(12px) + hairline after 80px; hides on scroll down and
 * returns on scroll up. The catalog mega menu is a disclosure: click, hover (mouse) or keyboard,
 * Esc to close, closes when focus leaves.
 */
export function Header({ categories, featured, labels, banner, festival = "off" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 80);
      if (y > 240 && y > lastY + 2) setHidden(true);
      else if (y < lastY - 2 || y <= 240) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const clearTimer = () => {
    if (timer.current) window.clearTimeout(timer.current);
  };
  const openSoon = () => {
    clearTimer();
    timer.current = window.setTimeout(() => setMega(true), 60);
  };
  const closeSoon = () => {
    clearTimer();
    timer.current = window.setTimeout(() => setMega(false), 180);
  };
  const close = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    setMega(false);
  }, []);

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      triggerRef.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [mega, close]);

  const columns = [categories.slice(0, 3), categories.slice(3, 6), categories.slice(6)];
  const isHidden = hidden && !mega && !menuOpen;

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-[100] border-b transition-[transform,background-color,border-color,backdrop-filter] duration-[350ms] ease-out",
          scrolled || mega ? "border-line bg-paper/88 backdrop-blur-[12px]" : "border-transparent bg-transparent",
        )}
        style={{ transform: isHidden ? "translateY(-100%)" : undefined }}
      >
        {banner}
        {festival !== "off" ? (
          <span aria-hidden data-festival={festival} className="festival-rule pointer-events-none absolute inset-x-0 -bottom-px h-[3px]" />
        ) : null}
        <div className="container-x flex h-[var(--header-row-h)] items-center justify-between gap-4">
          <TransitionLink href="/" aria-label={labels.home} className="-ml-1 rounded-card p-1">
            <Wordmark />
          </TransitionLink>

          <div
            ref={wrapRef}
            className="hidden lg:block"
            onPointerLeave={(e) => e.pointerType === "mouse" && closeSoon()}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) close();
            }}
          >
            <nav aria-label={labels.primary}>
              <ul className="flex items-center gap-0.5">
                <li>
                  <button
                    ref={triggerRef}
                    type="button"
                    className={navLink}
                    aria-expanded={mega}
                    aria-controls={panelId}
                    onClick={() => setMega((v) => !v)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && openSoon()}
                  >
                    {labels.catalog}
                    <ChevronDown aria-hidden className={cx("size-3.5 transition-transform duration-300", mega && "rotate-180")} />
                  </button>
                </li>
                {primaryNav.map((item) => (
                  <li key={item.key}>
                    <TransitionLink href={item.href} className={navLink}>
                      {labels.nav[item.key]}
                    </TransitionLink>
                  </li>
                ))}
              </ul>
            </nav>
            <div
              id={panelId}
              inert={!mega}
              data-state={mega ? "open" : "closed"}
              onPointerEnter={(e) => e.pointerType === "mouse" && clearTimer()}
              className={cx(
                "fixed inset-x-0 top-[var(--header-h)] border-b border-line bg-paper shadow-paper transition-[opacity,transform] duration-300 ease-out",
                mega ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
              )}
            >
              <div className="container-x grid-12 gap-y-8 py-10">
                <div className="col-span-9 grid grid-cols-3 gap-x-8 gap-y-7">
                  {columns.map((column, ci) => (
                    <ul key={ci} className="flex flex-col gap-7">
                      {column.map((cat) => (
                        <li key={cat.slug}>
                          <TransitionLink href={`/catalog/${cat.slug}`} onClick={close} className="group flex items-start gap-3">
                            <span aria-hidden className={cx("mt-1.5 block size-3 shrink-0", inkBg[cat.colour])} />
                            <span className="flex flex-col">
                              <span className="font-display text-[1.1rem] leading-tight font-semibold underline-offset-4 group-hover:underline">
                                {cat.name}
                              </span>
                              <span className="mt-1 label-mono text-ink-muted">{cat.fromLabel}</span>
                            </span>
                          </TransitionLink>
                          <ul className="mt-2.5 flex flex-col gap-1 pl-6">
                            {cat.top.map((p) => (
                              <li key={p.slug}>
                                <TransitionLink
                                  href={`/product/${p.slug}`}
                                  onClick={close}
                                  className="text-small text-ink-muted transition-colors hover:text-ink"
                                >
                                  {p.name}
                                </TransitionLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
                {featured ? (
                  <div className="col-span-3">
                    <TransitionLink
                      href={`/product/${featured.slug}`}
                      onClick={close}
                      data-cursor="View"
                      className="group block rounded-card bg-paper-2 p-5 transition-shadow duration-300 hover:shadow-paper"
                    >
                      <span className="label-mono text-ink-muted">{labels.featured}</span>
                      <span
                        className={cx(
                          "mt-3 block transition-[clip-path] duration-700 ease-out",
                          mega ? "[clip-path:inset(0_0_0_0)]" : "[clip-path:inset(0_0_100%_0)]",
                        )}
                      >
                        {featured.visual}
                      </span>
                      <span className="mt-3 block font-display text-h3 font-semibold">{featured.name}</span>
                      <span className="mt-1 block text-small text-ink-muted">{featured.short}</span>
                      <span className="mt-3 block label-mono">{featured.fromLabel}</span>
                    </TransitionLink>
                    <TransitionLink
                      href="/catalog"
                      onClick={close}
                      className="mt-4 inline-flex min-h-11 items-center gap-2 text-small font-medium underline underline-offset-4"
                    >
                      {labels.all} →
                    </TransitionLink>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:block">
              <LocaleToggle labels={labels.locale} />
            </div>
            <CartButton labels={labels.cart} />
            <div className="hidden md:block">
              <InkButton href="/quote" size="sm">
                {labels.getQuote}
              </InkButton>
            </div>
            <button
              type="button"
              onClick={() => {
                setMenuLoaded(true);
                setMenuOpen(true);
              }}
              aria-label={labels.openMenu}
              aria-expanded={menuOpen}
              className="grid size-11 place-items-center rounded-card transition-colors hover:bg-ink/5 lg:hidden"
            >
              <Menu className="size-6" strokeWidth={1.6} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      {menuLoaded ? <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} /> : null}
    </>
  );
}
