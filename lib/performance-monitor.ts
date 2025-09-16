import { NextRequest, NextResponse } from 'next/server'

export interface PerformanceMetrics {
  endpoint: string
  method: string
  duration: number
  statusCode: number
  userAgent?: string
  timestamp: Date
}

// Store performance metrics (in production, use Redis or database)
const performanceMetrics: PerformanceMetrics[] = []

export function withPerformanceMonitoring<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse> | NextResponse,
  endpoint: string
) {
  return async (...args: T): Promise<NextResponse> => {
    const startTime = Date.now()
    let response: NextResponse
    let statusCode = 200

    try {
      // Extract request from args (should be first parameter)
      const request = args[0] as NextRequest
      
      response = await handler(...args)
      statusCode = response.status
      
      const duration = Date.now() - startTime
      const userAgent = request?.headers.get('user-agent') || undefined
      
      // Log performance metrics
      const metrics: PerformanceMetrics = {
        endpoint,
        method: request?.method || 'GET',
        duration,
        statusCode,
        userAgent,
        timestamp: new Date(),
      }
      
      // Store metrics (limit to last 1000 entries to prevent memory issues)
      performanceMetrics.push(metrics)
      if (performanceMetrics.length > 1000) {
        performanceMetrics.shift()
      }
      
      // Console logging with color coding
      const emoji = duration < 100 ? '🟢' : duration < 500 ? '🟡' : duration < 1000 ? '🟠' : '🔴'
      const statusEmoji = statusCode < 400 ? '✅' : statusCode < 500 ? '⚠️' : '❌'
      
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `${emoji}${statusEmoji} API ${request?.method || 'GET'} ${endpoint}: ${duration}ms (${statusCode})`
        )
      }
      
      // Track slow API calls
      if (duration > 1000) {
        console.warn(`🐌 Slow API endpoint detected:`, {
          endpoint,
          method: request?.method || 'GET',
          duration,
          statusCode,
          timestamp: new Date().toISOString(),
          userAgent: userAgent?.substring(0, 100),
        })
      }
      
      // Add performance headers to response
      response.headers.set('X-Response-Time', `${duration}ms`)
      response.headers.set('X-Performance-Status', duration < 500 ? 'good' : 'slow')
      
      return response
    } catch (error) {
      const duration = Date.now() - startTime
      statusCode = 500
      
      console.error(`❌ API Error ${endpoint}:`, {
        duration,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      })
      
      throw error
    }
  }
}

// Get performance statistics
export function getPerformanceStats() {
  const now = Date.now()
  const last24Hours = performanceMetrics.filter(
    metric => now - metric.timestamp.getTime() < 24 * 60 * 60 * 1000
  )
  
  const stats = {
    total: last24Hours.length,
    averageResponseTime: last24Hours.length > 0 
      ? Math.round(last24Hours.reduce((sum, m) => sum + m.duration, 0) / last24Hours.length)
      : 0,
    slowRequests: last24Hours.filter(m => m.duration > 1000).length,
    errorRate: last24Hours.length > 0
      ? Math.round((last24Hours.filter(m => m.statusCode >= 400).length / last24Hours.length) * 100)
      : 0,
    endpointBreakdown: last24Hours.reduce((acc, metric) => {
      const key = `${metric.method} ${metric.endpoint}`
      if (!acc[key]) {
        acc[key] = { count: 0, avgDuration: 0, totalDuration: 0 }
      }
      acc[key].count++
      acc[key].totalDuration += metric.duration
      acc[key].avgDuration = Math.round(acc[key].totalDuration / acc[key].count)
      return acc
    }, {} as Record<string, { count: number; avgDuration: number; totalDuration: number }>),
  }
  
  return stats
}

// Export recent metrics for monitoring dashboard
export function getRecentMetrics(limit = 100) {
  return performanceMetrics
    .slice(-limit)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}