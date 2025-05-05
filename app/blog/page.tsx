'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const blogPosts = [
    {
      title: "How to Structure Your App Ideas Effectively",
      excerpt: "Learn the best practices for organizing and structuring your app ideas before development.",
      date: "June 15, 2023",
      author: "Sarah Johnson",
      authorRole: "Product Manager",
      category: "Best Practices",
      image: "/images/blog-placeholder-1.jpg",
      slug: "how-to-structure-app-ideas"
    },
    {
      title: "The Future of AI in App Development",
      excerpt: "Discover how artificial intelligence is transforming the way we approach app development.",
      date: "July 3, 2023",
      author: "Michael Chen",
      authorRole: "AI Specialist",
      category: "Technology",
      image: "/images/blog-placeholder-2.jpg",
      slug: "future-of-ai-in-app-development"
    },
    {
      title: "From Idea to Launch: A Success Story",
      excerpt: "Read about how one startup went from a simple idea to a successful app launch in just 3 months.",
      date: "July 28, 2023",
      author: "Jessica Williams",
      authorRole: "Startup Founder",
      category: "Case Study",
      image: "/images/blog-placeholder-3.jpg",
      slug: "idea-to-launch-success-story"
    },
    {
      title: "Choosing the Right Tech Stack for Your App",
      excerpt: "A comprehensive guide to selecting the best technologies for your app based on your requirements.",
      date: "August 12, 2023",
      author: "David Rodriguez",
      authorRole: "Senior Developer",
      category: "Development",
      image: "/images/blog-placeholder-4.jpg",
      slug: "choosing-right-tech-stack"
    },
    {
      title: "User Experience Design for App Success",
      excerpt: "Learn why user experience is crucial for app success and how to design with users in mind.",
      date: "September 5, 2023",
      author: "Emma Thompson",
      authorRole: "UX Designer",
      category: "Design",
      image: "/images/blog-placeholder-5.jpg",
      slug: "ux-design-for-app-success"
    },
    {
      title: "Securing Your App: Best Practices",
      excerpt: "Essential security practices every app developer should implement to protect user data.",
      date: "September 20, 2023",
      author: "Robert Kim",
      authorRole: "Security Expert",
      category: "Security",
      image: "/images/blog-placeholder-6.jpg",
      slug: "securing-your-app-best-practices"
    }
  ]

  // Create placeholder images
  const createPlaceholderImages = () => {
    for (let i = 1; i <= 6; i++) {
      const placeholderDiv = document.createElement('div')
      placeholderDiv.style.display = 'none'
      placeholderDiv.innerHTML = `
        <svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
          <rect width="800" height="400" fill="#f3f4f6" />
          <text x="400" y="200" font-family="Arial" font-size="32" text-anchor="middle" fill="#9ca3af">Blog Image Placeholder ${i}</text>
        </svg>
      `
      document.body.appendChild(placeholderDiv)
    }
  }

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
              <span>Blog</span>
              <span className="ml-1 text-primary">✍️</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Insights and 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"> resources</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              The latest news, articles, and resources from the IdeaStruct team.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="bg-muted aspect-video rounded-xl overflow-hidden">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Featured Post Image</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                  Featured
                </div>
                <span className="text-sm text-muted-foreground">October 10, 2023</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">The Complete Guide to App Blueprint Generation</h2>
              <p className="text-muted-foreground">
                Learn how to use AI-powered tools to transform your app ideas into comprehensive blueprints that developers can easily understand and implement.
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-xs font-medium">JD</span>
                </div>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Chief Technology Officer</p>
                </div>
              </div>
              <Button asChild className="gap-1">
                <Link href="/blog/complete-guide-to-app-blueprint-generation">
                  Read Article <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Latest Articles
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Insights, tutorials, and news from the IdeaStruct team
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {blogPosts.map((post, index) => (
              <div key={index} className="flex flex-col bg-card rounded-xl shadow-sm border overflow-hidden">
                <div className="aspect-video bg-muted">
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Blog Image</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {post.category}
                    </div>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-6 flex-1">{post.excerpt}</p>
                  <div className="flex items-center space-x-3 mt-auto">
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs font-medium">{post.author.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{post.author}</p>
                      <p className="text-xs text-muted-foreground">{post.authorRole}</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 border-t">
                  <Button asChild variant="ghost" className="w-full justify-center">
                    <Link href={`/blog/${post.slug}`}>
                      Read Article
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-xl text-muted-foreground">
              Get the latest articles, resources, and updates from IdeaStruct delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button>Subscribe</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link> and <Link href="/terms" className="underline">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
