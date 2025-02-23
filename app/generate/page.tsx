import IdeaForm from '@/components/IdeaForm'
import { Icons } from '@/components/icons'

export default function GeneratePage() {
  const steps = [
    {
      icon: <Icons.blueprint className="w-6 h-6" />,
      title: "Describe Your Idea",
      description: "Tell us about your app concept and target audience"
    },
    {
      icon: <Icons.stack className="w-6 h-6" />,
      title: "Get Tech Stack",
      description: "Receive tailored technology recommendations"
    },
    {
      icon: <Icons.download className="w-6 h-6" />,
      title: "Download Blueprint",
      description: "Get your complete development plan"
    }
  ]

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Generate Your Blueprint
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transform your app idea into a comprehensive development blueprint in minutes.
            </p>
          </div>

          {/* Steps Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-md p-6 rounded-2xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="max-w-4xl mx-auto relative">
            {/* Floating Icons Background */}
            <div className="absolute inset-0 w-full h-full -z-10">
              <div className="floating-icons">
                <div className="floating-icon" style={{ top: '-10%', left: '-5%' }}>
                  <div className="w-16 h-16 bg-blue-500/20 rounded-2xl" />
                </div>
                <div className="floating-icon" style={{ top: '30%', right: '-10%' }}>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-2xl" />
                </div>
                <div className="floating-icon" style={{ bottom: '-5%', left: '20%' }}>
                  <div className="w-20 h-20 bg-orange-500/20 rounded-2xl" />
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-3xl p-8">
              <IdeaForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
