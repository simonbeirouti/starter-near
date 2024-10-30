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
  
  // Handle app subdomain with improved logic
  if (subdomain === 'app' || hostname?.includes(appDomain)) {
    return NextResponse.rewrite(new URL(`/app${url.pathname}`, request.url))
  }

  // Handle direct /app access
  if (url.pathname === '/app') {
    return NextResponse.redirect(new URL(`https://${appDomain}`))
  }

  // Handle other /app/* routes
  if (url.pathname.startsWith('/app/')) {
    return NextResponse.redirect(new URL(url.pathname.replace('/app', ''), `https://${appDomain}`))
  }

  // Modified subdomain handling
  if (subdomain && subdomain !== 'www' && !hostname?.includes(appDomain)) {
    return NextResponse.rewrite(new URL('/404', request.url))
  }

  // Add a default case to handle the main domain
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except specific ones
    '/((?!api|_next|images|.*\\.(?:jpg|jpeg|gif|png|svg|ico)$).*)'
  ]
}
