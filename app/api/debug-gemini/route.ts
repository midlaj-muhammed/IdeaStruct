import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    geminiApiKey: {
      exists: typeof process.env.GEMINI_API_KEY === 'string',
      length: process.env.GEMINI_API_KEY?.length || 0,
      firstChars: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.substring(0, 3) + '...' : 'none',
    },
    googleApiKey: {
      exists: typeof process.env.GOOGLE_API_KEY === 'string',
      length: process.env.GOOGLE_API_KEY?.length || 0,
      firstChars: process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY.substring(0, 3) + '...' : 'none',
    },
    nodeEnv: process.env.NODE_ENV,
  });
}
