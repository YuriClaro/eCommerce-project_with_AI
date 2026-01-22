"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/data/products";

export default function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      const found = orders.find((o: any) => o.id === orderId) || null;
      setOrder(found);
    } catch {
      setOrder(null);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="mx-auto max-w-3xl p-8 text-center">
        <h1 className="mb-2 text-2xl font-semibold">Order not found</h1>
        <Link className="text-emerald-600 underline" href="/">Go back</Link>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-zinc-50 px-6 py-12 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-emerald-300/30" />
        <div className="absolute right-12 top-20 h-72 w-72 rounded-full bg-orange-200/30" />
      </div>

      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Thanks for your order!</h1>
            <p className="text-sm text-zinc-600">Order ID: {order.id}</p>
          </div>
          <Link href={`/tracking/${order.id}`} className="rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700">
            Track delivery
          </Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {order.items.map((item: any) => (
              <div key={item.id} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950/70">
                <div className="relative h-20 w-20 overflow-hidden rounded-lg">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex flex-1 items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-zinc-600">Qty {item.quantity}</p>
                  </div>
                  <div className="text-emerald-700">{formatPrice(item.priceCents * item.quantity)}</div>
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-4 rounded-2xl border border-zinc-200 bg-white/70 p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950/70">
            <h2 className="mb-2 text-lg font-semibold">Summary</h2>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">{formatPrice(order.amounts.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="font-semibold">{order.amounts.shipping === 0 ? "Free" : formatPrice(order.amounts.shipping)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-emerald-700">{formatPrice(order.amounts.total)}</span>
            </div>
            <div className="pt-2 text-sm text-zinc-600">
              Shipped to: {order.shipping.fullName}, {order.shipping.address}, {order.shipping.city}-{order.shipping.state} {order.shipping.zip}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
