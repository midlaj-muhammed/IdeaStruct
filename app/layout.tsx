import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { UserProvider } from '@/contexts/user'
import { Header } from '@/components/shared/header'
import './trusted-types-init'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { ThemeProvider } from 'next-themes'
import { cn } from '@/lib/utils'
import { fontSans } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'IdeaStruct',
  description: 'Organize your ideas and thoughts',
}

async function getAuthUser() {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.error('Error getting user:', userError)
      return null
    }

    return user
  } catch (error) {
    console.error('Error in authentication:', error)
    return null
  }
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getAuthUser()

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <UserProvider initialSession={user ? { user } : null}>
            <div className="flex flex-col">
              <Header />
              <main className="flex-1 container mx-auto px-4 py-8">
                {children}
              </main>
            </div>
            <Toaster />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
