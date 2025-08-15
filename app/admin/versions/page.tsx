"use client"

import { useEffect, useState } from "react"

type VersionRow = { id: string; slug: string; version: string; storage_key: string; created_at: string }
type Pkg = { id: string; slug: string }

export default function AdminVersionsPage() {
  const [rows, setRows] = useState<VersionRow[]>([])
  const [loading, setLoading] = useState(false)
  const [packages, setPackages] = useState<Pkg[]>([])
  const [form, setForm] = useState({ slug: "", version: "1.8.0", storage_key: "" })
  const [status, setStatus] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    setStatus(null)
    try {
      const r = await fetch("/api/admin/versions", { cache: "no-store" })
      const j = await r.json()
      if (!r.ok) throw new Error(j.error || r.statusText)
      setRows(j.rows || [])
    } catch (e: any) {
      setStatus(`Error: ${e.message || e}`)
    } finally {
      setLoading(false)
    }
  }

  const loadPackages = async () => {
    try {
      const r = await fetch("/api/admin/packages", { cache: "no-store" })
      const j = await r.json()
      if (!r.ok) throw new Error(j.error || r.statusText)
      const pkgs: Pkg[] = j.packages || []
      setPackages(pkgs)
      // Initialize form slug if empty
      if (!form.slug && pkgs.length > 0) setForm((f) => ({ ...f, slug: pkgs[0].slug }))
    } catch (e: any) {
      setStatus(`Error loading packages: ${e.message || e}`)
    }
  }

  useEffect(() => {
    load()
    loadPackages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("Saving...")
    try {
      const r = await fetch("/api/admin/versions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const j = await r.json()
      if (!r.ok) throw new Error(j.error || r.statusText)
      setStatus("Saved.")
      setForm((f) => ({ ...f, storage_key: "" }))
      load()
    } catch (e: any) {
      setStatus(`Error: ${e.message || e}`)
    }
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin · Versions</h1>

      <form onSubmit={onSubmit} className="mb-6 grid gap-3 sm:grid-cols-4 items-end">
        <label className="grid gap-1 text-sm">
          <span>Package</span>
          <select
            className="border rounded px-2 py-1"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          >
            {packages.map((p) => (
              <option key={p.id} value={p.slug}>{p.slug}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-1 text-sm">
          <span>Version</span>
          <input className="border rounded px-2 py-1" value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} />
        </label>
        <label className="grid gap-1 text-sm sm:col-span-2">
          <span>Storage key (object path in bucket)</span>
          <input className="border rounded px-2 py-1" placeholder="e.g. multipage_package-main-v1.8.zip" value={form.storage_key} onChange={(e) => setForm({ ...form, storage_key: e.target.value })} />
        </label>
        <button type="submit" className="bg-black text-white rounded px-3 py-2">Add / Upsert</button>
      </form>

      {status && <div className="mb-4 text-sm">{status}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-4">Slug</th>
              <th className="py-2 pr-4">Version</th>
              <th className="py-2 pr-4">Storage key</th>
              <th className="py-2 pr-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="py-4">Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={4} className="py-4">No rows</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b">
                  <td className="py-2 pr-4">{r.slug}</td>
                  <td className="py-2 pr-4">{r.version}</td>
                  <td className="py-2 pr-4">{r.storage_key}</td>
                  <td className="py-2 pr-4">{new Date(r.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
