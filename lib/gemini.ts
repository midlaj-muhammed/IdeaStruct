import { GoogleGenerativeAI } from '@google/generative-ai'

export interface GeneratePromptInput {
  idea: string
  platform: 'web' | 'mobile' | 'both'
  target?: string
  features?: string
}

const MODEL_NAME = "gemini-pro"
const API_KEY = process.env.GOOGLE_API_KEY

if (!API_KEY) {
  throw new Error('Missing GOOGLE_API_KEY environment variable')
}

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY)

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

    const model = genAI.getGenerativeModel({ model: MODEL_NAME })

    const prompt = `Act as an experienced software architect and create a clear, well-structured technical blueprint for the following app idea. Use simple language and clear explanations.

App Details:
- Idea: ${idea}
- Platform: ${platform}
${target ? `- Target Users: ${target}` : ''}
${features ? `- Key Features: ${features}` : ''}

Please provide a blueprint with the following sections, using clear headings and bullet points:

1. Technology Stack
   - List the main technologies and frameworks
   - Explain WHY each technology was chosen

2. Core Components
   - List the main parts of the app
   - Brief explanation of each part's purpose

3. Database Design
   - Main data tables/collections
   - Key fields and relationships

4. API Structure
   - List of main API endpoints
   - What each endpoint does

5. Security Measures
   - Key security features
   - Data protection approach

6. Development Timeline
   - Major development phases
   - Rough time estimates

7. Technical Challenges
   - Potential difficulties
   - Suggested solutions

Keep explanations clear and avoid overly technical jargon. Use bullet points for better readability.`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    if (!text) {
      throw new Error('No content received from the model')
    }

    console.log('Successfully generated blueprint')
    return text

  } catch (error) {
    console.error('Error in generateBlueprint:', error)
    throw error
  }
}
