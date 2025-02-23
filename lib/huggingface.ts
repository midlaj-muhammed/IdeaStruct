import { HfInference } from '@huggingface/inference'

// Initialize HuggingFace client
export const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// List of available models for text generation
export const MODELS = {
  T5: 'google/flan-t5-large',
  GPT2: 'gpt2',
  BART: 'facebook/bart-large',
} as const

// Default model to use
export const DEFAULT_MODEL = MODELS.T5

export interface GeneratePromptInput {
  idea: string
  platform: 'web' | 'mobile' | 'both'
  target?: string
  features?: string
}

export async function generateText(prompt: string, model = DEFAULT_MODEL) {
  try {
    console.log('Generating text with model:', model)
    console.log('Prompt:', prompt)

    const response = await hf.textGeneration({
      model,
      inputs: prompt,
      parameters: {
        max_length: 800,
        temperature: 0.7,
        top_p: 0.95,
        do_sample: true,
        num_return_sequences: 1
      },
    })

    console.log('HuggingFace response:', response)

    if (!response || !response.generated_text) {
      throw new Error('No text generated from the model')
    }

    return response.generated_text
  } catch (error) {
    console.error('HuggingFace API error:', error)
    throw new Error(`Failed to generate text: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function generateBlueprint({ idea, platform, target, features }: GeneratePromptInput): Promise<string> {
  try {
    console.log('Generating blueprint with params:', { idea, platform, target, features })

    const prompt = `Generate a technical blueprint for a ${platform} app with these details:

App Idea: ${idea}
${target ? `Target Users: ${target}\n` : ''}
${features ? `Key Features: ${features}\n` : ''}

Provide a detailed technical blueprint covering:
1. Technology Stack (frameworks, libraries)
2. Core Components
3. Database Schema
4. API Endpoints
5. Security Implementation
6. Development Phases
7. Technical Challenges

Format the response in clear sections with bullet points.`

    console.log('Generated prompt:', prompt)

    const response = await generateText(prompt)
    
    if (!response) {
      throw new Error('No blueprint content generated')
    }

    // Clean up the response
    const cleanedResponse = response
      .trim()
      .replace(/^[\s\n]+|[\s\n]+$/g, '') // Remove leading/trailing whitespace and newlines
      .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double newlines

    console.log('Successfully generated blueprint')
    return cleanedResponse

  } catch (error) {
    console.error('Error in generateBlueprint:', error)
    throw new Error(`Failed to generate blueprint: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
