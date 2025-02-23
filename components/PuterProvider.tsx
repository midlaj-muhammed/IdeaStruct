'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { useToast } from './ui/use-toast'

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (prompt: string, options: { model: string }) => Promise<{
          message: {
            content: Array<{
              text: string
            }>
          }
        }>
      }
    }
  }
}

export default function PuterProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast()
  const [isScriptLoaded, setIsScriptLoaded] = useState(false)

  useEffect(() => {
    // Only check if script is marked as loaded
    if (isScriptLoaded) {
      const timer = setTimeout(() => {
        if (!window.puter?.ai) {
          toast({
            title: 'Warning',
            description: 'AI service is not available. Please try refreshing the page.',
            variant: 'destructive',
          })
        }
      }, 1000) // Reduced timeout for faster feedback

      return () => clearTimeout(timer)
    }
  }, [isScriptLoaded, toast])

  return (
    <>
      <Script
        src="https://unpkg.com/@puter/js@latest/dist/index.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('Puter.js loaded')
          setIsScriptLoaded(true)
        }}
        onError={() => {
          console.error('Failed to load Puter.js')
          toast({
            title: 'Error',
            description: 'Failed to load AI service. Please try refreshing the page.',
            variant: 'destructive',
          })
        }}
      />
      {children}
    </>
  )
}
