import { NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

// Public routes that never require auth (besides assets, which are excluded by matcher)
const PUBLIC_PATHS = new Set<string>([
  "/",
  "/about",
  "/pricing",
  "/products",
  "/documentation",
  "/learning",
  "/installation",
  "/faq",
  "/contact",
  "/help",
  "/signin",
  "/unauthorized",
])

// Route prefixes that require an authenticated session
const PROTECTED_PREFIXES = [
  "/account",
  "/dashboard",
]

// Admin-only route prefix
const ADMIN_PREFIXES = [
  "/admin",
]

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Allow all public paths
  const { pathname, search } = req.nextUrl
  if (PUBLIC_PATHS.has(pathname)) return res

  // Only run Supabase check for protected prefixes
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  const isAdminRoute = ADMIN_PREFIXES.some((p) => pathname.startsWith(p))
  if (!isProtected && !isAdminRoute) return res

  // Create a Supabase client using a cookies adapter for middleware
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

  // Refresh session if needed and get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const nextUrl = encodeURIComponent(`${pathname}${search || ""}`)
    return NextResponse.redirect(new URL(`/signin?next=${nextUrl}`, req.url))
  }

  // Admin routes: verify the profile role is admin via RLS
  if (isAdminRoute) {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle()

    if (error || !profile || profile.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  return res
}

// Apply middleware to app routes only; exclude _next/static, _next/image, api, and assets
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|assets).*)",
  ],
}
