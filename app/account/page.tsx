import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import AccountTabs from "./AccountTabs"

export const runtime = "nodejs"

export default async function AccountPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const supabase = getSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/signin?next=/account")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, full_name, role, stripe_customer_id, timezone, marketing_opt_in, avatar_url, company, sector, position, website_url, bio, other_info")
    .eq("id", user.id)
    .maybeSingle()

  const purchaseSuccess = searchParams?.purchase === "success"
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Account</h1>
      {purchaseSuccess && (
        <div className="mb-6 text-green-800 bg-green-50 border border-green-200 rounded-md px-4 py-3">
          <p className="text-sm">Checkout completed. Your entitlements will be available shortly.</p>
        </div>
      )}
      <AccountTabs user={{ id: user.id, email: user.email ?? null }} profile={profile as any} />
    </main>
  )
}
