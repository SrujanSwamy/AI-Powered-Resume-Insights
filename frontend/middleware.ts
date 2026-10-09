import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session_access_token')
  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /login
     * 2. /logout
     * 3. /signin
     * 4. /signup
     * 5. /reset-password
     * 6. / (home)
     * 7. /_next (Next.js internals)
     * 8. /static (static files)
     * 9. /api (API routes)
     * 10. public files like favicon.ico, robots.txt
     */
    '/((?!login|logout|signin|signup|reset-password|api|_next|static|favicon.ico|robots.txt|$).*)',
  ],
}