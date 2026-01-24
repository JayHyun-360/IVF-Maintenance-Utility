const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@ivf.edu" },
    update: {},
    create: {
      email: "admin@ivf.edu",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create student user
  const studentPassword = await bcrypt.hash("student123", 12);
  const student = await prisma.user.upsert({
    where: { email: "student@ivf.edu" },
    update: {},
    create: {
      email: "student@ivf.edu",
      name: "John Student",
      password: studentPassword,
      role: "STUDENT",
    },
  });

  // Create staff user
  const staffPassword = await bcrypt.hash("staff123", 12);
  const staff = await prisma.user.upsert({
    where: { email: "staff@ivf.edu" },
    update: {},
    create: {
      email: "staff@ivf.edu",
      name: "Maintenance Staff",
      password: staffPassword,
      role: "STAFF",
    },
  });

  console.log("Admin user created:", admin.email);
  console.log("Student user created:", student.email);
  console.log("Staff user created:", staff.email);
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
