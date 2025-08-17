import Link from "next/link"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export const runtime = "nodejs"

async function ensureAdmin() {
  const supabase = getSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/signin?next=/admin")
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()
  if (!profile || profile.role !== "admin") redirect("/unauthorized")
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await ensureAdmin()

  const navItems = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/members", label: "Members" },
    { href: "/admin/versions", label: "Versions" },
    { href: "/admin/entitlements", label: "Entitlements" },
    { href: "/admin/messages", label: "Messages" },
  ] as const

  return (
    <>
      <Header showPromo={false} />
      <div className="min-h-screen flex flex-col pt-24">
        <div className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex gap-6">
              <aside className="w-56 shrink-0">
                <AdminSidebar items={navItems} />
              </aside>
              <section className="flex-1 min-w-0">
                {children}
              </section>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
