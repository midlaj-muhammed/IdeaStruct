import IdeaForm from '@/components/IdeaForm'
import { FileCode, Layers, Download, ArrowRight } from 'lucide-react'

export default function GeneratePage() {
  const steps = [
    {
      icon: <FileCode className="w-6 h-6" />,
      title: "Describe Your Idea",
      description: "Tell us about your app concept and target audience"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Get Tech Stack",
      description: "Receive tailored technology recommendations"
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Download Blueprint",
      description: "Get your complete development plan"
    }
  ]

  return (
    <main className="flex flex-col">
      {/* Hero Section with gradient background */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/80 -z-10"></div>

        {/* Background pattern */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        {/* Accent elements */}
        <div className="absolute top-0 right-0 -z-10 transform translate-x-1/2 -translate-y-1/4">
          <div className="w-[200px] h-[200px] rounded-full bg-primary/20 blur-[80px]"></div>
        </div>

        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
              <span>Blueprint Generator</span>
              <span className="ml-1 text-primary">✨</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
              Generate Your App Blueprint
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Transform your app idea into a comprehensive development blueprint in minutes.
            </p>
          </div>

          {/* Steps Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-card border shadow-sm p-6 rounded-xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <div className="text-primary">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-8 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            {/* Form Card */}
            <div className="bg-card border shadow-sm rounded-xl p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Enter Your App Details</h2>
                <p className="text-muted-foreground">
                  Fill out the form below to generate a detailed blueprint for your app idea.
                </p>
              </div>
              <IdeaForm />
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 border rounded-xl bg-muted/50">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <ArrowRight className="mr-2 h-5 w-5 text-primary" />
                What happens next?
              </h3>
              <p className="text-muted-foreground">
                After submitting your idea, our AI will analyze it and generate a comprehensive blueprint including technical specifications, architecture recommendations, and implementation steps. You can download the blueprint or save it to your account.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
