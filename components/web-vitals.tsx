'use client'

import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'
import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (command: string, trackingId: string, config?: any) => void
  }
}

// Thresholds for Web Vitals (good/needs improvement/poor)
const WEB_VITALS_THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
}

function sendToGoogleAnalytics({ name, delta, value, id }: {
  name: string
  delta: number
  value: number
  id: string
}) {
  // Send to Google Analytics as custom event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      non_interaction: true,
      custom_parameter_1: getRating(name, value),
    })
  }
}

function sendToConsole({ name, delta, value, id }: {
  name: string
  delta: number
  value: number
  id: string
}) {
  const rating = getRating(name, value)
  const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌'
  
  console.log(
    `%c${emoji} ${name}: ${Math.round(name === 'CLS' ? value * 1000 : value)}ms (${rating})`,
    `color: ${rating === 'good' ? 'green' : rating === 'needs-improvement' ? 'orange' : 'red'}; font-weight: bold`
  )
}

function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = WEB_VITALS_THRESHOLDS[metricName as keyof typeof WEB_VITALS_THRESHOLDS]
  if (!thresholds) return 'good'
  
  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.poor) return 'needs-improvement'
  return 'poor'
}

export default function WebVitals() {
  useEffect(() => {
    // Track Core Web Vitals
    onCLS((metric) => {
      sendToGoogleAnalytics(metric)
      sendToConsole(metric)
    })
    
    onFCP((metric) => {
      sendToGoogleAnalytics(metric)
      sendToConsole(metric)
    })
    
    
    onLCP((metric) => {
      sendToGoogleAnalytics(metric)
      sendToConsole(metric)
    })
    
    onTTFB((metric) => {
      sendToGoogleAnalytics(metric)
      sendToConsole(metric)
    })
    
    // Track Interaction to Next Paint (INP) - replacing FID
    onINP((metric) => {
      sendToGoogleAnalytics(metric)
      sendToConsole(metric)
    })
  }, [])

  // Component doesn't render anything, just tracks metrics
  return null
}