import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthPage =
    request.nextUrl.pathname.startsWith('/auth')

  const protectedRoutes = ['/dashboard', '/transactions', '/recurring-bills'];
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))

  // 🚫 Not logged in → trying to access protected route
  if (!user && isProtectedRoute) {
    return NextResponse.redirect(
      new URL('/auth/login', request.url)
    )
  }

  // 🔁 Logged in → trying to access login/signup
  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    )
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/transactions/:path*',
    '/recurring-bills/:path*',
    '/auth/:path*',
  ],
}
