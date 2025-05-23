import { GoogleGenerativeAI } from '@google/generative-ai'

export interface GeneratePromptInput {
  idea: string
  platform: 'web' | 'mobile' | 'both'
  target?: string
  features?: string
}

// Use the fastest Gemini model for quicker responses within Vercel's 60-second limit
const MODEL_NAME = "gemini-1.5-flash"
// Get API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY

// Initialize the Gemini API if API key is available
let genAI: any = null;
try {
  if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    console.log('Gemini API initialized successfully');
  } else {
    console.warn('No Gemini API key found. Will use fallback blueprint generation.');
  }
} catch (error) {
  console.error('Failed to initialize Gemini API:', error);
}

// Fallback blueprint generator function
function generateBasicBlueprint(idea: string, platform: string = 'web', target: string = '', features: string = ''): string {
  // Parse features into an array
  const featureList = features
    ? features.split(',').map(f => f.trim())
    : ['User authentication', 'Data management', 'Reporting'];

  // Generate a more detailed blueprint
  return `# ${idea} Blueprint

## Executive Summary
${idea} is a ${platform} application designed to ${idea.toLowerCase()}. This blueprint outlines the technical specifications, features, and implementation strategy for developing this application.

${target ? `The primary target audience is ${target}, and the application aims to address their specific needs and pain points.` : ''}

## App Overview
### Description
A comprehensive ${platform} application that ${idea.toLowerCase()}, providing users with a seamless and intuitive experience.

### Purpose and Goals
- Provide users with a powerful tool to ${idea.toLowerCase()}
- Streamline processes and improve efficiency
- Deliver a modern, responsive user interface
- Ensure security and data privacy

${target ? `### Target Audience\n${target} who need a solution for ${idea.toLowerCase()}.` : ''}

## Technical Architecture
### Recommended Tech Stack
- **Frontend**:
  - Framework: React${platform === 'mobile' ? ' Native' : ' with Next.js'}
  - State Management: Redux or Context API
  - UI Library: ${platform === 'mobile' ? 'Native components' : 'Tailwind CSS'}
  - Build Tools: Webpack, Babel

- **Backend**:
  - Language: Node.js with Express
  - API: RESTful or GraphQL
  - Authentication: JWT with OAuth 2.0

- **Database**:
  - Primary DB: PostgreSQL
  - Caching: Redis
  - ORM: Prisma or Sequelize

- **DevOps**:
  - CI/CD: GitHub Actions
  - Hosting: ${platform === 'mobile' ? 'App Store/Google Play' : 'AWS or Vercel'}
  - Monitoring: Sentry

### Architecture Overview
- Microservices architecture for scalability
- RESTful API design with versioning
- Responsive UI for all devices
- Secure authentication flow
- Data caching for performance

## Database Design
### Main Entities
- Users (id, name, email, password_hash, created_at, updated_at)
- ${idea.split(' ')[0]}s (id, name, description, user_id, created_at, updated_at)
- Settings (id, user_id, preferences, notifications)

### Relationships
- Users have many ${idea.split(' ')[0]}s
- ${idea.split(' ')[0]}s belong to Users

## Feature Specifications
${featureList.map((feature, index) => `
### ${feature}
**Description**: Functionality to manage ${feature.toLowerCase()}.

**Implementation Details**:
- Create a ${feature.toLowerCase()} module
- Implement CRUD operations
- Add validation and error handling
- Design responsive UI components

**User Flow**:
1. User navigates to ${feature} section
2. User can view, create, edit, or delete ${feature.toLowerCase()}
3. System validates input and provides feedback
4. Changes are persisted to the database
`).join('\n')}

## UI/UX Design Guidelines
### Design System
- Color Palette: Modern, accessible colors with primary and secondary themes
- Typography: Sans-serif fonts for readability
- Components: Reusable button, card, form, and navigation components
- Responsive Design: Mobile-first approach with breakpoints for tablet and desktop

### Key Screens
- Login/Registration
- Dashboard
- ${featureList.map(f => f + ' Management').join('\n- ')}
- User Profile
- Settings

## Development Roadmap
### Phase 1: MVP (4 weeks)
- Basic authentication
- Core ${featureList[0]} functionality
- Simple UI implementation

### Phase 2: Core Features (6 weeks)
- Complete all essential features
- Refined UI/UX
- Performance optimizations

### Phase 3: Advanced Features (4 weeks)
- Analytics and reporting
- Advanced customization
- Third-party integrations

## Testing Strategy
- Unit Testing: Jest for frontend and backend
- Integration Testing: Supertest for API endpoints
- E2E Testing: Cypress or Playwright
- Performance Testing: Lighthouse and JMeter

## Deployment Strategy
- Development environment: Local with Docker
- Staging environment: Cloud provider with CI/CD
- Production environment: Scalable cloud infrastructure
- Blue/green deployment for zero downtime

## Maintenance Plan
- Regular security updates
- Performance monitoring
- User feedback collection
- Quarterly feature updates

This blueprint provides a foundation for a scalable and maintainable application. The next steps would be to create detailed wireframes, set up the development environment, and begin implementation of the core features.`;
}

export async function generateBlueprint(input: GeneratePromptInput): Promise<string> {
  try {
    const { idea, platform, target, features } = input

    if (!idea || !platform) {
      throw new Error('App idea and platform are required')
    }

    console.log('Generating blueprint with input:', {
      idea,
      platform,
      target: target || 'Not specified',
      features: features || 'Not specified',
    })

    // Check if Gemini API is available
    if (!genAI) {
      console.warn('Gemini API not initialized. Using fallback blueprint generator.');
      return generateBasicBlueprint(idea, platform, target || '', features || '');
    }

    try {
      // Set a timeout to ensure we don't exceed Vercel's 60-second limit
      const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        generationConfig: {
          maxOutputTokens: 8192, // Limit output size for faster generation
          temperature: 0.7,      // Balance between creativity and determinism
        }
      })

      const prompt = `# Advanced App Blueprint Generator

## Input Information:
- App Idea: ${idea}
- Target Platform: ${platform}
${target ? `- Target Audience: ${target}` : ''}
${features ? `- Key Features: ${features}` : ''}

## Instructions:
You are an expert software architect. Create a detailed markdown blueprint for this app idea that is technically precise and actionable for developers. Be concise but thorough.

1. **Executive Summary** - Brief overview, value proposition, market opportunity

2. **App Overview**
   - App concept description
   - Purpose and goals
   - Target audience analysis
   - Competitive positioning

3. **Technical Architecture**
   - Tech stack recommendations with justifications
   - System architecture overview
   - Security considerations
   - Third-party integrations

4. **Database Design**
   - Database schema (tables, fields, relationships)
   - Data models
   - Key queries

5. **API Specifications**
   - RESTful API endpoints
   - Authentication approach
   - Example JSON formats

6. **Feature Specifications**
   - Breakdown of each feature
   - User flows
   - Implementation details
   - Code examples for complex logic

7. **UI/UX Design Guidelines**
   - Design system recommendations
   - Key screens description
   - User interaction patterns
   - Responsive design approach

8. **Development Roadmap**
   - Project phases
   - Time estimates
   - Dependencies

9. **Testing & Deployment**
   - Testing approach
   - CI/CD recommendations
   - Monitoring strategy

10. **Maintenance & Cost**
    - Maintenance plan
    - Cost estimates

Format as a well-structured markdown document with proper headings, subheadings, and bullet points. Include code examples where helpful.`

      // Create a promise that rejects after 50 seconds (to stay within Vercel's 60-second limit)
      const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Gemini API call timed out')), 50000);
      });

      // Race the API call against the timeout
      const result = await Promise.race([
        model.generateContent(prompt),
        timeout
      ]) as any;

      const response = await result.response
      const text = response.text()

      if (!text) {
        throw new Error('No content received from the model')
      }

      console.log('Successfully generated blueprint with Gemini')
      return text
    } catch (error) {
      console.error('Error calling Gemini API:', error)
      console.log('Falling back to basic blueprint generator')
      return generateBasicBlueprint(idea, platform, target || '', features || '')
    }
  } catch (error) {
    console.error('Error in generateBlueprint:', error)
    // Return a basic blueprint instead of throwing an error
    try {
      return generateBasicBlueprint(
        input.idea || 'Application',
        input.platform || 'web',
        input.target || '',
        input.features || ''
      )
    } catch (fallbackError) {
      console.error('Even fallback blueprint generation failed:', fallbackError)
      return `# Blueprint Generation Failed\n\nWe apologize, but we couldn't generate a blueprint at this time. Please try again later.`
    }
  }
}
