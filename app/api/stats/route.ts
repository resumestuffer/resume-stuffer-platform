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
      totalCertifications: totalCerts,
      averageSalaryIncrease: Math.round(
        avgSalaryIncrease._avg.salaryIncrease || 0
      ),
      totalProviders,
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
