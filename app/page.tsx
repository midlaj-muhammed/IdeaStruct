import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ArrowRight, Zap, Layers, Clock, Check, Star } from 'lucide-react'

export default function Home() {
  return (
    <main className="overflow-hidden">
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
        <div className="absolute bottom-0 left-0 -z-10 transform -translate-x-1/2 translate-y-1/4">
          <div className="w-[300px] h-[300px] rounded-full bg-primary/20 blur-[100px]"></div>
        </div>

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
              <span>Introducing IdeaStruct</span>
              <span className="ml-1 text-primary">✨</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Transform your app ideas into
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500"> structured blueprints</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl">
              From concept to implementation, IdeaStruct helps you organize, develop, and bring your app ideas to life with AI-powered insights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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

            <div className="w-full max-w-5xl rounded-xl border bg-card p-2 shadow-lg">
              <div className="rounded-lg overflow-hidden">
                <picture>
                  <source srcSet="/images/dashboard-preview.svg" type="image/svg+xml" />
                  <Image
                    src="/images/dashboard-preview.png"
                    alt="IdeaStruct Dashboard Preview"
                    width={1200}
                    height={675}
                    className="w-full h-auto"
                    priority
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Everything you need to organize and develop your app ideas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-xl shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-muted-foreground">Generate detailed blueprints for your app ideas with advanced AI technology</p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organized</h3>
              <p className="text-muted-foreground">Keep all your ideas in one place with an intuitive dashboard and organization tools</p>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border flex flex-col items-center text-center">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast</h3>
              <p className="text-muted-foreground">Get your app blueprint in seconds, not hours, with our optimized generation process</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Three simple steps to transform your idea into a structured blueprint
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative flex flex-col items-center text-center">
              <div className="absolute top-10 left-1/2 w-full h-0.5 bg-border hidden md:block"></div>
              <div className="relative z-10 h-20 w-20 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Describe Your Idea</h3>
              <p className="text-muted-foreground">Tell us about your app concept, target audience, and key features</p>
            </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="absolute top-10 left-1/2 w-full h-0.5 bg-border hidden md:block"></div>
              <div className="relative z-10 h-20 w-20 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
              <p className="text-muted-foreground">Our AI analyzes your idea and generates a comprehensive blueprint</p>
            </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="relative z-10 h-20 w-20 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Blueprint</h3>
              <p className="text-muted-foreground">Download your complete blueprint with technical specifications and roadmap</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Join thousands of satisfied users who have transformed their ideas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-card p-8 rounded-xl shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "IdeaStruct helped me transform my vague app idea into a detailed blueprint that I could share with developers. Saved me weeks of planning!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">JD</span>
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-muted-foreground">Startup Founder</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "The AI-generated tech stack recommendations were spot on for my project. I was able to start development right away with confidence."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">JS</span>
                </div>
                <div>
                  <h4 className="font-semibold">Jane Smith</h4>
                  <p className="text-sm text-muted-foreground">Developer</p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                "As a non-technical founder, IdeaStruct gave me the language and structure I needed to communicate my vision effectively to my development team."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <span className="text-primary font-semibold">RJ</span>
                </div>
                <div>
                  <h4 className="font-semibold">Robert Johnson</h4>
                  <p className="text-sm text-muted-foreground">Entrepreneur</p>
                </div>
              </div>
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
                  Ready to Structure Your Ideas?
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join thousands of users who are turning their app ideas into reality with IdeaStruct.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>AI-powered blueprint generation</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Organized idea management</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Technical specifications and roadmaps</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col space-y-3">
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
        </div>
      </section>
    </main>
  )
}
