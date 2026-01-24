import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

// Load environment variables
config();

const prisma = new PrismaClient();

// Define enums locally to avoid import issues
enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  STAFF = "STAFF",
}

enum Category {
  PLUMBING = "PLUMBING",
  ELECTRICAL = "ELECTRICAL",
  CARPENTRY = "CARPENTRY",
  PERSONNEL = "PERSONNEL",
}

enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

enum Status {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

enum NotificationType {
  REQUEST_CREATED = "REQUEST_CREATED",
  REQUEST_UPDATED = "REQUEST_UPDATED",
  REQUEST_ASSIGNED = "REQUEST_ASSIGNED",
  REQUEST_COMPLETED = "REQUEST_COMPLETED",
  COMMENT_ADDED = "COMMENT_ADDED",
  SYSTEM_ANNOUNCEMENT = "SYSTEM_ANNOUNCEMENT",
}

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
      role: Role.ADMIN,
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
      role: Role.STUDENT,
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
      role: Role.STAFF,
    },
  });

  // Create sample maintenance requests
  const sampleRequests = [
    {
      title: "Leaky Faucet in Room 201",
      description:
        "The faucet in the men's restroom on the second floor is constantly dripping. This is wasting water and creating a puddle on the floor.",
      category: Category.PLUMBING,
      priority: Priority.MEDIUM,
      location: "Building A, Room 201",
      requestedBy: student.id,
      status: Status.PENDING,
    },
    {
      title: "Broken Light Fixture",
      description:
        "The overhead light fixture in the main hallway is flickering and sometimes goes out completely. This is a safety concern.",
      category: Category.ELECTRICAL,
      priority: Priority.HIGH,
      location: "Building B, Main Hallway",
      requestedBy: student.id,
      status: Status.IN_PROGRESS,
      assignedTo: staff.id,
    },
    {
      title: "Broken Door Handle",
      description:
        "The door handle to the conference room is broken and the door cannot be opened from the outside.",
      category: Category.CARPENTRY,
      priority: Priority.MEDIUM,
      location: "Building C, Conference Room 301",
      requestedBy: student.id,
      status: Status.COMPLETED,
      assignedTo: staff.id,
      completedAt: new Date(),
    },
    {
      title: "Staff Shortage in Cafeteria",
      description:
        "The cafeteria is understaffed during lunch hours, causing long wait times for students.",
      category: Category.PERSONNEL,
      priority: Priority.HIGH,
      location: "Cafeteria Building",
      requestedBy: student.id,
      status: Status.PENDING,
    },
    {
      title: "Clogged Drain in Kitchen",
      description:
        "The kitchen sink drain is completely clogged, preventing proper dishwashing.",
      category: Category.PLUMBING,
      priority: Priority.URGENT,
      location: "Cafeteria Kitchen",
      requestedBy: student.id,
      status: Status.IN_PROGRESS,
      assignedTo: staff.id,
    },
  ];

  for (const requestData of sampleRequests) {
    const existing = await prisma.maintenanceRequest.findFirst({
      where: { title: requestData.title },
    });

    if (!existing) {
      await prisma.maintenanceRequest.create({
        data: requestData,
      });
    }
  }

  // Create sample comments
  const comments = [
    {
      content:
        "I have inspected the issue and will need to order a replacement part. Should be fixed by tomorrow.",
      requestId: "2", // This would be the actual ID from the created request
      userId: staff.id,
    },
    {
      content:
        "The door handle has been replaced. The door is now working properly.",
      requestId: "3", // This would be the actual ID from the created request
      userId: staff.id,
    },
  ];

  for (const commentData of comments) {
    await prisma.comment.create({
      data: commentData,
    });
  }

  // Create sample notifications
  const notifications = [
    {
      title: "New Maintenance Request",
      message: "A new maintenance request has been submitted by John Student",
      type: NotificationType.REQUEST_CREATED,
      userId: admin.id,
    },
    {
      title: "Request Assigned",
      message: "You have been assigned to a new maintenance request",
      type: NotificationType.REQUEST_ASSIGNED,
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
