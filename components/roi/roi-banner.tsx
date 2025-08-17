import Link from "next/link"

export function RoiBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 sm:p-10">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-2">
          <div>
            <div className="inline-fleor $1,999/yr
x items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
              📈 ROI Calculator
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              See your payback period in minutes
            </h2>
            <p className="mt-2 max-w-prose text-gray-600">
              Estimate monthly revenue impact, custom build costs avoided, and time-to-launch advantage. Validate build vs. buy
              with real numbers tailored to your traffic and conversion assumptions.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/value/roi"
                className="inline-flex items-center rounded-md bg-indigo-600 px-5 py-2.5 text-white shadow-sm hover:bg-indigo-700"
              >
                Open ROI Calculator
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-md border border-indigo-200 bg-white px-5 py-2.5 text-indigo-700 hover:bg-indigo-50"
              >
                View Pricing
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-indigo-200 bg-white/70 p-4 shadow-sm backdrop-blur">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs font-medium text-gray-500">Typical custom build</div>
                <div className="text-2xl font-bold text-gray-900">$121k–$243k</div>
                <div className="text-xs text-gray-500">6–9 months</div>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500">Premium (Early Adopter)</div>
                <div className="text-2xl font-bold text-gray-900">$199/mo</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
