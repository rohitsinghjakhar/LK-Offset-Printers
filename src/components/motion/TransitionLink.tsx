"use client";

import { forwardRef } from "react";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/types/i18n";
import { useTransitionNav } from "./TransitionProvider";

type TransitionLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  locale?: Locale;
  prefetch?: boolean;
  replace?: boolean;
  /** Swatch transition: colour block grows from this element into the category header. */
  swatchColor?: string;
  "data-cursor"?: string;
};

function isModified(event: React.MouseEvent) {
  return event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;
}

/** Locale-aware link that plays the page-transition cover before routing. */
export const TransitionLink = forwardRef<HTMLAnchorElement, TransitionLinkProps>(function TransitionLink(
  { href, locale, onClick, target, prefetch = false, replace, swatchColor, children, ...rest },
  ref,
) {
  const { navigate } = useTransitionNav();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || isModified(event) || (target && target !== "_self")) return;
    event.preventDefault();
    const swatch = swatchColor ? { rect: event.currentTarget.getBoundingClientRect(), color: swatchColor } : undefined;
    navigate(href, { locale, replace, swatch });
  };

  return (
    <Link ref={ref} href={href} locale={locale} prefetch={prefetch} replace={replace} target={target} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
});
