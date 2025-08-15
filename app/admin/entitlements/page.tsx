"use client"

import { useEffect, useMemo, useState } from "react"

type Pkg = { id: string; slug: string }
const TYPES = ["one_time", "subscription"] as const
const STATUSES = ["active", "canceled", "expired"] as const

type Row = { id: string; slug: string; type: string; status: string; created_at: string }

export default function AdminEntitlementsPage() {
  const [userId, setUserId] = useState("")
  const [rows, setRows] = useState<Row[]>([])
  const [packages, setPackages] = useState<Pkg[]>([])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  const canQuery = useMemo(() => userId.trim().length > 0, [userId])

  const load = async () => {
    if (!canQuery) return
    setLoading(true)
    setStatus(null)
    try {
      const r = await fetch(`/api/admin/entitlements?user_id=${encodeURIComponent(userId)}`, { cache: "no-store" })
      const j = await r.json()
      if (!r.ok) throw new Error(j.error || r.statusText)
      setRows(j.rows || [])
    } catch (e: any) {
      setStatus(`Error: ${e.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // load packages on mount
    (async () => {
      try {
        const r = await fetch("/api/admin/packages", { cache: "no-store" })
        const j = await r.json()
        if (!r.ok) throw new Error(j.error || r.statusText)
        setPackages(j.packages || [])
      } catch (e) {
        // ignore
      }
    })()
  }, [])

  const onGrant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canQuery) return setStatus("Enter a user_id first")
    const fd = new FormData(e.currentTarget)
    const payload = {
      user_id: userId.trim(),
      slug: String(fd.get("slug")),
      type: String(fd.get("type")),
      status: String(fd.get("status")),
    }
    setStatus("Granting…")
    try {
      const r = await fetch("/api/admin/entitlements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const j = await r.json()
      if (!r.ok) throw new Error(j.error || r.statusText)
      setStatus("Granted / Upserted.")
      load()
      e.currentTarget.reset()
    } catch (e: any) {
      setStatus(`Error: ${e.message || e}`)
    }
  }

  const onRevoke = async (slug: string) => {
    if (!canQuery) return setStatus("Enter a user_id first")
    if (!confirm(`Revoke ${slug} for user?`)) return
    setStatus("Revoking…")
    try {
      const r = await fetch("/api/admin/entitlements", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId.trim(), slug }),
      })
      const j = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(j.error || r.statusText)
      setStatus("Revoked.")
      load()
    } catch (e: any) {
      setStatus(`Error: ${e.message || e}`)
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin · Entitlements</h1>

      <section className="mb-6 grid sm:grid-cols-[1fr_auto] gap-3 items-end">
        <label className="grid gap-1 text-sm">
          <span>Target user_id</span>
          <input
            className="border rounded px-2 py-1"
            placeholder="UUID (copy from /account)"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <button className="bg-black text-white rounded px-3 py-2" onClick={load} disabled={!canQuery}>Load</button>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Grant / Upsert</h2>
        <form onSubmit={onGrant} className="grid gap-3 sm:grid-cols-4 items-end">
          <label className="grid gap-1 text-sm">
            <span>Package</span>
            <select name="slug" className="border rounded px-2 py-1">
              {packages.map((p) => (
                <option key={p.id} value={p.slug}>{p.slug}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span>Type</span>
            <select name="type" className="border rounded px-2 py-1">
              {TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1 text-sm">
            <span>Status</span>
            <select name="status" className="border rounded px-2 py-1">
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="bg-black text-white rounded px-3 py-2">Grant / Upsert</button>
        </form>
      </section>

      {status && <div className="mb-4 text-sm">{status}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Slug</th>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Granted</th>
              <th className="py-2 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="py-4">Loading…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={5} className="py-4">No entitlements</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={`${r.slug}-${r.created_at}`} className="border-b">
                  <td className="py-2 pr-4">{r.slug}</td>
                  <td className="py-2 pr-4">{r.type}</td>
                  <td className="py-2 pr-4">{r.status}</td>
                  <td className="py-2 pr-4">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="py-2 pr-4">
                    <button className="text-red-600 underline" onClick={() => onRevoke(r.slug)}>Revoke</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
