"use client"

import { useMemo, useState } from "react"

interface RoiInputs {
  monthlyVisitors: number
  premiumConversion: number // as %
  arpu: number // $/month
  teamHourlyRate: number // $/hr
  teamSize: number // people
  monthsToBuild: number // months for custom build
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

export function RoiCalculator() {
  const [inputs, setInputs] = useState<RoiInputs>({
    monthlyVisitors: 20000,
    premiumConversion: 1.5,
    arpu: 8,
    teamHourlyRate: 100,
    teamSize: 3,
    monthsToBuild: 7.5,
  })

  const {
    monthlyRevenue,
    annualRevenue,
    devCostSaved,
    timeSavedMonths,
    paybackMonths,
  } = useMemo(() => {
    const visitors = clamp(inputs.monthlyVisitors, 0, 10_000_000)
    const conv = clamp(inputs.premiumConversion, 0, 100) / 100
    const arpu = clamp(inputs.arpu, 0, 10000)
    const rate = clamp(inputs.teamHourlyRate, 0, 1000)
    const team = clamp(inputs.teamSize, 0, 100)
    const months = clamp(inputs.monthsToBuild, 0, 48)

    const monthlyRevenue = visitors * conv * arpu
    const annualRevenue = monthlyRevenue * 12
    const devHours = team * 160 * months
    const devCostSaved = devHours * rate
    const timeSavedMonths = months
    const paybackMonths = monthlyRevenue > 0 ? Math.max(devCostSaved / monthlyRevenue, 0) : Infinity

    return { monthlyRevenue, annualRevenue, devCostSaved, timeSavedMonths, paybackMonths }
  }, [inputs])

  // Use a fixed locale to avoid SSR/CSR mismatch (e.g., "US$" vs "$" prefixes)
  const nf = useMemo(() => new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }), [])
  const cf0 = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }), [])
  const cf1 = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 1 }), [])

  const handle = (key: keyof RoiInputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputs(prev => ({
      ...prev,
      [key]: value === "" ? (0 as any) : Number(value),
    }))
  }

  const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  const labelClass = "block text-sm font-medium text-gray-700 mb-1"
  const cardClass = "rounded-xl border border-gray-200 bg-white p-5 shadow-sm"

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className={cardClass}>
        <h3 className="text-lg font-semibold mb-4">Inputs</h3>
        <div className="grid gap-4">
          <div>
            <label className={labelClass} htmlFor="rc-monthlyVisitors">Monthly visitors</label>
            <input id="rc-monthlyVisitors" type="number" min={0} className={inputClass} value={inputs.monthlyVisitors} onChange={handle("monthlyVisitors")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="rc-premiumConversion">Premium conversion (%)</label>
            <input id="rc-premiumConversion" type="number" min={0} max={100} step={0.1} className={inputClass} value={inputs.premiumConversion} onChange={handle("premiumConversion")} />
          </div>
          <div>
            <label className={labelClass} htmlFor="rc-arpu">ARPU ($/month)</label>
            <input id="rc-arpu" type="number" min={0} step={1} className={inputClass} value={inputs.arpu} onChange={handle("arpu")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass} htmlFor="rc-teamHourlyRate">Team hourly rate ($/hr)</label>
              <input id="rc-teamHourlyRate" type="number" min={0} step={5} className={inputClass} value={inputs.teamHourlyRate} onChange={handle("teamHourlyRate")} />
            </div>
            <div>
              <label className={labelClass} htmlFor="rc-teamSize">Team size (devs)</label>
              <input id="rc-teamSize" type="number" min={0} step={1} className={inputClass} value={inputs.teamSize} onChange={handle("teamSize")} />
            </div>
          </div>
          <div>
            <label className={labelClass} htmlFor="rc-monthsToBuild">Months to build from scratch</label>
            <input id="rc-monthsToBuild" type="number" min={0} step={0.5} className={inputClass} value={inputs.monthsToBuild} onChange={handle("monthsToBuild")} />
            <p className="mt-2 text-xs text-gray-500">Typical range for a comparable custom build: 6–9 months (est. $121k–$243k total).</p>
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <h3 className="text-lg font-semibold mb-4">Results</h3>
        <div className="grid gap-4">
          <div className="rounded-lg bg-indigo-50 p-4">
            <div className="text-sm text-indigo-800">Projected Monthly Premium Revenue</div>
            <div className="text-2xl font-semibold text-indigo-900">{cf0.format(monthlyRevenue)}</div>
          </div>
          <div className="rounded-lg bg-emerald-50 p-4">
            <div className="text-sm text-emerald-800">Projected 12‑Month Premium Revenue</div>
            <div className="text-2xl font-semibold text-emerald-900">{cf0.format(annualRevenue)}</div>
          </div>
          <div className="rounded-lg bg-amber-50 p-4">
            <div className="text-sm text-amber-800">Estimated Custom Build Cost Avoided</div>
            <div className="text-2xl font-semibold text-amber-900">{cf0.format(devCostSaved)}</div>
            <div className="mt-1 text-xs text-amber-700">Assumes {inputs.teamSize} devs × 160 hrs/mo × {inputs.monthsToBuild} mo × {cf1.format(inputs.teamHourlyRate)}/hr</div>
          </div>
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="text-sm text-slate-700">Time to Launch Saved</div>
            <div className="text-2xl font-semibold text-slate-900">{nf.format(timeSavedMonths)} months</div>
          </div>
          <div className="rounded-lg bg-fuchsia-50 p-4">
            <div className="text-sm text-fuchsia-800">Payback Period</div>
            <div className="text-2xl font-semibold text-fuchsia-900">{Number.isFinite(paybackMonths) ? `${paybackMonths.toFixed(1)} months` : "—"}</div>
            <div className="mt-1 text-xs text-fuchsia-700">Months for projected monthly premium revenue to offset custom build cost.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
