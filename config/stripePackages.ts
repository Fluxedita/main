export type PackageSlug = 'landing' | 'root' | 'multi' | 'premium' | 'agency' | 'lifetime'

export function getPriceIdForSlug(slug: PackageSlug): string | null {
  switch (slug) {
    case 'landing':
      return process.env.STRIPE_PRICE_LANDIMG || null // note: env var name as provided
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
  return slug === 'lifetime' ? 'payment' : 'subscription'
}

// Access mapping: premium, agency, lifetime all grant premium access
export function getAccessSlugForSlug(slug: PackageSlug): 'landing' | 'root' | 'multi' | 'premium' {
  if (slug === 'premium' || slug === 'agency' || slug === 'lifetime') return 'premium'
  if (slug === 'landing') return 'landing'
  if (slug === 'root') return 'root'
  return 'multi'
}
