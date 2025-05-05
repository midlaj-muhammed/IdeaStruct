'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  ArrowRight, 
  HelpCircle, 
  MessageSquare, 
  Mail, 
  FileText, 
  ChevronDown 
} from 'lucide-react'
import { useState } from 'react'

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    if (openFaq === index) {
      setOpenFaq(null)
    } else {
      setOpenFaq(index)
    }
  }

  const faqs = [
    {
      question: "How do I create my first blueprint?",
      answer: "To create your first blueprint, navigate to the Generate page from the dashboard or main menu. Fill out the form with your app idea, target platform, and any additional details. Click 'Generate Blueprint' and our AI will create a comprehensive blueprint for your app idea."
    },
    {
      question: "Can I edit my blueprint after it's generated?",
      answer: "Currently, blueprints cannot be directly edited after generation. However, you can generate a new blueprint with modified inputs if you need changes. We're working on adding editing capabilities in a future update."
    },
    {
      question: "How do I download my blueprint?",
      answer: "After generating a blueprint, you'll see a 'Download Blueprint' button on the results page and in your dashboard. Click this button to download your blueprint as a markdown file that you can view or share with others."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All your ideas and blueprints are encrypted and stored securely. We do not share your data with third parties without your consent. You can read more about our security practices in our Privacy Policy."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal for our premium plans. For enterprise plans, we also offer invoice payment options."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your Account Settings page. Navigate to Billing and click 'Cancel Subscription'. Your subscription will remain active until the end of your current billing period."
    }
  ]

  const supportOptions = [
    {
      icon: <HelpCircle className="h-8 w-8 text-primary" />,
      title: "Help Center",
      description: "Browse our comprehensive knowledge base for answers to common questions.",
      cta: "Visit Help Center",
      href: "/docs"
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      title: "Live Chat",
      description: "Chat with our support team for immediate assistance with your questions.",
      cta: "Start Chat",
      href: "#chat"
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Email Support",
      description: "Send us an email and we'll get back to you within 24 hours.",
      cta: "Email Us",
      href: "/contact"
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Documentation",
      description: "Explore our detailed documentation for in-depth information.",
      cta: "Read Docs",
      href: "/docs"
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
              <span>Support</span>
              <span className="ml-1 text-primary">🤝</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              We're here to 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"> help you</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Get the support you need to make the most of IdeaStruct.
            </p>
          </div>
        </div>
      </section>
      
      {/* Support Options */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              How Can We Help?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Choose the support option that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {supportOptions.map((option, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-sm border flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {option.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{option.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <Link href={option.href}>
                    {option.cta}
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
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Find answers to common questions about IdeaStruct
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg border overflow-hidden"
              >
                <button
                  className="flex items-center justify-between w-full p-4 text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-lg font-medium">{faq.question}</h3>
                  <ChevronDown 
                    className={`h-5 w-5 transition-transform ${openFaq === index ? 'transform rotate-180' : ''}`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="p-4 pt-0 border-t">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Contact CTA */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="space-y-4 max-w-xl">
                <h2 className="text-3xl font-bold tracking-tighter">
                  Need Personalized Help?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our support team is ready to assist you with any questions or issues you may have.
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <Button asChild size="lg" className="gap-1">
                  <Link href="/contact">
                    Contact Support <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/docs">
                    Browse Documentation
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
