'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function TestGeminiPage() {
  const [apiStatus, setApiStatus] = useState<any>(null)
  const [testResult, setTestResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkApiStatus()
  }, [])

  const checkApiStatus = async () => {
    try {
      const response = await fetch('/api/debug-gemini')
      const data = await response.json()
      setApiStatus(data)
    } catch (err) {
      console.error('Error checking API status:', err)
      setError('Failed to check API status')
    }
  }

  const testGeminiApi = async () => {
    setIsLoading(true)
    setError(null)
    setTestResult(null)
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: `
App Idea: Test Todo App
Target Platform: web
Target Audience: Developers
Required Features: Task creation, Task completion, Task deletion
`
        })
      })
      
      const data = await response.json()
      setTestResult(data)
    } catch (err) {
      console.error('Error testing Gemini API:', err)
      setError('Failed to test Gemini API')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Gemini API Test Page</h1>
      
      <div className="space-y-8">
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">API Status</h2>
          {apiStatus ? (
            <pre className="bg-muted p-4 rounded overflow-auto max-h-[300px]">
              {JSON.stringify(apiStatus, null, 2)}
            </pre>
          ) : (
            <p>Loading API status...</p>
          )}
          <Button 
            onClick={checkApiStatus} 
            className="mt-4"
            variant="outline"
          >
            Refresh Status
          </Button>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Test Gemini API</h2>
          <p className="mb-4">Click the button below to test the Gemini API with a simple prompt.</p>
          <Button 
            onClick={testGeminiApi} 
            disabled={isLoading}
          >
            {isLoading ? 'Testing...' : 'Run Test'}
          </Button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          
          {testResult && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Test Result:</h3>
              <div className="bg-muted p-4 rounded overflow-auto max-h-[500px]">
                <pre className="whitespace-pre-wrap">
                  {testResult.content || JSON.stringify(testResult, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
