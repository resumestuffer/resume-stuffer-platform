import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

// Fallback categories for when database fails
const fallbackCategories = [
  { id: "1", name: "Technology", slug: "technology" },
  { id: "2", name: "Digital Marketing", slug: "digital-marketing" },
  { id: "3", name: "Data & Analytics", slug: "data-analytics" },
  { id: "4", name: "Business & Productivity", slug: "business-productivity" },
  { id: "5", name: "Design & Creative", slug: "design-creative" },
];

export async function GET() {
  try {
    await connectWithRetry();

    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    await prisma.$disconnect();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error in categories API:", error);
    await prisma.$disconnect();

    // Return fallback data on error
    return NextResponse.json(fallbackCategories, { status: 200 });
  }
}
