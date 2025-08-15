"use client"

import { useState } from "react"

type Props = {
  slugs: string[]
  defaultVersion?: string
}

export default function AdvancedTester({ slugs, defaultVersion = "1.8.0" }: Props) {
  const [version, setVersion] = useState(defaultVersion)
  const [status, setStatus] = useState<string | null>(null)
  const [lastUrl, setLastUrl] = useState<string | null>(null)

  const callDownload = async (slug: string) => {
    setStatus(`Requesting signed URL for ${slug}@${version} ...`)
    setLastUrl(null)
    try {
      const res = await fetch("/api/download-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageSlug: slug, version }),
        credentials: "include",
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus(`Error: ${data?.error || res.status}`)
        return
      }
      setStatus(`Success. URL expires in ${data.expiresIn}s`)
      setLastUrl(data.url)
      try { window.open(data.url, "_blank") } catch {}
    } catch (e: any) {
      setStatus(`Unexpected error: ${e?.message || e}`)
    }
  }

  if (!slugs || slugs.length === 0) return null

  return (
    <div className="mt-3">
      <div className="flex items-center gap-3 mb-2">
        <label className="text-sm text-gray-700" htmlFor="adv-version">Version</label>
        <input
          id="adv-version"
          className="border rounded px-2 py-1 text-sm"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
          placeholder="e.g. 1.0.0"
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slugs.map((slug) => (
          <button
            key={slug}
            className="bg-black text-white rounded px-3 py-2 text-sm"
            onClick={() => callDownload(slug)}
          >
            {slug}
          </button>
        ))}
      </div>
      {status && (
        <div className="mt-4 text-sm">
          <div className="mb-1 font-medium">Result</div>
          <pre className="bg-gray-50 border rounded p-2 whitespace-pre-wrap break-words">{status}</pre>
        </div>
      )}
      {lastUrl && (
        <div className="mt-3 text-sm">
          <a className="text-blue-600 underline" href={lastUrl} target="_blank" rel="noreferrer">Open signed URL</a>
        </div>
      )}
    </div>
  )
}
