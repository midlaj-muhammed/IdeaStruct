'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, Lightbulb, Target, Heart } from 'lucide-react'

export default function AboutPage() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      bio: "John has over 15 years of experience in software development and product management.",
      image: "/team-placeholder.png"
    },
    {
      name: "Jane Smith",
      role: "CTO",
      bio: "Jane is an AI expert with a background in machine learning and natural language processing.",
      image: "/team-placeholder.png"
    },
    {
      name: "Michael Johnson",
      role: "Head of Product",
      bio: "Michael specializes in user experience design and product strategy.",
      image: "/team-placeholder.png"
    },
    {
      name: "Sarah Williams",
      role: "Lead Developer",
      bio: "Sarah is a full-stack developer with expertise in React, Node.js, and cloud infrastructure.",
      image: "/team-placeholder.png"
    }
  ]

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description: "We're constantly pushing the boundaries of what's possible with AI and app development."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and collaboration to create amazing products."
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from code quality to customer service."
    },
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "User-Focused",
      description: "We put our users at the center of everything we build and every decision we make."
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
              <span>About Us</span>
              <span className="ml-1 text-primary">👋</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              We're on a mission to 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"> transform ideas</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              IdeaStruct was founded with a simple goal: make it easier for anyone to turn their app ideas into reality.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">Our Story</h2>
              <div className="space-y-4 text-lg">
                <p>
                  IdeaStruct began in 2022 when our founder, John Doe, experienced firsthand the challenges of translating app ideas into structured development plans.
                </p>
                <p>
                  After spending countless hours manually creating blueprints for his own app ideas, John realized there had to be a better way. He assembled a team of AI experts and developers to create a tool that could automate this process.
                </p>
                <p>
                  Today, IdeaStruct helps thousands of entrepreneurs, developers, and businesses transform their app concepts into comprehensive blueprints that can be easily implemented.
                </p>
              </div>
            </div>
            <div className="bg-muted aspect-square rounded-xl overflow-hidden">
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Company Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Our Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-sm border flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              The talented people behind IdeaStruct
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-card rounded-xl shadow-sm border overflow-hidden">
                <div className="aspect-square bg-muted">
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Team Member</span>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Join Us CTA */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-card border rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Join Our Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team. Check out our open positions and become part of our mission to transform app development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-1">
                <Link href="/careers">
                  View Open Positions <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
