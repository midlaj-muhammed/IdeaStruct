# Google Gemini Integration for Blueprint Generation

This document explains how to set up and use the Google Gemini AI integration for generating app blueprints in IdeaStruct.

## Overview

IdeaStruct now uses Google's Gemini AI model to generate comprehensive markdown blueprints based on your app idea, target platform, audience, and key features. The integration provides detailed, well-structured blueprints that can serve as a starting point for your app development process.

## Setup Instructions

1. **Get a Google Gemini API Key**:
   - Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create a new API key
   - Copy the API key

2. **Configure Environment Variables**:
   - Create a `.env.local` file in the root of your project
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your-api-key-here
     ```

3. **Install Dependencies**:
   - The project already includes the required Google Generative AI package
   - If needed, you can update it with:
     ```
     npm install @google/generative-ai@latest
     ```

## How It Works

1. **User Input**:
   - Users provide their app idea, target platform, audience, and key features
   - This information is formatted into a structured prompt

2. **API Request**:
   - The formatted prompt is sent to Google's Gemini API
   - We use the `gemini-1.5-flash` model for optimal performance

3. **Blueprint Generation**:
   - Gemini generates a comprehensive markdown blueprint
   - The blueprint includes sections for app overview, technical specifications, feature breakdown, UI/UX recommendations, development roadmap, deployment strategy, and maintenance plan

4. **Result Handling**:
   - The generated blueprint is displayed to the user
   - Users can download the blueprint as a markdown file
   - If logged in, users can save the blueprint to their account

## Customization

You can customize the blueprint generation by modifying the prompt template in `lib/gemini.ts`. The current template includes:

- App Overview
- Technical Specifications
- Feature Breakdown
- UI/UX Recommendations
- Development Roadmap
- Deployment Strategy
- Maintenance Plan

## Troubleshooting

If you encounter issues with the Gemini integration:

1. **Check API Key**: Ensure your API key is correctly set in the environment variables
2. **Check Console Logs**: Look for error messages in the browser console or server logs
3. **Fallback Mechanism**: The system includes a fallback to generate a basic blueprint if the Gemini API fails

## Example Blueprint

The generated blueprints follow a structured format with clear headings and sections. Here's a simplified example:

```markdown
# Task Manager App Blueprint

## App Overview
A web-based task management application designed for professionals and teams to organize, track, and collaborate on tasks and projects.

## Technical Specifications
- Frontend: React.js with TypeScript
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT with OAuth

## Feature Breakdown
1. Task Management
2. Project Organization
3. Team Collaboration
4. Notifications
5. Analytics Dashboard

## UI/UX Recommendations
- Clean, minimalist interface
- Drag-and-drop functionality
- Dark/light mode
- Mobile-responsive design

## Development Roadmap
- Phase 1 (MVP): Basic task management (2 weeks)
- Phase 2: Team features (3 weeks)
- Phase 3: Advanced features (4 weeks)

## Deployment Strategy
- Hosting: AWS or Vercel
- CI/CD: GitHub Actions
- Monitoring: Sentry

## Maintenance Plan
- Weekly updates
- Monthly feature additions
- Quarterly security audits
```

## Credits

This integration uses Google's Gemini AI models. For more information, visit [Google AI Studio](https://aistudio.google.com/).
