"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";

export function FloatingCartBar() {
  const pathname = usePathname();
  const { cart, getTotalPrice, getTotalQuantity, clearCart } = useCart();

  // Não mostrar a barra na página do carrinho ou checkout
  if (pathname === "/cart" || pathname === "/checkout" || cart.length === 0) return null;

  const total = getTotalPrice();
  const quantity = getTotalQuantity();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-700 bg-black/95 backdrop-blur px-6 py-4 shadow-2xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-sm">
            <p className="text-zinc-400">Cart Summary</p>
            <p className="text-lg font-semibold text-white">
              {quantity} {quantity === 1 ? "item" : "items"} · {formatPrice(total)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={clearCart}
            className="rounded-full border border-red-600/50 px-6 py-3 font-semibold text-red-500 transition hover:bg-red-600/10"
          >
            Clear Cart
          </button>
          <Link
            href="/cart"
            className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
          >
            Go to Cart →
          </Link>
        </div>
      </div>
    </div>
  );
}
