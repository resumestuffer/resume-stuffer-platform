'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    // Track 404s in Google Analytics with additional context
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_not_found', {
        page_title: '404 - Page Not Found',
        page_location: window.location.href,
        referring_page: document.referrer || 'direct',
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      })
    }

    // Log to console for development debugging
    console.log('404 Error Details:', {
      current_url: window.location.href,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">Page Not Found</h2>
          <p className="text-slate-600 mb-8">
            The certification guide you're looking for might have moved or doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/certifications"
            className="block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse All Certifications
          </Link>

          <Link
            href="/"
            className="block w-full px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Looking for something specific? Try our{' '}
            <Link href="/certifications" className="text-blue-600 hover:underline">
              certification directory
            </Link>
            {' '}or{' '}
            <Link href="/blog" className="text-blue-600 hover:underline">
              career guides
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}