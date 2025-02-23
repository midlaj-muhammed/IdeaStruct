'use client'

import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

let supabaseInstance: ReturnType<typeof createBrowserClient> | null = null

export const createBrowserSupabaseClient = () => {
  if (!supabaseInstance && typeof window !== 'undefined') {
    supabaseInstance = createBrowserClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          flowType: 'pkce',
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true,
        }
      }
    )
  }
  return supabaseInstance!
}

// Export a singleton instance
export const supabase = createBrowserSupabaseClient()
