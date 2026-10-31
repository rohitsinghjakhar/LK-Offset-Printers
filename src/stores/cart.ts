import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { QuoteSelection } from "@/lib/pricing";
import type { CategorySlug, InkColour } from "@/types/catalog";
import type { L } from "@/types/i18n";

export type CartItem = {
  id: string;
  productSlug: string;
  name: L;
  category: CategorySlug;
  colour: InkColour;
  unit: L;
  selection: QuoteSelection;
  /** Human-readable option summary, e.g. ["500 cards", "Both sides", "Gold foil"]. */
  summary: L[];
  /** Snapshot incl. GST for display. Checkout re-prices on the server. */
  total: number;
  addedAt: number;
};

type CartState = {
  items: CartItem[];
  open: boolean;
  /** Increments on every add so the badge can pop. */
  bump: number;
  add: (item: Omit<CartItem, "id" | "addedAt">) => void;
  update: (id: string, patch: Partial<Omit<CartItem, "id">>) => void;
  remove: (id: string) => { item: CartItem; index: number } | null;
  restore: (item: CartItem, index: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
};

function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      bump: 0,
      add: (item) => set((s) => ({ items: [...s.items, { ...item, id: makeId(), addedAt: Date.now() }], bump: s.bump + 1 })),
      update: (id, patch) => set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) })),
      remove: (id) => {
        const index = get().items.findIndex((i) => i.id === id);
        if (index < 0) return null;
        const item = get().items[index];
        set((s) => ({ items: s.items.filter((i) => i.id !== id) }));
        return { item, index };
      },
      restore: (item, index) =>
        set((s) => {
          const items = [...s.items];
          items.splice(Math.min(index, items.length), 0, item);
          return { items };
        }),
      clear: () => set({ items: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "bp-cart",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    },
  ),
);

export const selectCount = (s: CartState) => s.items.length;
export const selectTotal = (s: CartState) => s.items.reduce((sum, i) => sum + i.total, 0);
