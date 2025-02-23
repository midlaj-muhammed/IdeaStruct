'use client'

import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Ensure environment variables are available and fallback gracefully
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'sb-oicpljilposaqgiurura-auth-token',
    debug: process.env.NODE_ENV === 'development',
    cookieOptions: {
      name: 'sb-oicpljilposaqgiurura-auth-token',
      lifetime: 60 * 60 * 24 * 7, // 1 week
      domain: typeof window !== 'undefined' ? window.location.hostname : undefined,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production'
    }
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-client-info': 'ideastruct@1.0.0'
    }
  }
})
