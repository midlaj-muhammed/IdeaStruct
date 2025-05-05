'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PrivacyPage() {
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
              <span>Legal</span>
              <span className="ml-1 text-primary">🔒</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
              Privacy Policy
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Last updated: October 15, 2023
            </p>
          </div>
        </div>
      </section>
      
      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h2>Introduction</h2>
            <p>
              At IdeaStruct, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
            </p>
            <p>
              Please read this Privacy Policy carefully. By accessing or using our service, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this Privacy Policy.
            </p>
            
            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul>
              <li>Register for an account</li>
              <li>Sign up for our newsletter</li>
              <li>Contact our support team</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>
              This information may include:
            </p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing information</li>
            </ul>
            
            <h3>App Ideas and Blueprints</h3>
            <p>
              When you use our service to generate blueprints, we collect the information you provide about your app ideas, including:
            </p>
            <ul>
              <li>App concept descriptions</li>
              <li>Target platforms</li>
              <li>Target audience information</li>
              <li>Feature descriptions</li>
            </ul>
            
            <h3>Usage Information</h3>
            <p>
              We automatically collect certain information about your device and how you interact with our service, including:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Referring website</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes, including:
            </p>
            <ul>
              <li>Providing and maintaining our service</li>
              <li>Improving our service</li>
              <li>Personalizing your experience</li>
              <li>Processing transactions</li>
              <li>Sending administrative emails</li>
              <li>Providing customer support</li>
              <li>Marketing and promotional purposes (with your consent)</li>
              <li>Analyzing usage patterns</li>
            </ul>
            
            <h2>How We Share Your Information</h2>
            <p>
              We may share your information with third parties in the following situations:
            </p>
            <ul>
              <li>With service providers who perform services on our behalf</li>
              <li>To comply with legal obligations</li>
              <li>To protect and defend our rights and property</li>
              <li>With your consent or at your direction</li>
            </ul>
            <p>
              We do not sell your personal information to third parties.
            </p>
            
            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your information</li>
              <li>The right to restrict processing</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@ideastruct.com.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              Our service is not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Email: privacy@ideastruct.com<br />
              Address: 123 Innovation Street, San Francisco, CA 94103, USA
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mt-12 text-center">
            <p className="text-muted-foreground mb-6">
              If you have any questions about our Privacy Policy, please contact us.
            </p>
            <Button asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
