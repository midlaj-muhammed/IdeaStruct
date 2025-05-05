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
  const [blueprint, setBlueprint] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [blueprintStats, setBlueprintStats] = useState<{
    wordCount: number;
    sectionCount: number;
    codeBlockCount: number;
  }>({
    wordCount: 0,
    sectionCount: 0,
    codeBlockCount: 0
  })

  useEffect(() => {
    setIsClient(true)
    // Check if blueprint exists
    const storedBlueprint = localStorage.getItem('blueprint')
    if (!storedBlueprint) {
      router.push('/generate')
    } else {
      setBlueprint(storedBlueprint)

      // Calculate blueprint stats
      const wordCount = storedBlueprint.split(/\s+/).length;
      const sectionCount = (storedBlueprint.match(/^##\s+/gm) || []).length;
      const codeBlockCount = (storedBlueprint.match(/```/g) || []).length / 2;

      setBlueprintStats({
        wordCount,
        sectionCount,
        codeBlockCount
      });

      setIsLoading(false)
    }
  }, [router])

  const handleDownload = () => {
    const storedBlueprint = localStorage.getItem('blueprint')
    const fileName = localStorage.getItem('fileName') || 'app_blueprint.md'

    if (!storedBlueprint) {
      toast({
        title: "Error",
        description: "Blueprint not found. Please generate a new one.",
        variant: "destructive",
      })
      router.push('/generate')
      return
    }

    // Create and download the file
    const blob = new Blob([storedBlueprint], { type: 'text/markdown' })
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
    setBlueprint(storedBlueprint) // Keep the blueprint in state even after clearing localStorage

    toast({
      title: "Downloaded!",
      description: "Your blueprint has been downloaded successfully",
    })
  }

  if (!isClient) return null

  return (
    <main className="flex min-h-screen flex-col items-center py-12">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Advanced Blueprint Ready!
            </h1>
            <p className="text-xl text-muted-foreground">
              Your detailed app blueprint has been generated with Google Gemini AI
            </p>

            {!isLoading && (
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <div className="bg-muted/50 rounded-lg px-4 py-2 text-center">
                  <div className="text-2xl font-bold">{blueprintStats.wordCount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Words</div>
                </div>
                <div className="bg-muted/50 rounded-lg px-4 py-2 text-center">
                  <div className="text-2xl font-bold">{blueprintStats.sectionCount}</div>
                  <div className="text-xs text-muted-foreground">Sections</div>
                </div>
                <div className="bg-muted/50 rounded-lg px-4 py-2 text-center">
                  <div className="text-2xl font-bold">{blueprintStats.codeBlockCount}</div>
                  <div className="text-xs text-muted-foreground">Code Blocks</div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mb-8">
            {!hasDownloaded ? (
              <Button
                size="lg"
                onClick={handleDownload}
                className="gap-2"
                disabled={isLoading}
              >
                <FileDown className="w-5 h-5" />
                Download Blueprint
              </Button>
            ) : (
              <Button variant="outline" size="lg" asChild>
                <Link href="/generate">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Generate Another
                </Link>
              </Button>
            )}

            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                navigator.clipboard.writeText(blueprint);
                toast({
                  title: "Copied to clipboard",
                  description: "Blueprint has been copied to your clipboard",
                });
              }}
              disabled={isLoading}
            >
              Copy to Clipboard
            </Button>
          </div>

          {/* Blueprint Preview */}
          <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 bg-muted/50 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
              <div>
                <h2 className="font-semibold">Advanced Blueprint Preview</h2>
                <p className="text-xs text-muted-foreground">Generated with Google Gemini AI</p>
              </div>
              {!isLoading && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      // Find all headings and create a table of contents
                      const headings = blueprint.match(/^#+\s+.+$/gm) || [];
                      const toc = headings.map(h => {
                        const level = (h.match(/^#+/) || [''])[0].length;
                        const text = h.replace(/^#+\s+/, '');
                        return `${' '.repeat((level-1)*2)}- ${text}`;
                      }).join('\n');

                      navigator.clipboard.writeText(toc);
                      toast({
                        title: "Table of Contents Copied",
                        description: "Blueprint table of contents has been copied to your clipboard",
                      });
                    }}
                  >
                    Copy TOC
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const element = document.getElementById('blueprint-content');
                      if (element) {
                        element.classList.toggle('max-h-[600px]');
                        element.classList.toggle('max-h-full');
                      }
                    }}
                  >
                    Expand/Collapse
                  </Button>
                </div>
              )}
            </div>
            <div id="blueprint-content" className="p-6 max-h-[600px] overflow-auto transition-all duration-300">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                  <h3 className="text-lg font-medium mb-2">Processing Your Blueprint</h3>
                  <p className="text-muted-foreground max-w-md">
                    We're preparing your detailed blueprint. This may take a moment as we generate comprehensive technical specifications and implementation details.
                  </p>
                </div>
              ) : (
                <div className="prose prose-sm prose-slate dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-sm">
                    {blueprint}
                  </pre>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/dashboard">
                View All Blueprints
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
