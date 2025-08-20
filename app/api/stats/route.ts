import { NextResponse } from "next/server";

// Fallback stats
const fallbackStats = {
  totalCertifications: 63,
  averageSalaryIncrease: 18500,
  totalProviders: 15,
};

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

    const totalCerts = await prisma.certification.count();
    const avgSalaryIncrease = await prisma.certification.aggregate({
      _avg: {
        salaryIncrease: true,
      },
    });
    const totalProviders = await prisma.provider.count();

    await prisma.$disconnect();

    return NextResponse.json({
      totalCertifications: totalCerts || 0,
      averageSalaryIncrease: Math.round(
        avgSalaryIncrease._avg.salaryIncrease || 18500
      ),
      totalProviders: totalProviders || 0,
    });
  } catch (error) {
    console.error("Database connection failed, using fallback stats:", error);
    return NextResponse.json(fallbackStats);
  }
}
