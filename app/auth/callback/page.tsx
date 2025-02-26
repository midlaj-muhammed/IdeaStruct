'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase-browser'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Get the intended destination from the URL
    const next = searchParams?.get('next') || '/dashboard'
    
    // Check if we have a session
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error checking session:', error)
        router.push('/auth/login')
        return
      }

      if (session) {
        // If we have a session, redirect to the intended destination
        router.push(next)
      } else {
        // If no session, redirect to login
        router.push('/auth/login')
      }
    }

    checkSession()
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Completing authentication...</h2>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  )
}
