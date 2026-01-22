"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const steps = [
  { key: "placed", label: "Order placed" },
  { key: "preparing", label: "Preparing package" },
  { key: "shipped", label: "Shipped" },
  { key: "out", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" },
];

export default function TrackingPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params;
  const [index, setIndex] = useState(0);

  const storageKey = useMemo(() => `tracking:${orderId}`, [orderId]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { index: savedIndex } = JSON.parse(saved);
        setIndex(savedIndex);
      } else {
        localStorage.setItem(storageKey, JSON.stringify({ index: 0 }));
      }
    } catch {}
  }, [storageKey]);

  useEffect(() => {
    if (index >= steps.length - 1) return; // already delivered
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = Math.min(prev + 1, steps.length - 1);
        localStorage.setItem(storageKey, JSON.stringify({ index: next }));
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [index, storageKey]);

  const reset = () => {
    setIndex(0);
    localStorage.setItem(storageKey, JSON.stringify({ index: 0 }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-zinc-50 px-6 py-12 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black sm:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-emerald-300/30" />
        <div className="absolute right-12 top-20 h-72 w-72 rounded-full bg-orange-200/30" />
      </div>

      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Tracking</h1>
            <p className="text-sm text-zinc-600">Order ID: {orderId}</p>
          </div>
          <Link href={`/order/${orderId}`} className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100">
            ← Order details
          </Link>
        </header>

        <ol className="space-y-4">
          {steps.map((step, i) => {
            const reached = i <= index;
            const isCurrent = i === index;
            return (
              <li key={step.key} className={`rounded-2xl border p-4 ${reached ? "border-emerald-300 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-900/20" : "border-zinc-200 bg-white/70 dark:border-zinc-800 dark:bg-zinc-950/70"}`}>
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${reached ? "text-emerald-700 dark:text-emerald-300" : "text-zinc-800 dark:text-zinc-200"}`}>
                    {step.label}
                  </span>
                  {isCurrent && index < steps.length - 1 && (
                    <span className="text-xs text-zinc-500">In progress...</span>
                  )}
                  {i < index && <span aria-hidden>✓</span>}
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div className="h-2 rounded-full bg-emerald-600" style={{ width: `${(index / (steps.length - 1)) * 100}%` }} />
          </div>
          <span className="w-16 text-right text-sm font-semibold">{Math.round((index / (steps.length - 1)) * 100)}%</span>
        </div>

        <div className="mt-6 flex gap-3">
          <button onClick={reset} className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900">
            Restart simulation
          </button>
          <Link href="/" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
