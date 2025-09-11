import { NextRequest, NextResponse } from "next/server";
import { prisma, connectWithRetry } from "@/lib/prisma";

const ITEMS_PER_PAGE = 12;

// Price range definitions (matching frontend)
const PRICE_RANGES = {
  'free': { min: 0, max: 0 },
  'budget': { min: 1, max: 20000 },
  'mid': { min: 20001, max: 50000 },
  'premium': { min: 50001, max: 999999 }
};

// Study time range definitions
const STUDY_TIME_RANGES = {
  'quick': { min: 0, max: 39 },
  'medium': { min: 40, max: 100 },
  'intensive': { min: 101, max: 9999 }
};

export async function GET(request: NextRequest) {
  try {
    await connectWithRetry();

    const { searchParams } = new URL(request.url);
    
    // Extract parameters
    const search = searchParams.get("search") || "";
    const categories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const providers = searchParams.get("providers")?.split(",").filter(Boolean) || [];
    const priceRanges = searchParams.get("priceRanges")?.split(",").filter(Boolean) || [];
    const experienceLevels = searchParams.get("experienceLevels")?.split(",").filter(Boolean) || [];
    const studyTimeRanges = searchParams.get("studyTimeRanges")?.split(",").filter(Boolean) || [];
    const sort = searchParams.get("sort") || "salaryIncrease";
    const page = parseInt(searchParams.get("page") || "1");

    // Build where clause
    const where: any = {};

    // Search functionality
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { provider: { name: { contains: search, mode: "insensitive" } } },
        { category: { name: { contains: search, mode: "insensitive" } } },
        { keySkills: { hasSome: [search] } },
        { targetAudience: { hasSome: [search] } },
        { industryFocus: { hasSome: [search] } }
      ];
    }

    // Category filter
    if (categories.length > 0) {
      where.category = {
        slug: { in: categories }
      };
    }

    // Provider filter
    if (providers.length > 0) {
      where.provider = {
        slug: { in: providers }
      };
    }

    // Price range filter
    if (priceRanges.length > 0) {
      const priceConditions: any[] = [];
      
      priceRanges.forEach(rangeId => {
        const range = PRICE_RANGES[rangeId as keyof typeof PRICE_RANGES];
        if (range) {
          if (range.min === 0 && range.max === 0) {
            // Free certifications
            priceConditions.push({ price: 0 });
          } else {
            // Paid certifications in range
            priceConditions.push({
              price: {
                gte: range.min,
                lte: range.max
              }
            });
          }
        }
      });

      if (priceConditions.length > 0) {
        where.OR = where.OR ? 
          { AND: [{ OR: where.OR }, { OR: priceConditions }] } :
          { OR: priceConditions };
      }
    }

    // Experience level filter
    if (experienceLevels.length > 0) {
      where.experienceLevel = { in: experienceLevels };
    }

    // Study time range filter
    if (studyTimeRanges.length > 0) {
      const timeConditions: any[] = [];
      
      studyTimeRanges.forEach(rangeId => {
        const range = STUDY_TIME_RANGES[rangeId as keyof typeof STUDY_TIME_RANGES];
        if (range) {
          timeConditions.push({
            studyTimeHours: {
              gte: range.min,
              lte: range.max
            }
          });
        }
      });

      if (timeConditions.length > 0) {
        const existingOr = where.OR;
        if (existingOr) {
          where.AND = [
            { OR: existingOr },
            { OR: timeConditions }
          ];
          delete where.OR;
        } else {
          where.OR = timeConditions;
        }
      }
    }

    // Build orderBy clause
    let orderBy: any = { salaryIncrease: "desc" };
    
    switch (sort) {
      case "title":
        orderBy = { title: "asc" };
        break;
      case "studyTime":
        orderBy = { studyTimeHours: "asc" };
        break;
      case "popular":
        orderBy = [
          { isFeatured: "desc" },
          { price: "asc" },
          { demandLevel: "desc" },
          { salaryIncrease: "desc" }
        ];
        break;
      default:
        orderBy = { salaryIncrease: "desc" };
    }

    console.log("Enhanced API Where clause:", JSON.stringify(where, null, 2));

    // Get total count
    const totalCount = await prisma.certification.count({ where });

    // Get certifications with enhanced data
    const certifications = await prisma.certification.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        shortDescription: true,
        price: true,
        salaryIncrease: true,
        studyTimeHours: true,
        studyTimeWeeks: true,
        experienceLevel: true,
        demandLevel: true,
        hasGuide: true,
        isFeatured: true,
        enrollUrl: true,
        keySkills: true,
        targetAudience: true,
        industryFocus: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
            icon: true,
            color: true,
          },
        },
        provider: {
          select: {
            id: true,
            name: true,
            slug: true,
            website: true,
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
      appliedFilters: {
        search,
        categories,
        providers,
        priceRanges,
        experienceLevels,
        studyTimeRanges,
        sort
      }
    };

    await prisma.$disconnect();
    return NextResponse.json(result);

  } catch (error) {
    console.error("Error in enhanced certifications API:", error);
    await prisma.$disconnect();

    // Return fallback data on error
    return NextResponse.json({
      certifications: [],
      totalCount: 0,
      totalPages: 0,
      currentPage: 1,
      error: "Failed to load certifications"
    }, { status: 500 });
  }
}