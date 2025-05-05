'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for trying out IdeaStruct",
      features: [
        "5 blueprints per month",
        "Basic AI generation",
        "Download as Markdown",
        "Email support"
      ],
      cta: "Get Started",
      href: "/register",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "For serious app creators",
      features: [
        "Unlimited blueprints",
        "Advanced AI generation",
        "Multiple export formats",
        "Priority support",
        "Team sharing",
        "Custom templates"
      ],
      cta: "Upgrade to Pro",
      href: "/register",
      highlighted: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For organizations and teams",
      features: [
        "Everything in Pro",
        "Custom integrations",
        "Dedicated account manager",
        "SSO authentication",
        "Advanced analytics",
        "SLA guarantees"
      ],
      cta: "Contact Sales",
      href: "/contact",
      highlighted: false
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
              <span>Pricing</span>
              <span className="ml-1 text-primary">💰</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Simple, transparent 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"> pricing</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Choose the plan that's right for you and start transforming your app ideas into structured blueprints.
            </p>
          </div>
        </div>
      </section>
      
      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`flex flex-col p-8 rounded-xl ${plan.highlighted ? 'border-2 border-primary shadow-lg' : 'border shadow-sm'}`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="mt-2 text-muted-foreground">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  asChild 
                  size="lg" 
                  variant={plan.highlighted ? "default" : "outline"}
                  className={plan.highlighted ? "gap-1" : ""}
                >
                  <Link href={plan.href}>
                    {plan.cta}
                    {plan.highlighted && <ArrowRight className="h-4 w-4 ml-1" />}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Everything you need to know about our pricing and plans
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Can I change plans later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle.</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Is there a free trial?</h3>
              <p className="text-muted-foreground">Yes, our Free plan allows you to generate up to 5 blueprints per month with no credit card required.</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">What's the difference between basic and advanced AI?</h3>
              <p className="text-muted-foreground">Advanced AI provides more detailed blueprints with additional sections like security considerations, scalability planning, and more specific technical recommendations.</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">Do you offer discounts?</h3>
              <p className="text-muted-foreground">We offer discounts for annual billing (save 20%) and special rates for startups, educational institutions, and non-profits.</p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xl font-semibold">How do I cancel my subscription?</h3>
              <p className="text-muted-foreground">You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Still have questions?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our team is here to help you find the perfect plan for your needs. Contact us for a personalized consultation.
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Contact Sales
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/register">
                    Get Started Free
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
