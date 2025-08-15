import Link from "next/link"
import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { getSupabaseAdminClient } from "@/lib/supabase/admin"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import AdvancedTesterPanel from "./AdvancedTesterPanel"

type EntRow = { slug: string; type: string; status: string; created_at: string }

export const runtime = "nodejs"

export default async function DownloadsPage() {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/signin?next=/account/downloads")

  // Fetch entitlements on the server using admin client
  const admin = getSupabaseAdminClient()
  const { data: ents, error: entErr } = await admin
    .from("entitlements")
    .select("package_id, type, status, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (entErr) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-4">Your downloads</h1>
        <p className="text-sm text-red-600">{entErr.message}</p>
      </main>
    )
  }

  const active = (ents || []).filter((r: any) => String(r.status) === "active")
  const pkgIds = Array.from(new Set(active.map((r: any) => r.package_id)))
  let slugs: string[] = []
  let rows: EntRow[] = []
  if (pkgIds.length > 0) {
    const { data: pkgs } = await admin.from("packages").select("id, slug").in("id", pkgIds)
    const map = new Map((pkgs || []).map((p: any) => [p.id, p.slug]))
    rows = active.map((r: any) => ({
      slug: map.get(r.package_id) || "",
      type: r.type,
      status: r.status,
      created_at: r.created_at,
    }))
    slugs = rows.map((r) => r.slug).filter(Boolean)
  }

  // Auto-redirect if exactly one entitlement
  if (slugs.length === 1) {
    redirect(`/account/downloads/${slugs[0]}`)
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-4">Your downloads</h1>
      <p className="text-sm text-gray-600 mb-6">Access downloads for the packages you own.</p>

      <Card>
        <CardHeader>
          <div className="font-medium">Active entitlements</div>
        </CardHeader>
        <CardContent>
          {rows.length === 0 ? (
            <div className="text-sm">No active entitlements for this account.</div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {rows.map((e) => (
                <div key={`${e.slug}-${e.created_at}`} className="border rounded p-4 bg-white">
                  <div className="text-base font-semibold capitalize">{e.slug}</div>
                  <div className="text-xs text-gray-600 mb-3">{e.type}</div>
                  <Link href={`/account/downloads/${e.slug}`} className="inline-block bg-black text-white rounded px-3 py-2 text-sm">
                    Go to {e.slug} downloads
                  </Link>
                </div>
              ))}
            </div>
          )}

          <AdvancedTesterPanel slugs={slugs} />
        </CardContent>
      </Card>

      <div className="mt-6 text-xs text-gray-500">Signed URLs expire quickly. If a link fails after a minute, request a new one.</div>
    </main>
  )
}
