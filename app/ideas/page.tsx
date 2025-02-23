'use client'

import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'
import type { Idea } from '@/types/idea'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { DeleteIdea } from '@/components/DeleteIdea'
import { IdeasFilter } from '@/components/IdeasFilter'
import { useEffect, useState } from 'react'

function IdeasGrid({ ideas }: { ideas: Idea[] }) {
  return ideas.length === 0 ? (
    <div className="text-center py-12">
      <h3 className="text-lg font-semibold mb-4">No ideas found</h3>
      <p className="text-gray-600 mb-8">
        {ideas.length === 0 ? 'Start by generating a blueprint and saving your idea' : 'Try adjusting your filters'}
      </p>
      <Button asChild>
        <Link href="/generate">Create New Blueprint</Link>
      </Button>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-start justify-between mb-4">
            <Badge variant="outline" className="capitalize">
              {idea.platform}
            </Badge>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-gray-500">
                {format(new Date(idea.created_at), 'MMM d, yyyy')}
              </div>
              <DeleteIdea 
                id={idea.id} 
                onDelete={() => {
                  // Force a page refresh to show updated list
                  window.location.reload()
                }} 
              />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {idea.idea}
            </h3>
            {idea.target_audience && (
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-medium">Target Audience:</span> {idea.target_audience}
              </p>
            )}
          </div>

          {idea.features && (
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Key Features:</h4>
              <p className="text-sm text-gray-600 line-clamp-3">
                {idea.features}
              </p>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="text-sm"
            >
              <Link href={`/api/generate?id=${idea.id}`}>
                Regenerate Blueprint
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [filteredIdeas, setFilteredIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIdeas() {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .order('created_at', { ascending: false })
        .returns<Database['public']['Tables']['ideas']['Row'][]>()

      if (error) {
        console.error('Error fetching ideas:', error)
        return
      }

      if (data) {
        setIdeas(data)
        setFilteredIdeas(data)
      }
      setLoading(false)
    }

    fetchIdeas()
  }, [])

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Your Ideas
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse and manage your saved app ideas
            </p>
          </div>

          {/* Ideas Grid */}
          <div className="relative">
            {/* Floating Icons Background */}
            <div className="absolute inset-0 w-full h-full -z-10">
              <div className="floating-icons">
                <div className="floating-icon" style={{ top: '5%', left: '10%' }}>
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl" />
                </div>
                <div className="floating-icon" style={{ top: '50%', right: '5%' }}>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl" />
                </div>
                <div className="floating-icon" style={{ bottom: '10%', left: '30%' }}>
                  <div className="w-20 h-20 bg-orange-500/20 rounded-2xl" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading ideas...</p>
              </div>
            ) : (
              <>
                <IdeasFilter ideas={ideas} onFilterChange={setFilteredIdeas} />
                <IdeasGrid ideas={filteredIdeas} />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
