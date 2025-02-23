import Anthropic from '@anthropic-ai/sdk';
import { env, getRequiredEnvVar } from './env';

export interface GeneratePromptInput {
  idea: string;
  platform: 'web' | 'mobile' | 'both';
  target?: string;
  features?: string;
}

export async function generateBlueprint(input: GeneratePromptInput): Promise<string> {
  try {
    // 1. Input validation
    const { idea, platform, target, features } = input;
    if (!idea || !platform) {
      throw new Error('App idea and platform are required');
    }

    // 2. Get API key with validation
    const apiKey = getRequiredEnvVar('ANTHROPIC_API_KEY', 'Claude API');

    // 3. Client initialization
    const client = new Anthropic({
      apiKey
    });

    // 4. Request preparation
    const prompt = `Create a technical blueprint for this app:

App Details:
• Idea: ${idea}
• Platform: ${platform}
${target ? `• Target Users: ${target}` : ''}
${features ? `• Key Features: ${features}` : ''}

Please provide a blueprint with these sections:

1. Technology Stack
2. Core Components
3. Database Design
4. API Structure
5. Security Measures
6. Development Timeline
7. Technical Challenges

Keep explanations clear and avoid technical jargon. Use bullet points for better readability.`;

    // 5. API call
    console.log('Making API request to Claude...');
    const response = await client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1500,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
    });

    // 6. Response validation
    if (!response?.content?.[0]?.text) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response from Claude API');
    }

    // 7. Success
    console.log('Successfully generated blueprint');
    return response.content[0].text;

  } catch (error) {
    // 8. Error handling
    console.error('Error in generateBlueprint:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : typeof error
    });
    throw error;
  }
}
