import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test environment variables
    const dbUrl = process.env.DATABASE_URL;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log("Environment check:");
    console.log("DATABASE_URL present:", !!dbUrl);
    console.log("DATABASE_URL ends with 6543:", dbUrl?.includes(":6543"));
    console.log("SUPABASE_URL present:", !!supabaseUrl);
    console.log("SUPABASE_KEY present:", !!supabaseKey);

    // Test Prisma import
    const { prisma } = await import("@/lib/prisma");
    console.log("Prisma imported successfully");

    // Test simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log("Database query successful:", result);

    return NextResponse.json({
      success: true,
      envVars: {
        dbUrl: !!dbUrl,
        dbUrlPort: dbUrl?.includes(":6543") ? "6543" : "5432 or other",
        supabaseUrl: !!supabaseUrl,
        supabaseKey: !!supabaseKey,
      },
      testQuery: result,
    });
  } catch (error) {
    console.error("Connection test failed:", error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      envVars: {
        dbUrl: !!process.env.DATABASE_URL,
        dbUrlPort: process.env.DATABASE_URL?.includes(":6543")
          ? "6543"
          : "5432 or other",
        supabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
    });
  }
}
