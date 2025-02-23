export interface GeneratePromptInput {
  idea: string;
  platform: 'web' | 'mobile' | 'both';
  target?: string;
  features?: string;
}

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string, options: { model: string; stream?: boolean }) => Promise<{
          message: {
            content: Array<{ text: string }>;
          };
        }>;
      };
    };
  }
}

export async function generateBlueprint(input: GeneratePromptInput): Promise<string> {
  try {
    // 1. Input validation
    const { idea, platform, target, features } = input;
    if (!idea || !platform) {
      throw new Error('App idea and platform are required');
    }

    // 2. Prepare the prompt
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

    // 3. Make API call
    console.log('Making API request to Puter.js...');
    const response = await window.puter.ai.chat(prompt, {
      model: 'claude-3-5-sonnet'
    });

    // 4. Response validation
    if (!response?.message?.content?.[0]?.text) {
      console.error('Invalid response structure:', response);
      throw new Error('Invalid response from Puter.js API');
    }

    // 5. Success
    console.log('Successfully generated blueprint');
    return response.message.content[0].text;

  } catch (error) {
    // 6. Error handling
    console.error('Error in generateBlueprint:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      type: error instanceof Error ? error.constructor.name : typeof error
    });
    throw error;
  }
}
