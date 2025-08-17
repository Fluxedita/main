"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type Item = { href: string; label: string }

export function AdminSidebar({ items }: { items: readonly Item[] }) {
  const pathname = usePathname()
  return (
    <nav className="rounded-lg border bg-white">
      <ul className="p-2">
        {items.map((it) => {
          const active = pathname === it.href || (it.href !== "/admin" && pathname.startsWith(it.href))
          return (
            <li key={it.href}>
              <Link
                className={
                  `block rounded px-3 py-2 text-sm hover:bg-gray-50 ` +
                  (active ? "bg-gray-100 font-medium text-gray-900" : "text-gray-700")
                }
                href={it.href}
                aria-current={active ? "page" : undefined}
              >
                {it.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
