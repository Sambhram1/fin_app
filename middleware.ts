import { NextResponse, type NextRequest } from 'next/server'

// NOTE:
// The previous implementation imported the Supabase server helper which relies
// on Node.js APIs. That caused build-time warnings and failures when running
// in the Edge runtime (used by Next.js middleware). To be compatible with the
// Edge runtime we keep this middleware minimal and avoid importing
// Node-only libraries here.

export function middleware(_request: NextRequest) {
  // We intentionally return the request unchanged. Session handling and
  // Supabase server-side logic should run in server components or API
  // routes (Node runtime) where Node APIs are available.
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all request paths except static assets and image optimization
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
