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
    // Try Puter AI first
    if (window.puter?.ai) {
      try {
        const systemPrompt = `You are a technical architect helping to create blueprints for applications. 
Generate a detailed technical blueprint that includes architecture, technologies, and implementation details.
Focus on modern best practices and scalable solutions.`;

        const fullPrompt = `${systemPrompt}

Project Requirements:
${prompt}

Please provide a detailed technical blueprint including:
1. Architecture Overview
2. Frontend Stack
3. Backend Stack
4. Database Design
5. Key Features Implementation
6. Security Considerations
7. Deployment Strategy`;

        const response = await window.puter.ai.chat(fullPrompt, {
          model: 'gpt-3.5-turbo'
        });

        const content = response.message.content
          .map(item => item.text)
          .join('\n')
          .trim();

        if (!content) {
          throw new Error('No content generated');
        }

        return content;
      } catch (error) {
        console.error('Error from Puter AI:', error);
        // Fall through to API fallback
      }
    }

    // Fallback to API if Puter AI is not available or fails
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate blueprint');
    }

    const data = await response.json();
    return data.content;
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
        <Label htmlFor="idea">App Idea</Label>
        <Textarea
          id="idea"
          name="idea"
          placeholder="Describe your app idea..."
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select name="platform">
          <SelectTrigger>
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="web">Web</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
            <SelectItem value="both">Both</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="target">Target Audience</Label>
        <Input
          id="target"
          name="target"
          placeholder="Who is this app for?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Key Features</Label>
        <Textarea
          id="features"
          name="features"
          placeholder="List the main features..."
        />
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
