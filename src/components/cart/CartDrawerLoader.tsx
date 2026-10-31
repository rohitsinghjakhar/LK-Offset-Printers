"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useCart } from "@/stores/cart";

const CartDrawer = dynamic(() => import("./CartDrawer"), { ssr: false });

/** The drawer code downloads the first time someone opens the cart, then stays mounted. */
export function CartDrawerLoader() {
  const open = useCart((s) => s.open);
  const [mounted, setMounted] = useState(false);
  if (open && !mounted) setMounted(true);
  return mounted ? <CartDrawer /> : null;
}
