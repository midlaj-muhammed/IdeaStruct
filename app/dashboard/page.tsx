'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/user'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Download, Plus, RefreshCw } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface Idea {
  id: string
  created_at: string
  idea: string
  platform: string
  target_audience?: string
  features?: string
  blueprint: string
}

const PAGE_SIZE = 6

export default function DashboardPage() {
  const { user } = useUser()
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Cache key for localStorage
  const CACHE_KEY = `ideas_cache_${user?.id}`
  const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes in milliseconds

  const fetchFromSupabase = async (start: number, replace: boolean, background = false) => {
    try {
      if (!user?.id) {
        console.log('No user ID available for fetching ideas');
        return;
      }

      console.log('Fetching ideas for user:', user.id, 'from index:', start);

      // First, check if we can access the ideas table at all
      const { data: tableCheck, error: tableError } = await supabase
        .from('ideas')
        .select('id', { count: 'exact', head: true });

      if (tableError) {
        console.error('Error accessing ideas table:', tableError);
        throw new Error(`Database access error: ${tableError.message}`);
      }

      console.log('Table access check passed');

      // Now try to get the actual ideas
      const { data, error, count } = await supabase
        .from('ideas')
        .select(`
          id,
          created_at,
          idea,
          platform,
          target_audience,
          features,
          blueprint,
          user_id
        `, { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(start, start + PAGE_SIZE - 1);

      console.log('Query results:', {
        userId: user.id,
        dataCount: data?.length,
        totalCount: count,
        error: error
      });

      if (error) {
        console.error('Error fetching ideas:', error);
        toast({
          title: 'Error',
          description: `Failed to fetch ideas: ${error.message}`,
          variant: 'destructive',
        });
        return;
      }

      if (!background) {
        if (replace) {
          console.log('Setting ideas:', data);
          setIdeas(data || []);
        } else {
          console.log('Appending ideas:', data);
          setIdeas(prev => [...prev, ...(data || [])]);
        }

        setHasMore(count ? start + PAGE_SIZE < count : false);
        setLoading(false);
      }

      // Update cache if this is a full refresh
      if (start === 0 && replace && data) {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: data,
          timestamp: Date.now()
        }));
      }

      return { data, count };
    } catch (error) {
      console.error('Error in fetchFromSupabase:', error);
      setLoading(false);
      throw error;
    }
  }

  const fetchIdeas = async (start = 0, replace = true) => {
    try {
      if (!user) {
        console.log('No user available for fetching ideas');
        return;
      }

      // Try to get cached data first if we're loading the initial set
      if (start === 0 && replace) {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const { data, timestamp } = JSON.parse(cached);
            const age = Date.now() - timestamp;
            if (age < CACHE_DURATION) {
              console.log('Using cached ideas:', data);
              setIdeas(data);
              setLoading(false);
              // Fetch fresh data in background
              fetchFromSupabase(0, true, true);
              return;
            }
          } catch (e) {
            console.error('Error parsing cached data:', e);
            localStorage.removeItem(CACHE_KEY);
          }
        }
      }

      const result = await fetchFromSupabase(start, replace);
      console.log('Fetch completed:', result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ideas:', error);
      toast({
        title: 'Error',
        description: 'Failed to load ideas. Please try again.',
        variant: 'destructive',
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log('Dashboard mounted, user:', user);
    if (user) {
      console.log('Initiating idea fetch for user:', user.id);
      // Clear cache on mount to ensure fresh data
      localStorage.removeItem(CACHE_KEY);
      fetchIdeas(0, true);
    } else {
      console.log('No user available, setting loading to false');
      setLoading(false);
    }
  }, [user]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    await fetchIdeas(ideas.length, false)
    setLoadingMore(false)
  }

  const refresh = async () => {
    if (refreshing) return;
    setRefreshing(true);
    try {
      console.log('Refreshing ideas for user:', user?.id);
      localStorage.removeItem(CACHE_KEY);
      await fetchIdeas(0, true);
    } catch (error) {
      console.error('Error refreshing ideas:', error);
      toast({
        title: 'Error',
        description: 'Failed to refresh ideas. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setRefreshing(false);
    }
  }

  const downloadBlueprint = (idea: Idea) => {
    try {
      const blob = new Blob([idea.blueprint], { type: 'text/markdown' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${idea.idea.toLowerCase().replace(/[^a-z0-9]+/g, '_')}_blueprint.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading blueprint:', error)
      toast({
        title: 'Error',
        description: 'Failed to download blueprint. Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-10 bg-gray-200 rounded w-full mt-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">My Ideas</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={refresh}
            disabled={refreshing}
            className={refreshing ? 'animate-spin' : ''}
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <Link href="/generate">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Idea
          </Button>
        </Link>
      </div>

      {ideas.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No ideas yet</CardTitle>
            <CardDescription>
              Start by generating your first app blueprint
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/generate">
              <Button className="w-full">Generate Your First Blueprint</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <Card key={idea.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">{idea.idea}</CardTitle>
                  <CardDescription>Platform: {idea.platform}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  {idea.target_audience && (
                    <p className="text-sm mb-2">
                      <strong>Target Audience:</strong> {idea.target_audience}
                    </p>
                  )}
                  {idea.features && (
                    <p className="text-sm mb-4">
                      <strong>Key Features:</strong> {idea.features}
                    </p>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full mt-auto flex items-center gap-2"
                    onClick={() => downloadBlueprint(idea)}
                  >
                    <Download className="w-4 h-4" />
                    Download Blueprint
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          {hasMore && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={loadMore}
                disabled={loadingMore}
              >
                {loadingMore ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
