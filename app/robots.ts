import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Block API endpoints and any admin pages
    },
    sitemap: 'https://resumestuffer.com/sitemap.xml',
    host: 'https://resumestuffer.com',
  }
}