"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-12 text-white sm:px-10 flex items-center justify-center">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-emerald-300/30" />
        <div className="absolute right-12 top-20 h-72 w-72 rounded-full bg-orange-200/30" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-200/20" />
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/70 p-12 text-center shadow-lg">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600">
            <span className="text-3xl">✓</span>
          </div>

          <h1 className="mb-2 text-4xl font-semibold text-white">Payment successful!</h1>
          <p className="mb-6 text-white/70">Your order has been confirmed and will be processed shortly.</p>

          <p className="mb-8 text-sm text-zinc-400">
            Redirecting to home in <span className="font-semibold text-emerald-400">5 seconds</span>...
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Go to Home Now
            </Link>
            <Link
              href="/cart"
              className="block rounded-full border border-zinc-600 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
