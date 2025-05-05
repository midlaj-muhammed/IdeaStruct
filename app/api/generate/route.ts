import { NextRequest, NextResponse } from 'next/server';
import { generateBlueprint } from '@/lib/gemini';
import { supabase } from '@/lib/supabase';

export const maxDuration = 60; // Set maximum duration to 60 seconds (Vercel Hobby plan limit)
export const dynamic = 'force-dynamic'; // Disable static optimization

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Helper function to generate a basic blueprint
function generateBasicBlueprint(idea: string, platform: string = 'web', target: string = '', features: string = '') {
  return `# ${idea} Blueprint

## App Overview
A ${platform} application that ${idea.toLowerCase()}.
${target ? `\nTarget audience: ${target}` : ''}

## Features
${features ? features.split(',').map((f: string) => `- ${f.trim()}`).join('\n') : '- Feature list not provided'}

## Technical Specifications
### Recommended Tech Stack
- Frontend: React with Next.js
- UI: Tailwind CSS
- Backend: Node.js
- Database: PostgreSQL
- Authentication: JWT
- API: RESTful

### Architecture Overview
- Client-server architecture
- RESTful API design
- Responsive UI for all devices

## Development Roadmap
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
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400, headers: corsHeaders }
      );
    }

    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: 'No prompt provided' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Extract information from the prompt
    const lines = prompt.split('\n');
    const idea = lines.find((l: string) => l.includes('App Idea:'))?.split('App Idea:')[1]?.trim() || 'Application';
    const platformLine = lines.find((l: string) => l.includes('Target Platform:'));
    const platform = platformLine ? platformLine.split('Target Platform:')[1]?.trim() : 'web';
    const targetLine = lines.find((l: string) => l.includes('Target Audience:'));
    const target = targetLine ? targetLine.split('Target Audience:')[1]?.trim() : '';
    const featuresSection = lines.find((l: string) => l.includes('Required Features:'));
    let features = '';

    if (featuresSection) {
      const featureIndex = lines.indexOf(featuresSection);
      const featureLines = lines.slice(featureIndex);
      features = featureLines.join('\n').split('Required Features:')[1]?.trim() || '';
    }

    console.log('Extracted data:', { idea, platform, target, features: features.substring(0, 100) + '...' });

    // Generate content using Gemini API
    let content;
    try {
      content = await generateBlueprint({
        idea,
        platform: platform as 'web' | 'mobile' | 'both',
        target,
        features
      });
    } catch (error) {
      console.error('Error generating content with Gemini:', error);
      // Fallback to basic blueprint if Gemini API fails
      content = generateBasicBlueprint(idea, platform, target, features);
    }

    if (!content) {
      console.warn('No content generated, using fallback');
      content = generateBasicBlueprint(idea, platform, target, features);
    }

    return NextResponse.json({ content }, { headers: corsHeaders });
  } catch (error) {
    console.error('Error generating blueprint:', error);
    // Return a basic error blueprint
    const errorBlueprint = `# Blueprint Generation Error

We encountered an error while generating your blueprint. Please try again with a more detailed description of your app idea.

## Troubleshooting Tips
- Make sure you've provided a clear app idea
- Specify the target platform (web, mobile, or both)
- List key features of your application
- Describe your target audience

If the problem persists, please contact support.`;

    return NextResponse.json(
      { content: errorBlueprint },
      { status: 200, headers: corsHeaders }
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
