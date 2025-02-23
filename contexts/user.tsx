'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-browser'
import { toast } from '@/components/ui/use-toast'

export interface UserProfile {
  id: string
  email: string
  name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type UserContextType = {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  refreshProfile: () => Promise<void>
  signOut: () => Promise<void>
  signInWithGithub: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithEmail: (email: string, password: string) => Promise<void>
  signUpWithEmail: (email: string, password: string) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
  children: React.ReactNode
  initialSession: { user: User } | null
}

export function UserProvider({ children, initialSession }: Props) {
  const [user, setUser] = useState<User | null>(initialSession?.user || null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState<boolean>(!initialSession)
  const router = useRouter()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get the current authenticated user
        const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser()
        
        if (userError) {
          console.error('Error getting user:', userError)
          setUser(null)
          setProfile(null)
          return
        }

        setUser(currentUser)

        if (currentUser) {
          const { data: profileData, error: profileError } = await supabase
            .from('users')
            .select('*')
            .eq('id', currentUser.id)
            .single()

          if (profileError) {
            console.error('Error getting profile:', profileError)
            setProfile(null)
          } else {
            setProfile(profileData)
          }
        } else {
          setProfile(null)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setUser(null)
        setProfile(null)
      } finally {
        setLoading(false)
      }
    }

    // Initialize auth state
    initializeAuth()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user)
      
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null)
        // Clear any cached data when user signs in
        if (session?.user) {
          localStorage.removeItem(`ideas_cache_${session.user.id}`)
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        // Clear all cached data on sign out
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('ideas_cache_')) {
            localStorage.removeItem(key)
          }
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const refreshProfile = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error refreshing profile:', error)
        return
      }

      setProfile(data)
    } catch (error) {
      console.error('Error refreshing profile:', error)
    }
  }

  const value = {
    user,
    profile,
    loading,
    refreshProfile,
    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        router.push('/')
      } catch (error) {
        console.error('Error signing out:', error)
        toast({
          title: "Error signing out",
          description: "Please try again",
          variant: "destructive",
        })
      }
    },
    signInWithGithub: async () => {
      try {
        const redirectTo = typeof window !== 'undefined' 
          ? `${window.location.origin}/auth/callback`
          : process.env.NEXT_PUBLIC_SITE_URL 
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
            : undefined;

        if (!redirectTo) {
          throw new Error('Site URL not configured')
        }

        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'github',
          options: {
            redirectTo
          }
        })
        if (error) throw error
      } catch (error) {
        console.error('Error signing in with Github:', error)
        toast({
          title: "Error signing in",
          description: error instanceof Error ? error.message : "Please try again",
          variant: "destructive",
        })
      }
    },
    signInWithGoogle: async () => {
      try {
        const redirectTo = typeof window !== 'undefined' 
          ? `${window.location.origin}/auth/callback`
          : process.env.NEXT_PUBLIC_SITE_URL 
            ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
            : undefined;

        if (!redirectTo) {
          throw new Error('Site URL not configured')
        }

        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent'
            }
          }
        })
        if (error) throw error
      } catch (error) {
        console.error('Error signing in with Google:', error)
        toast({
          title: "Error signing in",
          description: error instanceof Error ? error.message : "Please try again",
          variant: "destructive",
        })
      }
    },
    signInWithEmail: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } catch (error) {
        console.error('Error signing in:', error)
        toast({
          title: "Error signing in",
          description: "Please check your credentials and try again",
          variant: "destructive",
        })
      }
    },
    signUpWithEmail: async (email: string, password: string) => {
      try {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        toast({
          title: "Success",
          description: "Please check your email to confirm your account",
        })
      } catch (error) {
        console.error('Error signing up:', error)
        toast({
          title: "Error signing up",
          description: "Please try again",
          variant: "destructive",
        })
      }
    },
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
