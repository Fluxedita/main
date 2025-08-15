import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import VersionListClient, { type VersionRow } from "./VersionListClient"

export const runtime = "nodejs"

export default async function PackageDownloadPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect(`/signin?next=/account/downloads/${encodeURIComponent(slug)}`)

  // Try to read at least one version for this slug via RLS; if none visible, user is not entitled
  const { data: versions, error } = await supabase
    .from("package_versions")
    .select("id, version, storage_key, created_at, packages:package_id ( slug, title )")
    .eq("packages.slug", slug)
    .order("created_at", { ascending: false })
    .limit(50)

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">{slug} Downloads</h1>
        <p className="text-red-600">{error.message}</p>
      </main>
    )
  }

  const hasAccess = (versions?.length || 0) > 0
  if (!hasAccess) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-4">{slug} Downloads</h1>
        <p className="text-sm">No access to this package under your account.</p>
        <p className="text-sm mt-2"><Link className="underline" href="/account">Back to Account</Link></p>
      </main>
    )
  }

  // Normalize joined "packages" shape (can appear as object or array depending on client typing)
  const first = (versions as any)?.[0]
  const pkgJoin = first?.packages
  const pkgTitle = (Array.isArray(pkgJoin) ? pkgJoin?.[0]?.title : pkgJoin?.title) || slug

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">{pkgTitle}</h1>
      <p className="text-sm text-gray-600 mb-6">Entitled package • {slug}</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Versions</h2>
        <VersionListClient
          slug={slug}
          versions={(versions || []).map((v: any) => ({ id: v.id, version: v.version, created_at: v.created_at })) as VersionRow[]}
        />
      </section>

      <p className="text-sm"><Link className="underline" href="/account">Back to Account</Link></p>
    </main>
  )
}
