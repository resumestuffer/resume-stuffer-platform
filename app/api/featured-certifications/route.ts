import { NextResponse } from "next/server";

// Fallback data in case database fails
const fallbackCertifications = [
  {
    id: 1,
    title: "AWS Cloud Practitioner",
    slug: "aws-cloud-practitioner",
    description:
      "Learn cloud computing fundamentals and AWS core services. Perfect entry point into cloud careers.",
    price: 10000,
    salaryIncrease: 15000,
    studyTimeHours: 40,
    hasGuide: true,
    enrollUrl: "https://aws.amazon.com/training/",
    category: { id: 1, name: "Technology", slug: "technology", icon: "💻" },
    provider: { id: 1, name: "Amazon Web Services", slug: "aws" },
  },
  {
    id: 2,
    title: "Google Analytics 4",
    slug: "google-analytics-4",
    description:
      "Master the latest version of Google Analytics. Essential for digital marketing professionals.",
    price: 0,
    salaryIncrease: 12000,
    studyTimeHours: 25,
    hasGuide: true,
    enrollUrl: "https://skillshop.withgoogle.com/",
    category: {
      id: 2,
      name: "Digital Marketing",
      slug: "digital-marketing",
      icon: "📱",
    },
    provider: { id: 2, name: "Google", slug: "google" },
  },
  {
    id: 3,
    title: "AWS Solutions Architect Associate",
    slug: "aws-solutions-architect-associate",
    description:
      "Design scalable and reliable AWS architectures. High-demand certification for cloud architects.",
    price: 15000,
    salaryIncrease: 25000,
    studyTimeHours: 80,
    hasGuide: true,
    enrollUrl: "https://aws.amazon.com/training/",
    category: { id: 1, name: "Technology", slug: "technology", icon: "💻" },
    provider: { id: 1, name: "Amazon Web Services", slug: "aws" },
  },
];

export async function GET() {
  try {
    // Try to import and use Prisma
    const { prisma } = await import("@/lib/prisma");

    const certifications = await prisma.certification.findMany({
      where: {
        isFeatured: true,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        price: true,
        salaryIncrease: true,
        studyTimeHours: true,
        hasGuide: true,
        enrollUrl: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      take: 6,
      orderBy: {
        salaryIncrease: "desc",
      },
    });

    return NextResponse.json(certifications);
  } catch (error) {
    console.error("Database connection failed, using fallback data:", error);
    // Return fallback data instead of error
    return NextResponse.json(fallbackCertifications);
  }
}
