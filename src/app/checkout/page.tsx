"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { CartSummary } from "@/components/cart-summary";
import { formatPrice } from "@/data/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "debit",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const subtotal = getTotalPrice();
  const shippingCost = subtotal >= 50000 ? 0 : 1500;
  const total = subtotal + shippingCost;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.fullName || !form.email || !form.address || !form.city || !form.state || !form.zip) {
      return "Please fill in all shipping fields.";
    }
    if (form.paymentMethod !== "debit") {
      return "Only debit card is supported in this simulation.";
    }
    const digits = form.cardNumber.replace(/\D/g, "");
    if (digits.length < 12 || digits.length > 19) {
      return "Enter a valid card number.";
    }
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(form.expiry)) {
      return "Expiry must be in MM/YY format.";
    }
    if (!/^\d{3,4}$/.test(form.cvv)) {
      return "CVV must be 3-4 digits.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setProcessing(true);
    // Simulate payment processing delay
    await new Promise((r) => setTimeout(r, 1500));

    // Create a fake order
    const orderId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      items: cart,
      shipping: {
        fullName: form.fullName,
        email: form.email,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
      },
      payment: {
        method: form.paymentMethod,
        last4: form.cardNumber.replace(/\D/g, "").slice(-4),
      },
      amounts: {
        subtotal,
        shipping: shippingCost,
        total,
      },
      status: "processing",
    };

    try {
      const existing = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem("orders", JSON.stringify([order, ...existing]));
      localStorage.setItem("lastOrder", JSON.stringify(order));
      clearCart();
      router.push(`/payment-success`);
    } catch (err) {
      setError("Failed to save order locally.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black px-6 py-12 text-white sm:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-emerald-300/30" />
        <div className="absolute right-12 top-20 h-72 w-72 rounded-full bg-orange-200/30" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-200/20" />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-semibold text-white">Checkout</h1>
            <p className="text-white/80">Complete your order and simulate payment</p>
          </div>
          <Link href="/cart" className="rounded-full border border-zinc-600 px-4 py-2 text-sm font-semibold transition hover:bg-white/10">
            ← Back to cart
          </Link>
        </header>

        <div className="grid gap-8 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-6 shadow-lg lg:col-span-2">
            <h2 className="text-lg font-semibold text-white">Shipping details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="Full name" name="fullName" value={form.fullName} onChange={onChange} />
              <input className="rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="Email" name="email" type="email" value={form.email} onChange={onChange} />
              <input className="md:col-span-2 rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="Address" name="address" value={form.address} onChange={onChange} />
              <input className="rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="City" name="city" value={form.city} onChange={onChange} />
              <input className="rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="State" name="state" value={form.state} onChange={onChange} />
              <input className="rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="ZIP" name="zip" value={form.zip} onChange={onChange} />
            </div>

            <h2 className="pt-2 text-lg font-semibold text-white">Payment</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <select name="paymentMethod" value={form.paymentMethod} onChange={onChange} className="rounded-xl border border-zinc-300 p-3 text-zinc-400 outline-none">
                <option value="debit">Debit card</option>
              </select>
              <input className="rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="Name on card" name="cardName" value={form.cardName} onChange={onChange} />
              <input className="rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="Card number" name="cardNumber" value={form.cardNumber} onChange={onChange} />
              <input className="rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="MM/YY" name="expiry" value={form.expiry} onChange={onChange} />
              <input className="rounded-xl border border-zinc-300 p-3 text-zinc-100 placeholder-zinc-400 outline-none" placeholder="CVV" name="cvv" value={form.cvv} onChange={onChange} />
            </div>

            {error && <p className="text-sm font-semibold text-red-300">{error}</p>}

            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-semibold text-white">Pay {formatPrice(total)}</span>
              <button disabled={processing} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60">
                {processing ? "Processing..." : "Pay with debit card"}
              </button>
            </div>
          </form>

          <CartSummary tone="dark" />
        </div>
      </div>
    </div>
  );
}
