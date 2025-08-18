import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const code = url.searchParams.get("code")

  // Always create response upfront to attach cookies via adapter
  const res = NextResponse.redirect(new URL("/", req.url))

  if (!code) return res

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          res.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          res.cookies.set({ name, value: "", ...options })
        },
      },
    }
  )

  try {
    await supabase.auth.exchangeCodeForSession(code)
  } catch {
    // If exchange fails, fall back to signin
    return NextResponse.redirect(new URL("/signin", req.url))
  }

  // Optional: support forwarding back to a next path if provided
  const next = url.searchParams.get("next")
  if (next && next.startsWith("/")) {
    return NextResponse.redirect(new URL(next, req.url))
  }

  return res
}
