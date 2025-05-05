# Setting Up Google Gemini API for Blueprint Generation

This guide will help you set up the Google Gemini API for blueprint generation in IdeaStruct.

## Getting a Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click on "Get API key" or "Create API key"
4. Copy the generated API key

## Adding the API Key to Your Project

1. Create a `.env.local` file in the root of your project (if it doesn't exist already)
2. Add the following line to the file:
   ```
   GEMINI_API_KEY=your-api-key-here
   ```
   Replace `your-api-key-here` with the API key you copied from Google AI Studio

3. Restart your development server

## Testing the Integration

1. Visit the test page at `/test-gemini` to check if your API key is properly configured
2. Click the "Run Test" button to generate a sample blueprint
3. If everything is working correctly, you should see a generated blueprint in the test result section

## Troubleshooting

If you encounter issues:

1. Check that your API key is correctly set in the `.env.local` file
2. Make sure the API key is valid and not expired
3. Check the browser console for any error messages
4. Try using the fallback mechanism by not setting an API key (this will use a basic blueprint generator)

## Using the Blueprint Generator

Once set up, you can use the blueprint generator by:

1. Going to the `/generate` page
2. Filling out the form with your app idea, platform, target audience, and key features
3. Clicking "Generate Blueprint"
4. The blueprint will be generated using Google Gemini AI and displayed on the success page

## Notes

- The free tier of Google Gemini API has usage limits. If you exceed these limits, you may need to upgrade to a paid plan.
- The blueprint generator will fall back to a basic blueprint if the Gemini API is not available or returns an error.
- You can view your API usage in the [Google AI Studio](https://aistudio.google.com/app/apikey) dashboard.
