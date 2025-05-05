'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Book, Code, FileText, Lightbulb } from 'lucide-react'

export default function DocsPage() {
  const docSections = [
    {
      icon: <Book className="h-6 w-6 text-primary" />,
      title: "Getting Started",
      description: "Learn the basics of IdeaStruct and how to create your first blueprint.",
      href: "#getting-started"
    },
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "API Reference",
      description: "Detailed documentation for developers integrating with IdeaStruct.",
      href: "#api-reference"
    },
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Guides",
      description: "Step-by-step tutorials for common use cases and workflows.",
      href: "#guides"
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-primary" />,
      title: "Best Practices",
      description: "Tips and recommendations for getting the most out of IdeaStruct.",
      href: "#best-practices"
    }
  ]

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 -z-10"></div>
        
        {/* Background pattern */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        
        {/* Accent elements */}
        <div className="absolute top-0 right-0 -z-10 transform translate-x-1/2 -translate-y-1/4">
          <div className="w-[300px] h-[300px] rounded-full bg-primary/20 blur-[100px]"></div>
        </div>
        
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
              <span>Documentation</span>
              <span className="ml-1 text-primary">📚</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Learn how to use 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"> IdeaStruct</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Comprehensive guides and documentation to help you get the most out of IdeaStruct.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="gap-1">
                <Link href="#getting-started">
                  Get Started <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#api-reference">
                  API Reference
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Documentation Sections */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {docSections.map((section, index) => (
              <Link 
                key={index} 
                href={section.href}
                className="bg-card p-6 rounded-xl shadow-sm border flex items-start space-x-4 hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                  <p className="text-muted-foreground">{section.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Documentation Content */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-16">
            {/* Getting Started Section */}
            <div id="getting-started" className="scroll-mt-20">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">Getting Started</h2>
              <div className="prose prose-slate max-w-none">
                <p>
                  Welcome to IdeaStruct! This guide will help you get started with creating your first blueprint.
                </p>
                <h3>Creating an Account</h3>
                <p>
                  To get started with IdeaStruct, you'll need to create an account. Click the "Get Started" button in the top right corner of the page and follow the instructions to create your account.
                </p>
                <h3>Creating Your First Blueprint</h3>
                <p>
                  Once you've created an account, you can create your first blueprint by clicking the "Generate Blueprint" button in the dashboard. Fill out the form with your app idea, target platform, and any additional details you'd like to include.
                </p>
                <h3>Downloading Your Blueprint</h3>
                <p>
                  After generating your blueprint, you can download it by clicking the "Download Blueprint" button. You can also save it to your account for future reference.
                </p>
              </div>
            </div>
            
            {/* API Reference Section */}
            <div id="api-reference" className="scroll-mt-20">
              <h2 className="text-3xl font-bold tracking-tighter mb-6">API Reference</h2>
              <div className="prose prose-slate max-w-none">
                <p>
                  IdeaStruct provides a RESTful API for developers who want to integrate with our platform. This section provides detailed documentation for each endpoint.
                </p>
                <h3>Authentication</h3>
                <p>
                  All API requests require authentication. You can authenticate by including your API key in the request headers.
                </p>
                <pre className="bg-card p-4 rounded-md overflow-x-auto">
                  <code>
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </pre>
                <h3>Endpoints</h3>
                <p>
                  The following endpoints are available:
                </p>
                <ul>
                  <li><code>/api/blueprints</code> - Get all blueprints</li>
                  <li><code>/api/blueprints/:id</code> - Get a specific blueprint</li>
                  <li><code>/api/generate</code> - Generate a new blueprint</li>
                </ul>
              </div>
            </div>
            
            {/* More sections would go here */}
            <div className="text-center">
              <p className="text-muted-foreground mb-4">This documentation is currently under development.</p>
              <Button asChild>
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
