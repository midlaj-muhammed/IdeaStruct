import { NextResponse } from 'next/server';
import { env } from '@/lib/env';

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    hasAnthropicKey: typeof process.env.ANTHROPIC_API_KEY === 'string',
    keyLength: process.env.ANTHROPIC_API_KEY?.length || 0,
    envLib: {
      hasKey: typeof env.ANTHROPIC_API_KEY === 'string',
      keyLength: env.ANTHROPIC_API_KEY?.length || 0,
    }
  });
}
