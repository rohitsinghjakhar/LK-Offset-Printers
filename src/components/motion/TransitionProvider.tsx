"use client";
import { createContext, useCallback, useContext, useMemo } from "react";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import type { Locale } from "@/types/i18n";
type NavigateOptions = { locale?: Locale; replace?: boolean; swatch?: { rect: DOMRect; color: string } };
type TransitionContextValue = { navigate: (href: string, options?: NavigateOptions) => void; busy: boolean };
const TransitionContext = createContext<TransitionContextValue | null>(null);
export function useTransitionNav() {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("Navigation requires TransitionProvider");
  return context;
}
/** Navigate immediately, without obscuring content or adding artificial delays. */
export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const locale = useLocale() as Locale;
  const navigate = useCallback(
    (href: string, options: NavigateOptions = {}) => {
      const settings = { locale: options.locale ?? locale };
      if (options.replace) router.replace(href, settings);
      else router.push(href, settings);
    },
    [router, locale],
  );
  const value = useMemo(() => ({ navigate, busy: false }), [navigate]);
  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
}
