import { NextResponse } from "next/server";

// Fallback stats
const fallbackStats = {
  totalCertifications: 63,
  averageSalaryIncrease: 18500,
  totalProviders: 15,
};

export async function GET() {
  try {
    // Try to import and use Prisma
    const { prisma } = await import("@/lib/prisma");

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
    console.error("Database connection failed, using fallback stats:", error);
    // Return fallback data instead of error
    return NextResponse.json(fallbackStats);
  }
}
