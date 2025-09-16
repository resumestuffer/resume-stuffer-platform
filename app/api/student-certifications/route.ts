import { NextRequest, NextResponse } from "next/server";
import { prisma, connectWithRetry } from "@/lib/prisma";
import { withPerformanceMonitoring } from "@/lib/performance-monitor";

async function handleGET(request: NextRequest) {
  try {
    await connectWithRetry();

    const { searchParams } = new URL(request.url);
    
    // Extract parameters
    const pathway = searchParams.get("pathway") || "";
    const limit = parseInt(searchParams.get("limit") || "12");

    // Base query for student-friendly certifications
    const where: any = {
      isHighSchoolReady: true,
      isActive: true
    };

    // Add pathway-specific filtering
    if (pathway) {
      switch (pathway) {
        case "college-prep":
          where.OR = [
            { pathwayType: { hasSome: ["College Prep"] } },
            { collegeCredit: true },
            { slug: { in: ["ap-computer-science-a", "ap-seminar", "ap-research"] } },
            { slug: { contains: "delf-french" } },
            { slug: { contains: "dele-spanish" } },
            { slug: { contains: "hsk-level" } }
          ];
          break;
        case "tech-careers":
          where.provider = { slug: "comptia" };
          where.slug = { in: ["comptia-itf-plus-fundamentals", "comptia-a-plus-high-school", "comptia-network-plus-student", "comptia-security-plus-student"] };
          break;
        case "skilled-trades":
          where.OR = [
            { slug: { contains: "osha" } },
            { slug: { contains: "aws-" } },
            { pathwayType: { hasSome: ["Apprenticeship", "Trade School"] } }
          ];
          break;
        case "business-skills":
          where.OR = [
            { slug: { contains: "microsoft-office" } },
            { slug: { contains: "google-analytics" } },
            { industryFocus: { hasSome: ["Business Administration", "Office Work"] } }
          ];
          break;
      }
    }

    console.log("Student API Where clause:", JSON.stringify(where, null, 2));

    // Get student-friendly certifications
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
        careerOutcomes: true,
        minimumAge: true,
        typicalAge: true,
        pathwayType: true,
        isHighSchoolReady: true,
        collegeCredit: true,
        apprenticeshipPrep: true,
        examCode: true,
        validityYears: true,
        examFormat: true,
        examDuration: true,
        passingScore: true,
        passRate: true,
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
      take: limit,
      orderBy: [
        { isFeatured: "desc" },
        { salaryIncrease: "desc" },
        { price: "asc" }
      ],
    });

    // Get pathway summary stats
    const totalStudentCerts = await prisma.certification.count({
      where: { isHighSchoolReady: true, isActive: true }
    });

    const avgSalaryIncrease = await prisma.certification.aggregate({
      where: { isHighSchoolReady: true, isActive: true },
      _avg: { salaryIncrease: true }
    });

    const pathwayStats = await prisma.certification.groupBy({
      by: ['pathwayType'],
      where: { isHighSchoolReady: true, isActive: true },
      _count: { pathwayType: true }
    });

    const result = {
      certifications,
      stats: {
        total: totalStudentCerts,
        averageSalaryIncrease: Math.round(avgSalaryIncrease._avg.salaryIncrease || 0),
        pathways: pathwayStats.length
      },
      appliedFilters: {
        pathway,
        limit
      }
    };

    await prisma.$disconnect();
    return NextResponse.json(result);

  } catch (error) {
    console.error("Error in student certifications API:", error);
    await prisma.$disconnect();

    // Return fallback data on error
    return NextResponse.json({
      certifications: [],
      stats: {
        total: 0,
        averageSalaryIncrease: 0,
        pathways: 0
      },
      error: "Failed to load student certifications"
    }, { status: 500 });
  }
}

export const GET = withPerformanceMonitoring(handleGET, '/api/student-certifications');