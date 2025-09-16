import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    log: [
      "error",
      "warn",
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event", 
        level: "info",
      },
    ],
  });

// Query performance monitoring
prisma.$on('query', (e) => {
  const duration = Number(e.duration);
  const query = e.query.substring(0, 100) + (e.query.length > 100 ? '...' : '');
  
  if (process.env.NODE_ENV === 'development') {
    // Color code based on performance
    const emoji = duration < 100 ? '🟢' : duration < 500 ? '🟡' : '🔴';
    console.log(`${emoji} DB Query: ${duration}ms - ${query}`);
  }
  
  // Track slow queries (>500ms) in all environments
  if (duration > 500) {
    console.warn(`🐌 Slow query detected (${duration}ms):`, {
      query: query,
      duration,
      timestamp: new Date().toISOString(),
      params: e.params ? JSON.stringify(e.params).substring(0, 200) : 'none'
    });
  }
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'database_query', {
      event_category: 'Performance',
      event_label: duration > 1000 ? 'slow_query' : 'normal_query',
      value: Math.round(duration),
      non_interaction: true,
    });
  }
});

// Track database connection info
prisma.$on('info', (e) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 DB Info:', e.message);
  }
});

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Connection retry function for serverless environments
export async function connectWithRetry(retries = 3) {
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

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});
