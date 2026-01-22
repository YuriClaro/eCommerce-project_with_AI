"use client";

import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";

export function CartSummary({ tone = "light" }: { tone?: "light" | "dark" }) {
  const { cart, getTotalPrice, getTotalQuantity } = useCart();

  const isDark = tone === "dark";

  const subtotal = getTotalPrice();
  const quantity = getTotalQuantity();

  // Simulated shipping: free for orders over R$ 500, otherwise R$ 15
  const shippingCost = subtotal >= 50000 ? 0 : 1500; // in cents
  const total = subtotal + shippingCost;

  return (
    <div
      className={
        `w-full rounded-2xl p-6 shadow-lg ` +
        (isDark ? "border border-zinc-800 bg-zinc-950/70" : "border border-zinc-200 bg-white/70")
      }
    >
      <h2 className={`mb-4 text-lg font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>Order Summary</h2>

      <div className="space-y-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="flex justify-between text-sm">
          <span className={isDark ? "text-zinc-300" : "text-zinc-600"}>Items ({quantity})</span>
          <span className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className={isDark ? "text-zinc-300" : "text-zinc-600"}>Shipping</span>
          {shippingCost === 0 ? (
            <span className={`font-semibold ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>Free</span>
          ) : (
            <span className={`font-semibold ${isDark ? "text-white" : "text-zinc-900"}`}>{formatPrice(shippingCost)}</span>
          )}
        </div>

        {shippingCost > 0 && subtotal < 50000 && (
          <p className={`text-xs ${isDark ? "text-emerald-400" : "text-emerald-600"}`}>
            Add {formatPrice(50000 - subtotal)} more for free shipping
          </p>
        )}
      </div>

      <div className="mt-4 flex justify-between text-lg font-bold">
        <span className={isDark ? "text-white" : "text-zinc-900"}>Total</span>
        <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
