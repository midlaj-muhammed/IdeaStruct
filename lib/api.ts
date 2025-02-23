export interface GeneratePromptInput {
  idea: string;
  platform: 'web' | 'mobile' | 'both';
  target?: string;
  features?: string;
}

export interface GenerateResponse {
  blueprint?: string;
  error?: string;
  details?: string;
}

export async function generateBlueprint(input: GeneratePromptInput): Promise<GenerateResponse> {
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate blueprint');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating blueprint:', error);
    return {
      error: error instanceof Error ? error.message : 'Failed to generate blueprint',
    };
  }
}
