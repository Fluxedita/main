"use client"

import { useState } from "react"
import AdvancedTester from "./AdvancedTester"

export default function AdvancedTesterPanel({ slugs }: { slugs: string[] }) {
  const [open, setOpen] = useState(false)
  if (!slugs || slugs.length === 0) return null
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="text-sm underline"
      >
        {open ? "Hide advanced tester" : "Show advanced tester"}
      </button>
      {open && (
        <div className="mt-3">
          <div className="text-sm text-gray-700 mb-2">Signed URL tester (internal)</div>
          <AdvancedTester slugs={slugs} />
        </div>
      )}
    </div>
  )
}
