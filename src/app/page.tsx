import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

const stats = [
  { label: "Same-day shipping", value: "24h" },
  { label: "Projects served", value: "18k+" },
  { label: "Parts validated on dyno", value: "+320" },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-zinc-50 px-4 py-12 text-zinc-900 dark:from-black dark:via-zinc-950 dark:to-black sm:px-6">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60 blur-3xl">
        <div className="absolute left-10 top-10 h-64 w-64 rounded-full bg-emerald-300/30" />
        <div className="absolute right-12 top-20 h-72 w-72 rounded-full bg-orange-200/30" />
        <div className="absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-emerald-200/20" />
      </div>

      <div className="mx-auto flex w-full flex-col gap-10">
        <header className="grid gap-8 rounded-[32px] border border-zinc-200/60 bg-white/70 p-10 shadow-[0_30px_120px_-80px_rgba(0,0,0,0.5)] backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/70">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              Performance Garage Line
            </span>
            <nav className="flex flex-wrap items-center gap-3 text-sm text-white">
              <Link className="rounded-full px-4 py-2 font-semibold transition hover:bg-zinc-100" href="#products">
                Turbos
              </Link>
              <Link className="rounded-full px-4 py-2 font-semibold transition hover:bg-zinc-100" href="#products">
                Fuel
              </Link>
              <Link className="rounded-full px-4 py-2 font-semibold transition hover:bg-zinc-100" href="#products">
                Cooling
              </Link>
              <Link className="rounded-full px-4 py-2 font-semibold transition hover:bg-zinc-100" href="/cart">
                🛒 Cart
              </Link>
            </nav>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Street and track projects · Curated, tested parts
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl text-zinc-300">
                Performance components for high flow, high pressure and high confidence.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white">
                Injectors, turbos, hoses and electronics selected from our technical inventory.
                Ready to integrate AP, GM and custom projects with support from a team that measures
                every step on the dyno.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold">
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-white shadow-lg shadow-emerald-500/10 transition hover:-translate-y-[2px] hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  Browse parts
                  <span aria-hidden className="text-lg">⟶</span>
                </Link>
                <Link
                  href="#history"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-5 py-3 text-zinc-100 transition hover:-translate-y-[2px] hover:border-emerald-400 hover:text-emerald-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                >
                  Talk to a specialist
                </Link>
              </div>
            </div>

            <div className="grid gap-4 rounded-3xl border border-zinc-200/60 bg-white/70 p-6 shadow-inner backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/70">
              <div className="grid grid-cols-3 gap-4 text-center">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-zinc-200 bg-white/80 px-4 py-5 text-sm font-semibold shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
                  >
                    <div className="text-2xl font-bold text-emerald-700">
                      {item.value}
                    </div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/80 p-4 text-sm leading-relaxed text-emerald-700 dark:bg-zinc-900/60">
                Each part is produced in small batches, with traceable fibers and certified water-reduction processes.
              </div>
            </div>
          </div>
        </header>

        <section id="products" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-700">
                Boost-ready setup
              </p>
              <h2 className="text-3xl font-semibold text-white">Key parts to gain torque now</h2>
              <p className="max-w-2xl text-base text-white">
                Fuel, pressure and cooling kits chosen for thermal stability and fast response.
                Mix components from the catalog to build the next stage of your project.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:-translate-y-[1px] hover:border-emerald-400 hover:text-emerald-600"
            >
              Receive stock alerts
              <span aria-hidden className="text-lg">↗</span>
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section
          id="history"
          className="grid gap-6 rounded-[28px] border border-zinc-200/60 bg-white/70 p-8 shadow-[0_20px_80px_-60px_rgba(0,0,0,0.2)] backdrop-blur lg:grid-cols-[1.2fr_1fr] dark:border-zinc-800/70 dark:bg-zinc-950/70"
        >
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-zinc-100">
              Technical validation
            </p>
            <h3 className="text-2xl font-semibold text-zinc-100">Curated, tested parts with history</h3>
            <p className="text-base leading-relaxed text-white">
              Each item goes through flow or backpressure measurement before entering the catalog.
              We prioritize brands with local support, clear warranty and documentation to integrate with
              FuelTech ECUs. Talk to the team for recommendations on injectors, turbos or wastegates
              matching your engine's current map.
            </p>
          </div>
          <div className="grid gap-3 rounded-2xl bg-white/80 p-6 text-sm font-semibold text-zinc-100 dark:bg-zinc-900/60">
            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
              <span>Dyno and flow measurement</span>
              <span className="text-emerald-700">+320 logs</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
              <span>Shipping and insurance</span>
              <span className="text-emerald-700">24h Brazil</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
              <span>Application support</span>
              <span className="text-emerald-700">ECU · Fuel · Air</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
