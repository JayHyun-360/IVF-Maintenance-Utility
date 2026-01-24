import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.create({
    data: {
      email: "admin@ivf.edu",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create student user
  const studentPassword = await bcrypt.hash("student123", 12);
  const student = await prisma.user.create({
    data: {
      email: "student@ivf.edu",
      name: "John Student",
      password: studentPassword,
      role: "STUDENT",
    },
  });

  console.log("Admin user created:", admin.email);
  console.log("Student user created:", student.email);
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
