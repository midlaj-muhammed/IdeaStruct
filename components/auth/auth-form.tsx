'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Github } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

// PKCE helper functions
function generateCodeVerifier() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode.apply(null, Array.from(array)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

async function generateCodeChallenge(verifier: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(verifier)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

interface AuthFormProps {
  mode: 'login' | 'register'
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [provider, setProvider] = useState<'github' | 'google' | 'email' | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setProvider('email')
    
    try {
      let error
      if (mode === 'register') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (signUpError) {
          error = signUpError
        } else if (!data?.user?.identities?.length) {
          error = new Error('Email already registered')
        } else if (!data?.user?.confirmed_at) {
          // Show a more detailed message about email verification
          toast({
            title: 'Verification Email Sent',
            description: 'Please check your email (including spam folder) for the verification link.',
          })
          return
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        error = signInError
      }

      if (error) throw error

      if (mode === 'register') {
        toast({
          title: "Success",
          description: "Please check your email to verify your account",
        })
      } else {
        // After successful login, check session and redirect
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.push('/dashboard')
          router.refresh() // Refresh to update auth state
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Authentication failed",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setProvider(null)
    }
  }

  const handleOAuthLogin = async (authProvider: 'github' | 'google') => {
    setIsLoading(true)
    setProvider(authProvider)
    try {
      // Get the current URL for the redirect
      const redirectTo = typeof window !== 'undefined'
        ? `${window.location.origin}/auth/callback`
        : process.env.NEXT_PUBLIC_VERCEL_URL 
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/auth/callback`
          : 'http://localhost:3000/auth/callback'

      // Get current path to redirect back after auth
      const currentPath = typeof window !== 'undefined' 
        ? window.location.pathname
        : '/dashboard'

      console.log(`Initiating ${authProvider} OAuth login...`, {
        mode,
        redirectTo,
        currentPath
      })
      
      // Generate code verifier and challenge
      const codeVerifier = generateCodeVerifier()
      const codeChallenge = await generateCodeChallenge(codeVerifier)

      // Store code verifier in cookie - use httpOnly and secure flags
      document.cookie = `codeVerifier=${codeVerifier}; path=/; max-age=300; secure; samesite=lax; httpOnly`

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: authProvider,
        options: {
          redirectTo: `${redirectTo}?next=${encodeURIComponent(currentPath)}`,
          skipBrowserRedirect: true, // We'll handle the redirect manually
          flowType: 'pkce',
          codeChallenge,
          codeChallengeMethod: 'S256',
          queryParams: authProvider === 'google' ? {
            access_type: 'offline',
            prompt: 'consent',
          } : undefined
        }
      })

      if (error) {
        console.error(`${authProvider} OAuth error:`, {
          error,
          message: error.message,
          provider: authProvider,
          mode
        })
        throw error
      }

      if (!data.url) {
        console.error(`${authProvider} OAuth failed: No redirect URL returned`, {
          data,
          provider: authProvider,
          mode
        })
        throw new Error('Authentication failed - no redirect URL')
      }

      console.log(`${authProvider} OAuth successful, redirecting to:`, data.url)
      // Use the default Trusted Types policy to validate the URL
      if (window.trustedTypes) {
        const policy = window.trustedTypes.defaultPolicy
        if (policy) {
          const trustedUrl = policy.createScriptURL(data.url)
          window.location.href = trustedUrl.toString()
          return
        }
      }
      
      // Fallback if Trusted Types is not available
      window.location.href = data.url
    } catch (error) {
      console.error(`${authProvider} OAuth error:`, {
        error,
        message: error instanceof Error ? error.message : 'Unknown error',
        provider: authProvider,
        mode
      })
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error.message : `Failed to authenticate with ${authProvider}`,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setProvider(null)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleEmailAuth} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        {mode === 'register' && (
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
            />
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && provider === 'email'
            ? mode === 'login' 
              ? "Signing in..." 
              : "Creating account..."
            : mode === 'login'
              ? "Sign in"
              : "Create account"
          }
        </Button>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid gap-4">
        <Button 
          type="button"
          variant="outline" 
          className="flex items-center justify-center gap-2"
          onClick={() => handleOAuthLogin('github')}
          disabled={isLoading}
        >
          <Github className="w-5 h-5" />
          {isLoading && provider === 'github' 
            ? mode === 'login' 
              ? "Signing in..." 
              : "Creating account..."
            : mode === 'login'
              ? "Sign in with GitHub"
              : "Sign up with GitHub"
          }
        </Button>
        <Button 
          type="button"
          variant="outline"
          className="flex items-center justify-center gap-2"
          onClick={() => handleOAuthLogin('google')}
          disabled={isLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {isLoading && provider === 'google'
            ? mode === 'login'
              ? "Signing in..."
              : "Creating account..."
            : mode === 'login'
              ? "Sign in with Google"
              : "Sign up with Google"
          }
        </Button>
      </div>
    </div>
  )
}
