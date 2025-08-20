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
  {
    id: 4,
    title: "Google Data Analytics Professional Certificate",
    slug: "google-data-analytics",
    description:
      "Learn data analytics fundamentals with hands-on projects using real-world datasets.",
    price: 3900,
    salaryIncrease: 18000,
    studyTimeHours: 180,
    hasGuide: true,
    enrollUrl:
      "https://www.coursera.org/professional-certificates/google-data-analytics",
    category: {
      id: 3,
      name: "Data Analytics",
      slug: "data-analytics",
      icon: "📊",
    },
    provider: { id: 2, name: "Google", slug: "google" },
  },
  {
    id: 5,
    title: "Project Management Professional (PMP)",
    slug: "pmp-certification",
    description:
      "Industry-recognized project management certification for experienced professionals.",
    price: 40500,
    salaryIncrease: 28000,
    studyTimeHours: 120,
    hasGuide: true,
    enrollUrl: "https://www.pmi.org/certifications/project-management-pmp",
    category: {
      id: 4,
      name: "Business",
      slug: "business-productivity",
      icon: "💼",
    },
    provider: { id: 3, name: "Project Management Institute", slug: "pmi" },
  },
  {
    id: 6,
    title: "Certified Information Systems Security Professional (CISSP)",
    slug: "cissp-certification",
    description:
      "Advanced cybersecurity certification for senior security professionals.",
    price: 74900,
    salaryIncrease: 35000,
    studyTimeHours: 150,
    hasGuide: true,
    enrollUrl: "https://www.isc2.org/Certifications/CISSP",
    category: { id: 1, name: "Technology", slug: "technology", icon: "💻" },
    provider: { id: 4, name: "(ISC)² ", slug: "isc2" },
  },
];

async function connectWithRetry(retries = 3) {
  const { prisma } = await import("@/lib/prisma");

  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      return prisma;
    } catch (error) {
      console.log(`Connection attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error("Failed to connect after all retries");
}

export async function GET() {
  try {
    const prisma = await connectWithRetry();

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

    await prisma.$disconnect();
    return NextResponse.json(certifications);
  } catch (error) {
    console.error("Database connection failed, using fallback data:", error);
    return NextResponse.json(fallbackCertifications);
  }
}
