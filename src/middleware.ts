import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const devDomain = 'app.localhost:3000'
const prodDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'starter-near.vercel.app'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')
  const isDev = process.env.NODE_ENV === 'development'
  const appDomain = isDev ? devDomain : prodDomain
  
  // Extract subdomain more reliably
  const subdomain = hostname?.split('.')[0]
  
  // Only handle app subdomain cases
  if (subdomain === 'app' || hostname?.includes(appDomain)) {
    return NextResponse.rewrite(new URL(`/app${url.pathname}`, request.url))
  }

  // For all other cases (including main domain), just continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except specific ones
    '/((?!api|_next|images|.*\\.(?:jpg|jpeg|gif|png|svg|ico)$).*)'
  ]
}
