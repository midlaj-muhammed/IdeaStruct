import { NextRequest, NextResponse } from 'next/server';
import { generateContent } from '@/lib/ai-service';
import { supabase } from '@/lib/supabase';

export const maxDuration = 300; // Set maximum duration to 5 minutes
export const dynamic = 'force-dynamic'; // Disable static optimization

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Helper function to generate a basic blueprint
function generateBasicBlueprint(idea: string, platform: string = 'web', features: string = '') {
  return `# ${idea} Blueprint

## Overview
A ${platform} application that ${idea.toLowerCase()}.

## Features
${features ? features.split(',').map((f: string) => `- ${f.trim()}`).join('\n') : '- Feature list not provided'}

## Technical Stack
- Frontend: React with Next.js
- UI: Tailwind CSS
- Backend: Node.js
- Database: PostgreSQL
- Authentication: JWT
- API: RESTful

## Implementation Steps
1. Setup project structure
2. Implement core features
3. Add authentication
4. Deploy and test

## Timeline
- Planning: 1 week
- Development: 4-6 weeks
- Testing: 2 weeks
- Deployment: 1 week

## Next Steps
1. Create detailed wireframes
2. Set up development environment
3. Begin implementation of core features

This blueprint provides a foundation for a scalable and maintainable application.`;
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'No prompt provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Extract information from the prompt
    const lines = prompt.split('\n');
    const idea = lines.find((l: string) => l.includes('App Idea:'))?.split('App Idea:')[1]?.trim() || 'Application';
    const platform = lines.find((l: string) => l.includes('Target Platform:'))?.split('Target Platform:')[1]?.trim();
    const features = lines.find((l: string) => l.includes('Required Features:'))?.split('Required Features:')[1]?.trim();

    // Generate content using AI service
    let content;
    try {
      content = await generateContent(prompt);
    } catch (error) {
      console.error('Error generating content with AI:', error);
      // Fallback to basic blueprint if AI service fails
      content = generateBasicBlueprint(idea, platform, features);
    }

    return NextResponse.json({ content }, { headers: corsHeaders });
  } catch (error) {
    console.error('Error generating blueprint:', error);
    return NextResponse.json(
      { error: 'Failed to generate blueprint' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'No ID provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    try {
      const { data, error } = await supabase
        .from('ideas')
        .select()
        .match({ id })
        .single();

      if (error) {
        return NextResponse.json(
          { error: 'Failed to fetch idea' },
          { status: 500, headers: corsHeaders }
        );
      }

      return NextResponse.json(data, { headers: corsHeaders });
    } catch (error) {
      console.error('Error fetching idea:', error);
      return NextResponse.json(
        { error: 'Failed to fetch idea' },
        { status: 500, headers: corsHeaders }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    );
  }
}
