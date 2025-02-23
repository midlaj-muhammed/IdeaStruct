import { HfInference } from '@huggingface/inference';

// Initialize the model with a demo key
const hf = new HfInference();

export interface GenerationRequest {
  prompt: string;
  maxTokens?: number;
}

// Mock AI service that generates responses based on templates
export async function generateContent(request: GenerationRequest) {
  try {
    if (!window.puter?.ai) {
      throw new Error('Puter AI service is not available');
    }

    const systemPrompt = `You are a technical architect helping to create blueprints for applications. 
Generate a detailed technical blueprint that includes architecture, technologies, and implementation details.
Focus on modern best practices and scalable solutions.`;

    const fullPrompt = `${systemPrompt}

Project Requirements:
${request.prompt}

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
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
}
