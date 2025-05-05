'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/user'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/database.types'
import type { PostgrestError } from '@supabase/supabase-js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Download, Plus, RefreshCw } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

type Idea = Database['public']['Tables']['ideas']['Row']

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
      if (!user?.id) {
        console.log('No user ID available');
        return;
      }

      const query = supabase
        .from('ideas')
        .select('*', { count: 'exact' }) as any;

      const { data, error, count } = await query
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
      <div className="container px-4 md:px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-32 bg-muted rounded animate-pulse" />
          <div className="h-10 w-24 bg-muted rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse border shadow-sm">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-10 bg-muted rounded w-full mt-4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Ideas</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your app blueprints</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={refresh}
            disabled={refreshing}
            className={refreshing ? 'animate-spin' : ''}
            title="Refresh ideas"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button asChild className="flex items-center gap-2">
            <Link href="/generate">
              <Plus className="w-4 h-4" />
              New Idea
            </Link>
          </Button>
        </div>
      </div>

      {ideas.length === 0 ? (
        <div className="max-w-md mx-auto mt-12">
          <Card className="border shadow-sm">
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>No ideas yet</CardTitle>
              <CardDescription>
                Start by generating your first app blueprint
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild className="gap-1">
                <Link href="/generate">
                  Generate Your First Blueprint
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <Card key={idea.id} className="flex flex-col border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-1">{idea.idea}</CardTitle>
                  <CardDescription className="flex items-center">
                    <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                      {idea.platform}
                    </span>
                    <span className="text-xs text-muted-foreground ml-2">
                      {new Date(idea.created_at).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-2 mb-6 flex-1">
                    {idea.target_audience && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Target Audience</p>
                        <p className="text-sm line-clamp-1">{idea.target_audience}</p>
                      </div>
                    )}
                    {idea.features && (
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-1">Key Features</p>
                        <p className="text-sm line-clamp-2">{idea.features}</p>
                      </div>
                    )}
                  </div>
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
                className="min-w-[120px]"
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
