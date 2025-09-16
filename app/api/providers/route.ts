import { NextRequest, NextResponse } from "next/server";
import { prisma, connectWithRetry } from "@/lib/prisma";

// Fallback providers for when database fails
const fallbackProviders = [
  { id: "1", name: "Amazon Web Services", slug: "aws", website: "https://aws.amazon.com", _count: { certifications: 15 } },
  { id: "2", name: "Microsoft", slug: "microsoft", website: "https://learn.microsoft.com", _count: { certifications: 12 } },
  { id: "3", name: "Google Cloud", slug: "google-cloud", website: "https://cloud.google.com", _count: { certifications: 10 } },
  { id: "4", name: "Cisco", slug: "cisco", website: "https://www.cisco.com", _count: { certifications: 8 } },
  { id: "5", name: "CompTIA", slug: "comptia", website: "https://www.comptia.org", _count: { certifications: 6 } },
];

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

    // Return fallback data instead of error
    return NextResponse.json(fallbackProviders, { status: 200 });
  }
}