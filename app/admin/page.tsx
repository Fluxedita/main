import Link from "next/link"
import { getSupabaseServerClient } from "../../lib/supabase/server"
import { redirect } from "next/navigation"

export const runtime = "nodejs"

export default async function AdminHome() {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/signin?next=/admin")

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile || profile.role !== "admin") {
    redirect("/unauthorized")
  }

  // Count of active (open) support tickets
  let openCount = 0
  try {
    const { count } = await supabase
      .from('support_tickets')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'open')
    openCount = Number(count || 0)
  } catch {}

  const navItems = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/members", label: "Members" },
    { href: "/admin/versions", label: "Versions" },
    { href: "/admin/entitlements", label: "Entitlements" },
    { href: "/admin/messages", label: "Messages" },
  ] as const

  return (
    <main className="px-1">
      <h1 className="text-3xl font-bold mb-6">Admin</h1>

      {/* Content cards (sidebar is supplied by admin/layout.tsx) */}
      <section className="flex-1">
        <div className="grid gap-4 sm:grid-cols-2">
            <Link href="/admin/members" className="rounded-lg border bg-white p-4 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Members</h3>
                  <p className="text-sm text-gray-600 mt-1">View members, support packages, and entitlements.</p>
                </div>
                <span className="text-xs rounded border bg-gray-50 px-2 py-1">Open</span>
              </div>
            </Link>
            <Link href="/admin/versions" className="rounded-lg border bg-white p-4 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Manage Versions</h3>
                  <p className="text-sm text-gray-600 mt-1">Create and manage product versions/releases.</p>
                </div>
                <span className="text-xs rounded border bg-gray-50 px-2 py-1">Open</span>
              </div>
            </Link>

            <Link href="/admin/entitlements" className="rounded-lg border bg-white p-4 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">Manage Entitlements</h3>
                  <p className="text-sm text-gray-600 mt-1">View and adjust user access/licenses.</p>
                </div>
                <span className="text-xs rounded border bg-gray-50 px-2 py-1">Open</span>
              </div>
            </Link>

            <Link href="/admin/messages" className="rounded-lg border bg-white p-4 hover:shadow-sm transition">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">Support Messages {openCount > 0 && (<span className="inline-flex items-center justify-center text-[10px] leading-none px-1.5 py-0.5 rounded-full bg-red-600 text-white">{openCount}</span>)}</h3>
                  <p className="text-sm text-gray-600 mt-1">Review tickets, reply, and manage status.</p>
                </div>
                <span className="text-xs rounded border bg-gray-50 px-2 py-1">Open</span>
              </div>
            </Link>
          </div>
        </section>
    </main>
  )
}
