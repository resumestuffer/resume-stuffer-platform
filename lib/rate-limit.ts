// Simple in-memory rate limiting
// For production, consider Redis or external rate limiting service

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map()
  private readonly windowMs: number
  private readonly maxRequests: number

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests

    // Clean up old entries every 5 minutes
    setInterval(() => {
      const now = Date.now()
      for (const [key, entry] of this.requests.entries()) {
        if (now > entry.resetTime) {
          this.requests.delete(key)
        }
      }
    }, 5 * 60 * 1000)
  }

  check(identifier: string): { allowed: boolean; limit: number; remaining: number; resetTime: number } {
    const now = Date.now()
    const entry = this.requests.get(identifier)

    if (!entry || now > entry.resetTime) {
      // New window or expired entry
      const resetTime = now + this.windowMs
      this.requests.set(identifier, { count: 1, resetTime })
      return {
        allowed: true,
        limit: this.maxRequests,
        remaining: this.maxRequests - 1,
        resetTime,
      }
    }

    if (entry.count >= this.maxRequests) {
      // Rate limit exceeded
      return {
        allowed: false,
        limit: this.maxRequests,
        remaining: 0,
        resetTime: entry.resetTime,
      }
    }

    // Increment count
    entry.count++
    this.requests.set(identifier, entry)

    return {
      allowed: true,
      limit: this.maxRequests,
      remaining: this.maxRequests - entry.count,
      resetTime: entry.resetTime,
    }
  }
}

// Different rate limiters for different endpoints
export const newsletterRateLimit = new RateLimiter(60000, 5) // 5 requests per minute
export const apiRateLimit = new RateLimiter(60000, 60) // 60 requests per minute for general API

export function getClientIdentifier(request: Request): string {
  // Try to get real IP from headers (for production behind proxies)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIp) {
    return realIp
  }

  // Fallback to User-Agent + some randomization for development
  const userAgent = request.headers.get('user-agent') || 'unknown'
  return `${userAgent.slice(0, 50)}-${Date.now().toString().slice(-6)}`
}