import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const devDomain = 'app.localhost:3000'
const prodDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'starter-near.vercel.app'

export function middleware(request: NextRequest) {
  const url = request.nextUrl
  const hostname = request.headers.get('host')
  const isDev = process.env.NODE_ENV === 'development'
  const appDomain = isDev ? devDomain : prodDomain
  
  // Handle app subdomain
  if (hostname?.includes(appDomain)) {
    return NextResponse.rewrite(new URL(`/app${url.pathname}`, url))
  }

  // Handle direct /app access
  if (url.pathname === '/app') {
    return NextResponse.redirect(new URL(`https://${appDomain}`))
  }

  // Handle other /app/* routes
  if (url.pathname.startsWith('/app/')) {
    return NextResponse.redirect(new URL(url.pathname.replace('/app', ''), `https://${appDomain}`))
  }
}

export const config = {
  matcher: [
    // Match all paths except static files and api
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}
