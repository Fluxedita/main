import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({})) as { event?: string; props?: Record<string, any> }
    // Basic validation and no-op sink for now
    const event = typeof body.event === 'string' ? body.event : 'unknown_event'
    const props = (body && typeof body.props === 'object') ? body.props : {}

    // You can forward to PostHog/Segment/etc. here. For now, no-op.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.log(`[analytics]`, { event, props })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 })
  }
}
