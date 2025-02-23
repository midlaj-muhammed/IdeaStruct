'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

let supabaseInstance: SupabaseClient<Database> | null = null

export const createBrowserSupabaseClient = () => {
  if (!supabaseInstance && typeof window !== 'undefined') {
    supabaseInstance = createBrowserClient<Database>(
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
