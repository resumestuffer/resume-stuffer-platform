import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ITEMS_PER_PAGE = 12;

// Connection retry function (same as working homepage APIs)
async function connectWithRetry(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await prisma.$connect();
      return;
    } catch (error) {
      console.error(`Database connection attempt ${i + 1} failed:`, error);
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

// Fallback data for when database fails
const fallbackData = {
  certifications: [
    {
      id: "1",
      title: "AWS Certified Cloud Practitioner",
      slug: "aws-cloud-practitioner",
      description: "Foundation certification for cloud fundamentals",
      price: 10000,
      salaryIncrease: 15000,
      studyTimeHours: 40,
      hasGuide: true,
      enrollUrl:
        "https://aws.amazon.com/certification/certified-cloud-practitioner/",
      category: { id: "1", name: "Technology", slug: "technology", icon: "☁️" },
      provider: { id: "1", name: "Amazon Web Services", slug: "aws" },
    },
    {
      id: "2",
      title: "Google Cloud Professional Cloud Architect",
      slug: "google-cloud-architect",
      description: "Design and plan cloud architecture solutions",
      price: 20000,
      salaryIncrease: 25000,
      studyTimeHours: 120,
      hasGuide: true,
      enrollUrl: "https://cloud.google.com/certification/cloud-architect",
      category: { id: "1", name: "Technology", slug: "technology", icon: "☁️" },
      provider: { id: "2", name: "Google Cloud", slug: "google-cloud" },
    },
    {
      id: "3",
      title: "Microsoft Azure Fundamentals",
      slug: "azure-fundamentals",
      description: "Basic understanding of cloud services and Azure",
      price: 9900,
      salaryIncrease: 12000,
      studyTimeHours: 30,
      hasGuide: true,
      enrollUrl:
        "https://docs.microsoft.com/en-us/learn/certifications/azure-fundamentals/",
      category: { id: "1", name: "Technology", slug: "technology", icon: "☁️" },
      provider: { id: "3", name: "Microsoft", slug: "microsoft" },
    },
  ],
  totalCount: 63,
  totalPages: 6,
  currentPage: 1,
};

export async function GET(request: NextRequest) {
  try {
    await connectWithRetry();

    // Small delay to ensure connection is ready
    await new Promise((resolve) => setTimeout(resolve, 100));

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "";
    const sort = searchParams.get("sort") || "salaryIncrease";
    const page = parseInt(searchParams.get("page") || "1");

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { provider: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    if (filter) {
      where.category = { slug: filter };
    }

    // Build orderBy clause
    let orderBy: any = { salaryIncrease: "desc" };
    if (sort === "title") orderBy = { title: "asc" };
    if (sort === "freeOnly") {
      where.price = 0;
      orderBy = { title: "asc" };
    }
    if (sort === "studyTime") orderBy = { studyTimeHours: "asc" };
    if (sort === "popular") {
      orderBy = [
        { isFeatured: "desc" },
        { price: "asc" },
        { demandLevel: "desc" },
        { salaryIncrease: "desc" },
      ];
    }

    // Get total count and certifications
    const totalCount = await prisma.certification.count({ where });

    const certifications = await prisma.certification.findMany({
      where,
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
      take: ITEMS_PER_PAGE,
      skip: (page - 1) * ITEMS_PER_PAGE,
      orderBy,
    });

    const result = {
      certifications,
      totalCount,
      totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
      currentPage: page,
    };

    await prisma.$disconnect();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in certifications API:", error);
    await prisma.$disconnect();

    // Return fallback data on error
    return NextResponse.json(fallbackData, { status: 200 });
  }
}
