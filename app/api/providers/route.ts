import { NextRequest, NextResponse } from "next/server";
import { prisma, connectWithRetry } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    await connectWithRetry();

    // Get all providers with certification counts
    const providers = await prisma.provider.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        website: true,
        logo: true,
        description: true,
        _count: {
          select: {
            certifications: true
          }
        }
      },
      orderBy: [
        { certifications: { _count: 'desc' } }, // Most certifications first
        { name: 'asc' } // Then alphabetical
      ]
    });

    // Filter out providers with no certifications
    const activeProviders = providers.filter(provider => provider._count.certifications > 0);

    await prisma.$disconnect();
    return NextResponse.json(activeProviders);

  } catch (error) {
    console.error("Error in providers API:", error);
    await prisma.$disconnect();

    return NextResponse.json(
      { error: "Failed to load providers" },
      { status: 500 }
    );
  }
}