import { createServerClient } from '@supabase/ssr'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|public).*)'],
}

export async function middleware(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname
    console.log('Middleware processing:', pathname)

    // Create response to modify
    let response = NextResponse.next()

    // Add CSP headers except for static files and images
    const cspHeader = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://*.google.com https://play.google.com https://*.supabase.co https://github.com https://*.github.com https://api.github.com https://unpkg.com https://*.puter.com https://api.puter.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://github.githubassets.com",
      "img-src 'self' data: blob: https://*.supabase.co https://*.google.com https://accounts.google.com https://*.googleusercontent.com https://play.google.com https://*.githubusercontent.com https://github.com https://*.github.com https://avatars.githubusercontent.com",
      "font-src 'self' https://fonts.gstatic.com https://github.githubassets.com",
      "frame-src 'self' https://accounts.google.com https://*.google.com https://play.google.com https://*.supabase.co https://github.com https://*.github.com",
      "connect-src 'self' https://*.supabase.co https://accounts.google.com https://*.google.com https://play.google.com wss://*.supabase.co https://api.github.com https://github.com https://*.github.com https://api.puter.com https://*.puter.com https://unpkg.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
    ].join('; ')

    response.headers.set('Content-Security-Policy', cspHeader)

    // Create supabase client
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({
              name,
              value,
              ...options,
            })
          },
          remove(name: string, options: any) {
            response.cookies.set({
              name,
              value: '',
              ...options,
              maxAge: 0,
            })
          },
        },
      }
    )

    // Skip session check for auth callback route
    if (pathname.startsWith('/auth/callback')) {
      return response
    }

    // Refresh session if possible
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Session error:', sessionError)
      // Clear any invalid session cookies
      response.cookies.delete('sb-access-token')
      response.cookies.delete('sb-refresh-token')
    }

    // Define protected routes
    const protectedRoutes = ['/dashboard', '/profile']
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    // Handle auth state
    if (!session && isProtectedRoute) {
      // Store the original URL to redirect back after login
      const searchParams = new URLSearchParams()
      searchParams.set('next', pathname)
      return NextResponse.redirect(
        new URL(`/login?${searchParams.toString()}`, request.url)
      )
    }

    // If we have a session and we're on an auth page, redirect to dashboard
    if (session && (pathname === '/login' || pathname === '/register')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Verify the session is valid by checking the user
    const authSupabase = createMiddlewareClient({ req: request, res: response })
    const { data: { user }, error } = await authSupabase.auth.getUser()
    
    if (error) {
      console.error('Auth error in middleware:', error)
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    // On error, clear cookies and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.set({
      name: 'sb-access-token',
      value: '',
      maxAge: 0,
      path: '/',
    })
    response.cookies.set({
      name: 'sb-refresh-token',
      value: '',
      maxAge: 0,
      path: '/',
    })
    return response
  }
}
