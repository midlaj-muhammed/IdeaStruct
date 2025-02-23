import { supabase } from './supabase'
import { User } from '@supabase/supabase-js'

export type AuthError = {
  message: string
  status?: number
}

export async function signInWithGitHub(): Promise<{ user: User | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } }
    }

    // For OAuth, we don't get the user immediately as it redirects
    return { user: null, error: null }
  } catch (err) {
    return { user: null, error: { message: 'An unexpected error occurred during GitHub authentication' } }
  }
}

export async function signIn(email: string, password: string): Promise<{ user: User | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } }
    }

    return { user: data.user, error: null }
  } catch (err) {
    return { user: null, error: { message: 'An unexpected error occurred' } }
  }
}

export async function signUp(email: string, password: string, name: string): Promise<{ user: User | null; error: AuthError | null }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } }
    }

    return { user: data.user, error: null }
  } catch (err) {
    return { user: null, error: { message: 'An unexpected error occurred' } }
  }
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return { error: { message: error.message, status: error.status } }
    }
    return { error: null }
  } catch (err) {
    return { error: { message: 'An unexpected error occurred' } }
  }
}

export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      return { error: { message: error.message, status: error.status } }
    }

    return { error: null }
  } catch (err) {
    return { error: { message: 'An unexpected error occurred' } }
  }
}

export async function updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return { error: { message: error.message, status: error.status } }
    }

    return { error: null }
  } catch (err) {
    return { error: { message: 'An unexpected error occurred' } }
  }
}

export async function getCurrentUser(): Promise<{ user: User | null; error: AuthError | null }> {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error) {
      return { user: null, error: { message: error.message, status: error.status } }
    }

    return { user, error: null }
  } catch (err) {
    return { user: null, error: { message: 'An unexpected error occurred' } }
  }
}
