'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileDown, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export default function SuccessPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)
  const [hasDownloaded, setHasDownloaded] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check if blueprint exists
    const blueprint = localStorage.getItem('blueprint')
    if (!blueprint) {
      router.push('/generate')
    }
  }, [router])

  const handleDownload = () => {
    const blueprint = localStorage.getItem('blueprint')
    const fileName = localStorage.getItem('fileName') || 'app_blueprint.md'

    if (!blueprint) {
      toast({
        title: "Error",
        description: "Blueprint not found. Please generate a new one.",
        variant: "destructive",
      })
      router.push('/generate')
      return
    }

    // Create and download the file
    const blob = new Blob([blueprint], { type: 'text/markdown' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    // Clear localStorage after download
    localStorage.removeItem('blueprint')
    localStorage.removeItem('fileName')
    setHasDownloaded(true)

    toast({
      title: "Downloaded!",
      description: "Your blueprint has been downloaded successfully",
    })
  }

  if (!isClient) return null

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-md mx-auto px-4 text-center space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl animate-fade-in">
          Blueprint Ready!
        </h1>

        <div className="flex flex-col items-center gap-4">
          {!hasDownloaded ? (
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <Button
                size="lg"
                onClick={handleDownload}
                className="relative bg-black hover:bg-gray-800 text-white h-14 px-8 text-lg gap-2 group"
              >
                <FileDown className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                Download Blueprint
              </Button>
            </div>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/generate">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Generate Another
              </Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  )
}
