// Maps package slug -> Supabase Storage bucket name
// Buckets are private and created in Supabase: pkg-landing, pkg-root, pkg-multi, pkg-premium
export const PACKAGE_BUCKETS: Record<string, string> = {
  landing: "pkg-landing",
  root: "pkg-root",
  multi: "pkg-multi",
  premium: "pkg-premium",
};

export function getBucketForSlug(slug: string): string | undefined {
  return PACKAGE_BUCKETS[slug as keyof typeof PACKAGE_BUCKETS];
}
