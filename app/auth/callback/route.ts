import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const error = requestUrl.searchParams.get('error')
    const error_description = requestUrl.searchParams.get('error_description')
    const origin = requestUrl.origin

    // Handle OAuth error response
    if (error) {
      console.error('OAuth error:', error, error_description)
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(error_description || error)}`
      )
    }

    if (!code) {
      console.error('No code provided in callback')
      return NextResponse.redirect(`${origin}/login?error=No authorization code provided`)
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: { path?: string }) {
            cookieStore.set(name, value, { ...options })
          },
          remove(name: string, options: { path?: string }) {
            cookieStore.delete({ name, path: options?.path })
          },
        },
      }
    )

    const { error: sessionError } = await supabase.auth.exchangeCodeForSession(code)
    if (sessionError) {
      console.error('Error exchanging code for session:', sessionError)
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(sessionError.message)}`
      )
    }

    return NextResponse.redirect(`${origin}/dashboard`)
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent('An unexpected error occurred')}`
    )
  }
}
