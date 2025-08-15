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

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <Link className="text-blue-600 underline" href="/admin/versions">Manage Versions</Link>
        </li>
        <li>
          <Link className="text-blue-600 underline" href="/admin/entitlements">Manage Entitlements</Link>
        </li>
      </ul>
    </main>
  )
}
