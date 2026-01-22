"use client";
import Image from "next/image";
import { useState } from "react";
import { formatPrice, Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const fallbackImage = `https://placehold.co/640x400/0f172a/f4f4f5?text=${encodeURIComponent(product.name)}`;
  const imageSrc = product.image;
  const description = product.description ?? `Focused on ${product.keywords.join(", ")}.`;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white/60 shadow-[0_20px_80px_-60px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_120px_-80px_rgba(0,0,0,0.6)] dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="relative h-64 w-full overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-800 to-black">
        {product.badge ? (
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-sm dark:bg-emerald-400/90 dark:text-black">
            {product.badge}
          </span>
        ) : null}
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.14em] text-emerald-600 dark:text-emerald-300">
          <span>Performance</span>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
            {formatPrice(product.priceCents)}
          </span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-amber-600 dark:text-amber-300">
            <span className="inline-flex items-center gap-2 font-semibold">
              <span aria-hidden>★</span>
              <span>{product.rating.stars.toFixed(1)}</span>
            </span>
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                {product.rating.count} reviews
              </span>
          </div>
          <h3 className="text-xl font-semibold text-zinc-900 transition-colors duration-200 group-hover:text-emerald-700 dark:text-zinc-50 dark:group-hover:text-emerald-300">
            {product.name}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
          <div className="flex flex-wrap gap-2">
            {product.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <button 
            onClick={handleAddToCart}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
              addedToCart
                ? "bg-emerald-600 text-white dark:bg-emerald-500"
                : "bg-zinc-900 text-white hover:-translate-y-[1px] hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            }`}
          >
            {addedToCart ? "Added!" : "Add to cart"}
            <span aria-hidden className="text-lg">{addedToCart ? "✓" : "+"}</span>
          </button>
          <button className="text-sm font-semibold text-emerald-700 transition-colors duration-200 hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200">
            View details
          </button>
        </div>
      </div>
    </article>
  );
}
