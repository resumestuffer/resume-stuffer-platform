import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error in categories API:", error);

    // Return fallback data on error
    return NextResponse.json(fallbackCategories, { status: 200 });
  }
}
