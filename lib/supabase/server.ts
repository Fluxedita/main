import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function getSupabaseServerClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL/Anon key missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      async get(name: string) {
        const store = await cookies();
        return store.get(name)?.value;
      },
      async set(name: string, value: string, options: any) {
        try {
          const store = await cookies();
          store.set({ name, value, ...options });
        } catch {}
      },
      async remove(name: string, options: any) {
        try {
          const store = await cookies();
          // Clearing by setting empty value; adapter will handle expires if provided
          store.set({ name, value: "", ...options });
        } catch {}
      },
    },
  });
}
