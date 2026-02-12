require("dotenv").config({ path: ".env.local" });

console.log("Environment variables check:");
console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function quickCheck() {
  try {
    const userCount = await prisma.user.count();
    const requestCount = await prisma.maintenanceRequest.count();
    console.log(`Database: ${userCount} users, ${requestCount} requests`);

    // Check admin user specifically
    const adminUser = await prisma.user.findFirst({
      where: { email: "admin@ivf.edu" },
    });
    console.log("Admin user exists:", !!adminUser, adminUser?.id);
  } catch (error) {
    console.error("Database error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

quickCheck();
