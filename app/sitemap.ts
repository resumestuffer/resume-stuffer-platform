import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://resumestuffer.com'
  
  try {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/certifications`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ]

    // Get all certifications
    const certifications = await prisma.certification.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const certificationPages: MetadataRoute.Sitemap = certifications.map((cert) => ({
      url: `${baseUrl}/certifications/${cert.slug}`,
      lastModified: cert.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    // Get all blog posts (if you have a blog table)
    let blogPages: MetadataRoute.Sitemap = []
    try {
      // Check if blog table exists and get posts
      const blogPosts = await prisma.blogPost?.findMany({
        select: {
          slug: true,
          updatedAt: true,
          publishedAt: true,
        },
        where: {
          published: true,
        },
      })

      if (blogPosts) {
        blogPages = blogPosts.map((post) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        }))
      }
    } catch (error) {
      // Blog table might not exist yet, that's ok
      console.log('Blog table not found, skipping blog posts in sitemap')
    }

    // Get all categories
    const categories = await prisma.category.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}/certifications/category/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

    // Combine all pages
    const sitemap = [
      ...staticPages,
      ...certificationPages,
      ...blogPages,
      ...categoryPages,
    ]

    console.log(`Generated sitemap with ${sitemap.length} URLs`)
    
    return sitemap

  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback to static pages only if database fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/certifications`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ]
  }
}