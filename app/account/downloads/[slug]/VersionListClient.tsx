"use client"

import { useMemo, useState } from "react"

export type VersionRow = {
  id: string
  version: string
  created_at: string
}

export default function VersionListClient({ slug, versions }: { slug: string; versions: VersionRow[] }) {
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "UTC",
      }),
    []
  )

  const handleDownload = async (v: VersionRow) => {
    setBusyId(v.id)
    setError(null)
    try {
      const r = await fetch("/api/download-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageSlug: slug, version: v.version }),
        credentials: "include",
      })
      const j = await r.json()
      if (r.ok && j.url) {
        try { window.open(j.url, "_blank") } catch {}
      } else {
        setError(j.error || r.statusText)
      }
    } catch (e: any) {
      setError(e?.message || String(e))
    } finally {
      setBusyId(null)
    }
  }

  if (!versions || versions.length === 0) return null

  return (
    <ul className="list-disc pl-5 space-y-2">
      {versions.map((v) => (
        <li key={v.id} className="text-sm">
          <span className="font-mono">{v.version}</span>
          <button
            className="ml-3 bg-black text-white rounded px-2 py-1 text-xs disabled:opacity-50"
            disabled={busyId === v.id}
            onClick={() => handleDownload(v)}
          >
            {busyId === v.id ? "Generating..." : "Get download"}
          </button>
          <span className="ml-3 text-gray-500" suppressHydrationWarning>
            {fmt.format(new Date(v.created_at as any))}
          </span>
        </li>
      ))}
      {error && (
        <li className="text-xs text-red-600 list-none">{error}</li>
      )}
    </ul>
  )
}
