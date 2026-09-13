import { type NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'
import { updateSession } from './lib/supabase/proxy'

const handleI18nRouting = createMiddleware(routing)

const protectedRoutes = ['/dashboard', '/clients', '/projects', '/tasks']

function copyCookies(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie)
  })

  return to
}

export async function proxy(request: NextRequest) {
  const i18nResponse = handleI18nRouting(request)

  const { response, isAuthenticated } = await updateSession(request, i18nResponse)

  const segments = request.nextUrl.pathname.split('/').filter(Boolean)

  const locale = routing.locales.includes(segments[0] as (typeof routing.locales)[number])
    ? segments[0]
    : null

  if (!locale) {
    return response
  }

  const pathname = `/${segments.slice(1).join('/')}`

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  )

  if (isProtectedRoute && !isAuthenticated) {
    const url = request.nextUrl.clone()

    url.pathname = `/${locale}/login`

    return copyCookies(response, NextResponse.redirect(url))
  }

  if (pathname === '/login' && isAuthenticated) {
    const url = request.nextUrl.clone()

    url.pathname = `/${locale}/dashboard`

    return copyCookies(response, NextResponse.redirect(url))
  }

  return response
}

export const config = {
  matcher: ['/((?!api|internal|_next|.*\\..*).*)'],
}
