import { NextResponse } from 'next/server';
import { generateContent } from '@/lib/ai-service';

export const maxDuration = 300; // Set maximum duration to 5 minutes
export const dynamic = 'force-dynamic'; // Disable static optimization

// Set CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Fallback blueprint generator
function generateFallbackBlueprint(input: { idea: string; platform?: string; features?: string }) {
  const { idea, platform = 'web', features = '' } = input;
  
  return `# Technical Blueprint for: ${idea}

## Architecture Overview
- Modern ${platform} application using industry-standard practices
- Microservices architecture for scalability
- Cloud-native design principles

## Frontend Stack
- React.js with Next.js framework
- TypeScript for type safety
- Tailwind CSS for styling
- State management with React Context/Redux

## Backend Stack
- Node.js/Express.js API server
- RESTful API design
- Microservices architecture
- Message queue for async operations

## Database Design
- PostgreSQL for primary data storage
- Redis for caching
- Prisma as ORM

## Key Features Implementation
${features ? features.split(',').map(f => `- ${f.trim()}`).join('\n') : '- Core features to be determined'}

## Security Considerations
- JWT authentication
- HTTPS encryption
- Input validation
- Rate limiting
- CORS policies

## Deployment Strategy
- Docker containerization
- Kubernetes orchestration
- CI/CD pipeline with GitHub Actions
- Cloud hosting (AWS/GCP/Azure)

## Monitoring & Analytics
- Application monitoring
- Error tracking
- User analytics
- Performance metrics

This blueprint provides a foundation for a scalable and maintainable application.`;
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Extract information from the prompt
    const lines = prompt.split('\n');
    const idea = lines.find(l => l.includes('App Idea:'))?.split('App Idea:')[1]?.trim() || 'Application';
    const platform = lines.find(l => l.includes('Target Platform:'))?.split('Target Platform:')[1]?.trim();
    const features = lines.find(l => l.includes('Required Features:'))?.split('Required Features:')[1]?.trim();

    // Generate content using AI service
    let content;
    try {
      content = await generateContent({ prompt });
    } catch (error) {
      console.error('Error generating content using AI service:', error);
      // Fallback to generating a blueprint
      content = generateFallbackBlueprint({
        idea,
        platform,
        features
      });
    }

    return NextResponse.json(
      { content },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function GET(req: Request) {
  // Add CORS headers to all responses
  const headers = {
    ...corsHeaders,
  }

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Missing idea ID' },
        { status: 400, headers }
      )
    }

    // Fetch idea from Supabase
    let idea
    try {
      const { data, error } = await supabase
        .from('ideas')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      if (!data) throw new Error('Idea not found')
      
      idea = data
    } catch (error) {
      console.error('Error fetching idea:', error)
      return NextResponse.json(
        { error: 'Failed to fetch idea' },
        { status: 500, headers }
      )
    }

    // Generate new blueprint using Puter.js
    let blueprint
    try {
      // Validate environment variables before proceeding
      try {
        getRequiredEnvVar('ANTHROPIC_API_KEY', 'blueprint generation');
      } catch (envError) {
        console.error('Environment validation failed:', envError);
        return NextResponse.json(
          { 
            error: 'API configuration error. Please ensure ANTHROPIC_API_KEY is set correctly in .env.local',
            details: process.env.NODE_ENV === 'development' ? envError.message : undefined
          },
          { status: 500, headers }
        );
      }

      blueprint = await generateBlueprint({
        idea: idea.idea,
        platform: idea.platform,
        target: idea.target || undefined,
        features: idea.features || undefined,
      })
    } catch (error) {
      console.error('Error regenerating blueprint:', error)
      // Fallback to generating a blueprint
      blueprint = generateFallbackBlueprint({
        idea: idea.idea,
        platform: idea.platform,
        features: idea.features || undefined,
      })
    }

    return NextResponse.json({ blueprint }, { headers })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers }
    )
  }
}
