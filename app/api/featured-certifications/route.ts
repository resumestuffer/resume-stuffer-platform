import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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
    console.error("Failed to fetch featured certifications:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch certifications",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
