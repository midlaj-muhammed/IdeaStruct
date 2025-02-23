'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/user'
import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type Profile = Database['public']['Tables']['users']['Row']

export function useProfile() {
  const { user } = useUser()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setProfile(data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('users')
        .upsert({
          id: user.id,
          email: user.email!,
          ...updates,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      // Refresh profile
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      setProfile(data)
      return { success: true }
    } catch (error) {
      console.error('Error updating profile:', error)
      return { success: false, error }
    }
  }

  return {
    profile,
    loading,
    updateProfile,
  }
}
