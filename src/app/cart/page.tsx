"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/data/products";
import { CartSummary } from "@/components/cart-summary";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-zinc-50 px-6 py-12 dark:from-black dark:via-zinc-950 dark:to-black">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl">
          <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-emerald-300/30" />
          <div className="absolute right-12 top-20 h-72 w-72 rounded-full bg-orange-200/30" />
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <div className="rounded-3xl border border-zinc-200/60 bg-white/70 p-10 text-center shadow-[0_30px_120px_-80px_rgba(0,0,0,0.5)] backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/70">
            <h1 className="mb-4 text-3xl font-semibold text-zinc-900 dark:text-zinc-50">Your Cart is Empty</h1>
            <p className="mb-6 text-zinc-600 dark:text-zinc-400">
              Start adding parts to your setup to see them here.
            </p>
            <Link
              href="/#products"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Continue shopping
              <span aria-hidden>⟶</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-zinc-50 px-6 py-12 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black sm:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-emerald-300/30" />
        <div className="absolute right-12 top-20 h-72 w-72 rounded-full bg-orange-200/30" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-200/20" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold dark:text-zinc-50">Shopping Cart</h1>
            <p className="text-zinc-600 dark:text-zinc-400">{getTotalQuantity()} items</p>
          </div>
          <Link
            href="/#products"
            className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            ← Continue shopping
          </Link>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70"
              >
                {/* Product Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-b from-zinc-900 to-black">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-1 flex-col gap-2">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{item.name}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{formatPrice(item.priceCents)}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded-lg border border-zinc-200 px-3 py-1 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded-lg border border-zinc-200 px-3 py-1 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Price & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatPrice(item.priceCents * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs font-semibold text-zinc-500 transition hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-4">
            <CartSummary tone="dark" />
            <button
              onClick={clearCart}
              className="w-full rounded-full border border-red-200 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950"
            >
              Clear Cart
            </button>
            <Link
              href="/checkout"
              className="block w-full rounded-full bg-emerald-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-emerald-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
