import { NextRequest, NextResponse } from 'next/server'
import { getPerformanceStats, getRecentMetrics, withPerformanceMonitoring } from '@/lib/performance-monitor'

async function handleGET(request: NextRequest) {
  // Basic auth check (in production, use proper authentication)
  const authHeader = request.headers.get('authorization')
  if (process.env.NODE_ENV === 'production' && (!authHeader || authHeader !== `Bearer ${process.env.PERF_MONITOR_TOKEN}`)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const stats = getPerformanceStats()
    const recentMetrics = getRecentMetrics(50) // Last 50 requests
    
    const response = {
      timestamp: new Date().toISOString(),
      stats: {
        ...stats,
        uptime: process.uptime(),
        nodeVersion: process.version,
        platform: process.platform,
      },
      recentMetrics: recentMetrics.map(metric => ({
        ...metric,
        timestamp: metric.timestamp.toISOString(),
      })),
      insights: generateInsights(stats),
    }

    return NextResponse.json(response, { 
      headers: { 
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Performance stats error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve performance stats' }, 
      { status: 500 }
    )
  }
}

function generateInsights(stats: any) {
  const insights = []

  if (stats.averageResponseTime > 1000) {
    insights.push({
      type: 'warning',
      message: `Average response time is ${stats.averageResponseTime}ms, which is above the 1000ms threshold`,
      recommendation: 'Consider optimizing slow endpoints or adding caching'
    })
  }

  if (stats.errorRate > 5) {
    insights.push({
      type: 'error',
      message: `Error rate is ${stats.errorRate}%, which is above the 5% threshold`,
      recommendation: 'Investigate error causes and implement proper error handling'
    })
  }

  if (stats.slowRequests > stats.total * 0.1) {
    insights.push({
      type: 'warning',
      message: `${((stats.slowRequests / stats.total) * 100).toFixed(1)}% of requests are slow (>1000ms)`,
      recommendation: 'Focus on optimizing the slowest endpoints'
    })
  }

  const slowestEndpoints = Object.entries(stats.endpointBreakdown)
    .filter(([_, data]: [string, any]) => data.avgDuration > 500)
    .sort(([_, a]: [string, any], [__, b]: [string, any]) => b.avgDuration - a.avgDuration)
    .slice(0, 3)

  if (slowestEndpoints.length > 0) {
    insights.push({
      type: 'info',
      message: `Slowest endpoints: ${slowestEndpoints.map(([endpoint, data]: [string, any]) => `${endpoint} (${data.avgDuration}ms)`).join(', ')}`,
      recommendation: 'Prioritize optimizing these endpoints for better user experience'
    })
  }

  if (insights.length === 0) {
    insights.push({
      type: 'success',
      message: 'All performance metrics are within acceptable ranges',
      recommendation: 'Continue monitoring and maintain current optimization practices'
    })
  }

  return insights
}

export const GET = withPerformanceMonitoring(handleGET, '/api/performance-stats')