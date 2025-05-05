'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase'

export default function IdeaForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveIdea, setSaveIdea] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setIsAuthenticated(!!session)
  }

  const generateBlueprint = async (prompt: string) => {
    // Use our Gemini API integration
    console.log('Generating blueprint with prompt:', prompt);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      });

      // Even if response is not ok, we'll try to parse the JSON
      const data = await response.json();

      if (!response.ok) {
        console.error('API error:', data.error);
        throw new Error(data.error || 'Failed to generate blueprint');
      }

      if (!data.content) {
        throw new Error('No content received from API');
      }

      return data.content;
    } catch (error) {
      console.error('Error in generateBlueprint:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const idea = formData.get('idea')?.toString() || '';
      const platform = formData.get('platform')?.toString() || '';
      const target = formData.get('target')?.toString() || '';
      const features = formData.get('features')?.toString() || '';

      if (!idea) {
        throw new Error('Please provide an idea');
      }

      // Construct a comprehensive prompt
      const prompt = `
App Idea: ${idea}
${platform ? `Target Platform: ${platform}` : ''}
${target ? `Target Audience: ${target}` : ''}
${features ? `Required Features:\n${features.split(',').map(f => `- ${f.trim()}`).join('\n')}` : ''}
`;

      const blueprint = await generateBlueprint(prompt);

      // Save blueprint to localStorage for the success page
      localStorage.setItem('blueprint', blueprint);
      localStorage.setItem('fileName', `${idea.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 50)}_blueprint.md`);

      // Only try to save to database if user wants to and is authenticated
      if (saveIdea && isAuthenticated) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (!session) {
            console.error('No session found while trying to save idea');
            toast({
              title: "Authentication Error",
              description: "Please log in to save ideas",
              variant: "destructive",
            });
            router.push('/login');
            return;
          }

          console.log('Starting idea save process:', {
            userId: session.user.id,
            ideaTitle: idea,
            hasBlueprint: !!blueprint
          });

          // Verify the data before saving
          if (!blueprint) {
            throw new Error('Blueprint is missing');
          }

          const ideaData = {
            idea,
            platform,
            target_audience: target,
            features,
            blueprint,
            user_id: session.user.id
          };

          console.log('Saving idea data:', ideaData);

          const { data, error: saveError } = await supabase
            .from('ideas')
            .insert(ideaData)
            .select()
            .single();

          if (saveError) {
            console.error('Supabase error saving idea:', saveError);
            throw new Error(saveError.message);
          }

          if (!data) {
            console.error('No data returned after saving idea');
            throw new Error('Failed to save idea - no data returned');
          }

          console.log('Idea saved successfully:', data);

          toast({
            title: "Success",
            description: "Blueprint generated and saved to your account!",
            variant: "default",
          });

          // Clear localStorage cache to ensure fresh data on next dashboard visit
          localStorage.removeItem('ideas_cache_' + session.user.id);

        } catch (error) {
          console.error('Error in save process:', error);
          toast({
            title: "Error",
            description: error instanceof Error ? error.message : "Failed to save idea",
            variant: "destructive",
          });
          // Don't return - continue to success page even if save failed
        }
      }

      toast({
        title: "Success",
        description: "Blueprint generated successfully!",
        variant: "default",
      });

      router.push('/success');
    } catch (err) {
      console.error('Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate blueprint';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="idea">App Idea</Label>
          <span className="text-xs text-muted-foreground">Required</span>
        </div>
        <Textarea
          id="idea"
          name="idea"
          placeholder="Describe your app idea in detail. The more specific you are, the better the blueprint will be."
          required
          className="min-h-[100px]"
        />
        <p className="text-xs text-muted-foreground">
          Example: "A task management app that helps teams track project progress, assign tasks, and set deadlines with real-time notifications."
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="platform">Platform</Label>
          <span className="text-xs text-muted-foreground">Required</span>
        </div>
        <Select name="platform" defaultValue="web">
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="both">Both (Web & Mobile)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">
          This will determine the recommended technologies and architecture in your blueprint.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="target">Target Audience</Label>
          <span className="text-xs text-muted-foreground">Recommended</span>
        </div>
        <Textarea
          id="target"
          name="target"
          placeholder="Describe your target users in detail. Include demographics, needs, pain points, and user personas if possible."
          className="min-h-[80px]"
        />
        <p className="text-xs text-muted-foreground">
          Example: "Small to medium business owners aged 30-50 who need to manage their inventory and sales data but have limited technical knowledge."
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="features">Key Features</Label>
          <span className="text-xs text-muted-foreground">Recommended</span>
        </div>
        <Textarea
          id="features"
          name="features"
          placeholder="List the main features of your app in detail. Separate features with commas or new lines. Be specific about what each feature should do."
          className="min-h-[120px]"
        />
        <p className="text-xs text-muted-foreground">
          Example: "User authentication with social login options, Task creation with priority levels and due dates, Team collaboration with comments and file attachments, Kanban board view with drag-and-drop functionality, Automated email notifications for task updates"
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="saveIdea"
          checked={saveIdea}
          onCheckedChange={(checked) => setSaveIdea(checked as boolean)}
        />
        <label
          htmlFor="saveIdea"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Save this idea to my account {!isAuthenticated && "(Please login first)"}
        </label>
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Blueprint'}
      </Button>
    </form>
  )
}
