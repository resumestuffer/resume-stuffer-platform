import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalCerts = await prisma.certification.count();
    const avgSalaryIncrease = await prisma.certification.aggregate({
      _avg: {
        salaryIncrease: true,
      },
    });
    const totalProviders = await prisma.provider.count();

    return NextResponse.json({
      totalCertifications: totalCerts || 0,
      averageSalaryIncrease: Math.round(
        avgSalaryIncrease._avg.salaryIncrease || 18500
      ),
      totalProviders: totalProviders || 0,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch stats",
        details: error instanceof Error ? error.message : "Unknown error",
        // Fallback data
        totalCertifications: 63,
        averageSalaryIncrease: 18500,
        totalProviders: 15,
      },
      { status: 500 }
    );
  }
}
