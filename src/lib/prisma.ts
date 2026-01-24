import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

let prisma: PrismaClient | null = null;

// Skip database connection during build
if (typeof window !== "undefined") {
  // Client-side - don't initialize Prisma
  prisma = null;
} else if (
  process.env.NODE_ENV === "production" &&
  !process.env.DATABASE_URL?.includes("localhost")
) {
  // Production with real database
  prisma = globalForPrisma.prisma ?? new PrismaClient();
} else {
  // Development or build time - mock or skip
  prisma = null;
}

if (
  process.env.NODE_ENV !== "production" &&
  typeof window === "undefined" &&
  prisma
) {
  globalForPrisma.prisma = prisma;
}

export { prisma };
