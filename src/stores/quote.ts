import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { QuoteSelection } from "@/lib/pricing";

type QuoteState = {
  lastProduct: string | null;
  configs: Record<string, QuoteSelection>;
  save: (slug: string, selection: QuoteSelection) => void;
};

/** Remembers the last configuration per product so returning visitors pick up where they left off. */
export const useQuoteStore = create<QuoteState>()(
  persist(
    (set) => ({
      lastProduct: null,
      configs: {},
      save: (slug, selection) => set((s) => ({ lastProduct: slug, configs: { ...s.configs, [slug]: selection } })),
    }),
    { name: "bp-quote", version: 1, storage: createJSONStorage(() => localStorage) },
  ),
);
