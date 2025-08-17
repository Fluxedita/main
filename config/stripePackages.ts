export type PackageSlug = 'landing' | 'root' | 'multi' | 'premium' | 'agency' | 'lifetime'

export function getPriceIdForSlug(slug: PackageSlug): string | null {
  switch (slug) {
    case 'landing':
      // Prefer correct var, fall back to legacy misspelling if present
      return process.env.STRIPE_PRICE_LANDING || process.env.STRIPE_PRICE_LANDIMG || null
    case 'root':
      return process.env.STRIPE_PRICE_ROOT || null
    case 'multi':
      return process.env.STRIPE_PRICE_MULTI || null
    case 'premium':
      return process.env.STRIPE_PRICE_PREMIUM || null
    case 'agency':
      return process.env.STRIPE_PRICE_AGENCY || null
    case 'lifetime':
      return process.env.STRIPE_PRICE_LIFE || null
    default:
      return null
  }
}

export function getModeForSlug(slug: PackageSlug): 'payment' | 'subscription' {
  // All primary packages are now one-time purchases during launch period
  return 'payment'
}

// Access mapping: premium, agency, lifetime all grant premium access
export function getAccessSlugForSlug(slug: PackageSlug): 'landing' | 'root' | 'multi' | 'premium' {
  if (slug === 'premium' || slug === 'agency' || slug === 'lifetime') return 'premium'
  if (slug === 'landing') return 'landing'
  if (slug === 'root') return 'root'
  return 'multi'
}
