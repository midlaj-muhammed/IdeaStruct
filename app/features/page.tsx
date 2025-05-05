'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Zap, 
  Layers, 
  Clock, 
  Download, 
  FileText, 
  Database, 
  Code, 
  Shield, 
  BarChart, 
  Users, 
  ArrowRight 
} from 'lucide-react'

export default function FeaturesPage() {
  const mainFeatures = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "AI-Powered Generation",
      description: "Transform your app ideas into comprehensive blueprints with our advanced AI technology. Get detailed technical specifications in seconds."
    },
    {
      icon: <Layers className="h-8 w-8 text-primary" />,
      title: "Organized Structure",
      description: "Keep all your ideas in one place with an intuitive dashboard. Easily manage, update, and compare different app concepts."
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Time-Saving",
      description: "What would take hours of planning and research is completed in seconds. Focus on building your app instead of planning it."
    },
    {
      icon: <Download className="h-8 w-8 text-primary" />,
      title: "Easy Export",
      description: "Download your blueprints in multiple formats to share with your team, developers, or stakeholders."
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Comprehensive Documentation",
      description: "Get detailed documentation including technology recommendations, architecture diagrams, and implementation steps."
    },
    {
      icon: <Database className="h-8 w-8 text-primary" />,
      title: "Database Schema",
      description: "Receive suggested database models and relationships based on your app's requirements and features."
    }
  ]

  const technicalFeatures = [
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Tech Stack Recommendations",
      description: "Get personalized technology stack recommendations based on your app's requirements and target platform."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Security Considerations",
      description: "Receive guidance on security best practices specific to your application type and features."
    },
    {
      icon: <BarChart className="h-6 w-6 text-primary" />,
      title: "Scalability Planning",
      description: "Plan for growth with scalability recommendations tailored to your expected user base and traffic patterns."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Team Requirements",
      description: "Understand the development team composition needed to build your application effectively."
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
              <span>Features</span>
              <span className="ml-1 text-primary">✨</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Powerful tools to 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"> structure your ideas</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              IdeaStruct provides everything you need to transform your app concepts into detailed blueprints ready for development.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Features Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Core Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Everything you need to organize and develop your app ideas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-6xl mx-auto">
            {mainFeatures.map((feature, index) => (
              <div key={index} className="flex flex-col items-start">
                <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technical Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Technical Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Detailed technical guidance for your development process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {technicalFeatures.map((feature, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-sm border flex flex-col">
                <div className="flex items-start mb-4">
                  <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                </div>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Blueprint Example Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center max-w-5xl mx-auto">
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
                Comprehensive Blueprints
              </h2>
              <p className="text-lg text-muted-foreground">
                Each blueprint includes detailed technical specifications, architecture recommendations, and implementation steps tailored to your app idea.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary font-medium text-sm">1</span>
                  </div>
                  <span>Technology stack recommendations</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary font-medium text-sm">2</span>
                  </div>
                  <span>Database schema and relationships</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary font-medium text-sm">3</span>
                  </div>
                  <span>API endpoints and structure</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-primary font-medium text-sm">4</span>
                  </div>
                  <span>Implementation timeline and milestones</span>
                </li>
              </ul>
              <Button asChild size="lg" className="gap-1 mt-4">
                <Link href="/generate">
                  Try It Now <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="flex-1 bg-card p-6 rounded-xl shadow-sm border">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Technology Stack</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Frontend: React Native with Expo</li>
                    <li>• Backend: Node.js with Express</li>
                    <li>• Database: MongoDB</li>
                    <li>• Authentication: Firebase Auth</li>
                    <li>• Storage: AWS S3</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Core Components</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• User Authentication Module</li>
                    <li>• Product Catalog System</li>
                    <li>• Shopping Cart Management</li>
                    <li>• Payment Processing Integration</li>
                    <li>• Order Tracking System</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Development Timeline</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Planning Phase: 2 weeks</li>
                    <li>• MVP Development: 8 weeks</li>
                    <li>• Testing & Refinement: 4 weeks</li>
                    <li>• Launch Preparation: 2 weeks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Ready to Structure Your Ideas?
            </h2>
            <p className="text-xl text-muted-foreground">
              Start generating detailed blueprints for your app ideas today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-1">
                <Link href="/register">
                  Get Started <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
