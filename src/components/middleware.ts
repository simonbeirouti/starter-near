import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')
  
  // Handle app.localhost subdomain
  if (hostname?.includes('app.localhost')) {
    return NextResponse.rewrite(new URL(`/app${url.pathname}`, url))
  }

  // Handle direct /app access
  if (url.pathname === '/app') {
    return NextResponse.redirect(new URL('http://app.localhost:3000'))
  }

  // Handle other /app/* routes
  if (url.pathname.startsWith('/app/')) {
    return NextResponse.redirect(new URL(url.pathname.replace('/app', ''), 'http://app.localhost:3000'))
  }
}

export const config = {
  matcher: [
    // Match all paths except static files and api
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
