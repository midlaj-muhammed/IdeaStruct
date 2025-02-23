### App Blueprint Context File

---

#### 1. Project Breakdown

**App Name:** IdeaStruct  
**Platform:** Web  
**Summary:** IdeaStruct is a web application designed to streamline the process of turning app ideas into actionable development blueprints. Users can input their app idea, specify whether it’s for mobile or web, and receive a comprehensive markdown file containing an overview, features, tech stack, target audience, and a basic roadmap. The goal is to empower creators, entrepreneurs, and developers by providing a structured starting point for app development.  
**Primary Use Case:** A user has an app idea but lacks the technical expertise to structure it for development. They use IdeaStruct to generate a detailed blueprint that can be shared with developers or used as a personal reference.  
**Authentication Requirements:** No authentication is required for generating and downloading blueprints. However, Supabase will be used to store user-submitted ideas (optional) for future reference or analytics.

---

#### 2. Tech Stack Overview

- **Frontend Framework:** React + Next.js  
  Next.js will handle server-side rendering (SSR) for fast page loads and SEO optimization. React will manage the dynamic UI components.  
- **UI Library:** Tailwind CSS + ShadCN  
  Tailwind CSS will provide utility-first styling, while ShadCN will offer pre-built, customizable UI components for consistency and speed.  
- **Backend (BaaS):** Supabase  
  Supabase will handle data storage for user-submitted ideas and provide real-time features if needed (e.g., analytics dashboard).  
- **Deployment:** Vercel  
  Vercel will be used for seamless deployment and hosting, with automatic CI/CD pipelines for updates.

---

#### 3. Core Features

1. **Idea Input Form:**  
   - A simple form where users can input their app idea, select platform (web or mobile), and provide optional details like target audience or key features.  
   - Built using React components and Tailwind CSS for responsive design.  

2. **Blueprint Generator:**  
   - A backend function (via Supabase Edge Functions) processes the input and generates a structured markdown file.  
   - The markdown file includes sections for Overview, Features, Tech Stack, Target Audience, and Roadmap.  

3. **Markdown File Download:**  
   - Users can download the generated markdown file directly from the browser.  
   - Implemented using Next.js API routes to handle file generation and download.  

4. **Optional Idea Storage:**  
   - Users can opt to save their ideas to Supabase for future reference.  
   - Supabase’s real-time database will allow users to view and manage their saved ideas.  

5. **Analytics Dashboard (Future):**  
   - A dashboard to view metrics on submitted ideas (e.g., most common features, platform preferences).  
   - Built using Supabase’s real-time capabilities and ShadCN components for data visualization.

---

#### 4. User Flow

1. **Landing Page:**  
   - Users land on a clean, minimal homepage with a call-to-action (CTA) to "Generate Your Blueprint."  
   - The page includes a brief description of the app and its benefits.  

2. **Idea Input:**  
   - Users click the CTA and are directed to a form where they input their app idea and select the platform.  
   - Optional fields allow users to add details like target audience or key features.  

3. **Blueprint Generation:**  
   - After submitting the form, the app processes the input and generates a markdown file.  
   - A loading spinner (ShadCN component) is displayed during processing.  

4. **Download Blueprint:**  
   - Once the markdown file is ready, users are prompted to download it.  
   - The file is automatically named based on the app idea (e.g., `MyApp_Idea_Blueprint.md`).  

5. **Optional Save Idea:**  
   - After downloading, users are given the option to save their idea to Supabase for future reference.  

---

#### 5. Design and UI/UX Guidelines

- **Color Scheme:**  
  - Primary: Indigo (#6366F1) for buttons and CTAs.  
  - Secondary: Gray (#F3F4F6) for backgrounds and neutral elements.  
  - Accent: Green (#10B981) for success messages and progress indicators.  

- **Typography:**  
  - Font: Inter (sans-serif) for readability.  
  - Sizes: 16px for body text, 24px for headings, 14px for labels.  

- **Layout:**  
  - Single-column layout for simplicity.  
  - Max-width of 800px for content to ensure readability.  

- **Components:**  
  - Use ShadCN components for buttons, forms, and modals to ensure consistency.  
  - Tailwind CSS utilities for custom styling and responsiveness.  

- **Animations:**  
  - Subtle hover effects on buttons and links.  
  - Smooth transitions for form submissions and file downloads.  

---

#### 6. Technical Implementation Approach

1. **Frontend:**  
   - Use Next.js for routing and SSR.  
   - Create reusable React components for the form, buttons, and modals.  
   - Integrate Tailwind CSS for styling and ShadCN for pre-built UI components.  

2. **Backend:**  
   - Use Supabase Edge Functions to handle form submissions and generate markdown files.  
   - Store user-submitted ideas in Supabase’s PostgreSQL database if the user opts to save them.  

3. **File Generation:**  
   - Use Next.js API routes to generate markdown files dynamically.  
   - The API route will take the form input, structure it into markdown format, and return it as a downloadable file.  

4. **Deployment:**  
   - Deploy the app on Vercel with automatic CI/CD pipelines.  
   - Configure environment variables for Supabase credentials and API keys.  

---

#### 7. Required Development Tools and Setup Instructions

1. **Development Tools:**  
   - Node.js (v18 or higher)  
   - npm or Yarn for package management  
   - Git for version control  
   - Supabase CLI for local development  

2. **Setup Instructions:**  
   - Clone the repository: `git clone https://github.com/ideastruct/app.git`  
   - Install dependencies: `npm install` or `yarn install`  
   - Set up Supabase:  
     - Create a Supabase project and get the API keys.  
     - Configure `.env.local` with Supabase credentials.  
   - Run the development server: `npm run dev` or `yarn dev`  
   - Deploy to Vercel:  
     - Push changes to the main branch.  
     - Connect the repository to Vercel and configure environment variables.  

---

This blueprint provides a clear, actionable plan for building IdeaStruct using the specified tech stack. It ensures a seamless user experience and efficient development process.