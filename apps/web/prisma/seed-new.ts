import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

// Load environment variables
config();

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

  // Create sample maintenance requests
  const sampleRequests = [
    {
      title: "Leaky Faucet in Room 201",
      description:
        "The faucet in the men's restroom on the second floor is constantly dripping. This is wasting water and creating a puddle on the floor.",
      category: "PLUMBING",
      priority: "MEDIUM",
      location: "Building A, Room 201",
      requestedBy: student.id,
      status: "PENDING",
    },
    {
      title: "Broken Light Fixture",
      description:
        "The overhead light fixture in the main hallway is flickering and sometimes goes out completely. This is a safety concern.",
      category: "ELECTRICAL",
      priority: "HIGH",
      location: "Building B, Main Hallway",
      requestedBy: student.id,
      status: "IN_PROGRESS",
      assignedTo: staff.id,
    },
    {
      title: "Broken Door Handle",
      description:
        "The door handle to the conference room is broken and the door cannot be opened from the outside.",
      category: "CARPENTRY",
      priority: "MEDIUM",
      location: "Building C, Conference Room 301",
      requestedBy: student.id,
      status: "COMPLETED",
      assignedTo: staff.id,
      completedAt: new Date(),
    },
    {
      title: "Staff Shortage in Cafeteria",
      description:
        "The cafeteria is understaffed during lunch hours, causing long wait times for students.",
      category: "PERSONNEL",
      priority: "HIGH",
      location: "Cafeteria Building",
      requestedBy: student.id,
      status: "PENDING",
    },
    {
      title: "Clogged Drain in Kitchen",
      description:
        "The kitchen sink drain is completely clogged, preventing proper dishwashing.",
      category: "PLUMBING",
      priority: "URGENT",
      location: "Cafeteria Kitchen",
      requestedBy: student.id,
      status: "IN_PROGRESS",
      assignedTo: staff.id,
    },
  ];

  // Create requests first and get their IDs
  const createdRequests = [];
  for (const requestData of sampleRequests) {
    const existing = await prisma.maintenanceRequest.findFirst({
      where: { title: requestData.title },
    });

    if (!existing) {
      const created = await prisma.maintenanceRequest.create({
        data: requestData,
      });
      createdRequests.push(created);
    }
  }

  // Create sample comments after requests are created
  const comments = [
    {
      content:
        "I have inspected the issue and will need to order a replacement part. Should be fixed by tomorrow.",
      requestId: "", // Will be set after creating requests
      userId: staff.id,
    },
    {
      content:
        "The door handle has been replaced. The door is now working properly.",
      requestId: "", // Will be set after creating requests
      userId: staff.id,
    },
  ];

  // Update comments with actual request IDs and create them
  if (createdRequests.length >= 2) {
    comments[0].requestId = createdRequests[1].id; // Second request
    comments[1].requestId = createdRequests[2].id; // Third request

    for (const commentData of comments) {
      if (commentData.requestId) {
        await prisma.comment.create({
          data: commentData,
        });
      }
    }
  }

  // Create sample notifications
  const notifications = [
    {
      title: "New Maintenance Request",
      message: "A new maintenance request has been submitted by John Student",
      type: "REQUEST_CREATED",
      userId: admin.id,
    },
    {
      title: "Request Assigned",
      message: "You have been assigned to a new maintenance request",
      type: "REQUEST_ASSIGNED",
      userId: staff.id,
    },
  ];

  for (const notificationData of notifications) {
    await prisma.notification.create({
      data: notificationData,
    });
  }

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
