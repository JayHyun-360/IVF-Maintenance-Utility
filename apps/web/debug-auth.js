require('dotenv').config({ path: '.env.local' });

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function debugAuth() {
  try {
    console.log("=== Debugging Authentication ===");
    
    // Check if admin user exists with correct email
    const adminUser = await prisma.user.findFirst({
      where: { email: "admin@ivf.edu" }
    });
    
    console.log("Admin user from DB:", adminUser ? {
      id: adminUser.id,
      email: adminUser.email,
      name: adminUser.name,
      role: adminUser.role
    } : "NOT FOUND");
    
    // Check if student user exists
    const studentUser = await prisma.user.findFirst({
      where: { email: "student@ivf.edu" }
    });
    
    console.log("Student user from DB:", studentUser ? {
      id: studentUser.id,
      email: studentUser.email,
      name: studentUser.name,
      role: studentUser.role
    } : "NOT FOUND");
    
    // Test the auth logic directly
    console.log("\n=== Testing Auth Logic ===");
    
    // Simulate the auth check
    const credentials = {
      email: "admin@test.com",
      password: "admin123"
    };
    
    console.log("Input credentials:", credentials.email, credentials.password);
    
    if (credentials.email.toLowerCase() === "admin@test.com" && credentials.password === "admin123") {
      console.log("✅ Demo credentials match");
      
      if (adminUser) {
        console.log("✅ Admin user found in database");
        console.log("✅ Should return user object with ID:", adminUser.id);
      } else {
        console.log("❌ Admin user NOT found in database");
      }
    } else {
      console.log("❌ Demo credentials don't match");
    }
    
  } catch (error) {
    console.error("Debug error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

debugAuth();
