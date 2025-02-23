import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Floating icon component
const FloatingIcon = ({ className, children }: { className: string, children: React.ReactNode }) => (
  <div className={`absolute ${className} bg-white p-3 rounded-xl shadow-lg transform hover:scale-110 transition-transform duration-200`}>
    {children}
  </div>
)

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Floating Icons */}
      <div className="relative w-full max-w-6xl mx-auto h-screen">
        <FloatingIcon className="top-20 left-20">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </FloatingIcon>
        <FloatingIcon className="top-40 right-32">
          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </FloatingIcon>
        <FloatingIcon className="bottom-40 left-40">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </FloatingIcon>
        <FloatingIcon className="bottom-32 right-24">
          <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          </svg>
        </FloatingIcon>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-6xl font-bold tracking-tighter mb-4">
            One app, all your
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"> ideas</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            From brainstorming to implementation, manage all your app ideas in one place.
            Generate AI-powered blueprints instantly.
          </p>
          <div className="space-x-4">
            <Link href="/login">
              <Button variant="outline" size="lg">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Get started
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Generate detailed blueprints for your app ideas instantly</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Organized</h3>
              <p className="text-gray-600">Keep all your ideas in one place, easily accessible</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast</h3>
              <p className="text-gray-600">Get your app blueprint in seconds, not hours</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
