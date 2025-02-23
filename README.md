# IdeaStruct 🚀

Turn your app ideas into structured blueprints instantly with AI-powered insights.

## Features ✨

- **AI-Powered Blueprint Generation**: Transform your app ideas into comprehensive development plans
- **Smart Organization**: Keep all your ideas in one place with an intuitive dashboard
- **Real-time Generation**: Get detailed blueprints in seconds
- **User Authentication**: Secure access to your ideas with Supabase authentication
- **Modern UI**: Clean, responsive interface built with Next.js 13 and Tailwind CSS

## Tech Stack 🛠️

- **Frontend**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **AI Integration**: OpenAI GPT
- **State Management**: React Hooks
- **Type Safety**: TypeScript

## Getting Started 🌟

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- OpenAI API key

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ideastruct.git
   cd ideastruct
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the database:
   - Run the migrations in the `supabase/migrations` folder
   - This will create the necessary tables and functions

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema 📊

### Users Table
- id (UUID, Primary Key)
- email (Text)
- created_at (Timestamp)
- updated_at (Timestamp)

### Ideas Table
- id (UUID, Primary Key)
- user_id (UUID, Foreign Key)
- idea (Text)
- platform (Text)
- target_audience (Text)
- features (Text)
- blueprint (Text)
- created_at (Timestamp)
- updated_at (Timestamp)

## API Routes 🛣️

- `POST /api/generate` - Generate app blueprint
- `GET /api/ideas` - Fetch user's ideas
- `POST /api/ideas` - Save new idea
- `PUT /api/ideas/:id` - Update existing idea
- `DELETE /api/ideas/:id` - Delete idea

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [OpenAI](https://openai.com/)

## Support 💬

For support, email support@ideastruct.com or join our Discord community.
# IdeaStruct
