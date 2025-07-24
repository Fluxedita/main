"use client"
import { useState, useRef, useEffect } from "react"
import { Link2, X } from "lucide-react"

interface SectionLink {
  id: string
  label: string
  excerpt: string
}

interface QuickLinksProps {
  sections: SectionLink[]
}

export function QuickLinks({ sections }: QuickLinksProps) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu on outside click or Escape
  useEffect(() => {
    if (!open) return
    function handle(e: MouseEvent | KeyboardEvent) {
      if (
        e instanceof MouseEvent &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
      if (e instanceof KeyboardEvent && e.key === "Escape") {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handle)
    document.addEventListener("keydown", handle)
    return () => {
      document.removeEventListener("mousedown", handle)
      document.removeEventListener("keydown", handle)
    }
  }, [open])

  return (
    <>
      {/* Floating Button */}
      <button
        aria-label="Quick Links"
        className="fixed left-6 top-1/2 z-40 -translate-y-1/2 bg-white border border-gray-200 shadow-lg rounded-full p-3 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        style={{ boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)" }}
        onClick={() => setOpen((v) => !v)}
      >
        <Link2 className="h-7 w-7 text-blue-600" />
      </button>
      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40" style={{ pointerEvents: "auto" }}>
          <div className="absolute inset-0 bg-black/10" aria-hidden onClick={() => setOpen(false)} />
          <div
            ref={menuRef}
            className="fixed left-20 top-1/2 -translate-y-1/2 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl w-80 max-w-[90vw] p-4 flex flex-col gap-2 animate-fade-in"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-lg text-blue-700">Quick Links</span>
              <button
                aria-label="Close Quick Links"
                className="p-1 rounded hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 focus:bg-blue-100 transition group relative"
                  onMouseEnter={() => setHovered(section.id)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setOpen(false)}
                >
                  <span className="font-medium text-gray-900 group-hover:text-blue-700 transition">
                    {section.label}
                  </span>
                  {/* Excerpt tooltip */}
                  {hovered === section.id && (
                    <span className="absolute left-full top-1/2 -translate-y-1/2 ml-3 w-56 bg-white border border-gray-200 shadow-lg rounded p-2 text-xs text-gray-700 z-50 animate-fade-in">
                      {section.excerpt}
                    </span>
                  )}
                </a>
              ))}
              <a
                href="#top"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 focus:bg-blue-100 transition font-medium text-gray-900 group"
                onClick={() => setOpen(false)}
              >
                <span>Return to Top</span>
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  )
} 