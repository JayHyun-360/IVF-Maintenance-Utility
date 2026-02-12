import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

// Load environment variables
config();

const prisma = new PrismaClient();

async function main() {
  console.log("🗑️  Clearing existing test data...");

  // Clear existing data in correct order due to foreign key constraints
  await prisma.notification.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.maintenanceRequest.deleteMany({});

  console.log("✅ Cleared existing data");

  // Create test users
  console.log("👥 Creating test users...");
  const testUsers = [];
  const userNames = [
    "Alice Johnson",
    "Bob Smith",
    "Carol Davis",
    "David Wilson",
    "Emma Brown",
    "Frank Miller",
    "Grace Taylor",
    "Henry Anderson",
    "Ivy Thomas",
    "Jack Jackson",
    "Kate White",
    "Liam Harris",
    "Mia Martin",
    "Noah Thompson",
    "Olivia Garcia",
    "Paul Martinez",
    "Quinn Robinson",
    "Ruby Clark",
    "Sam Rodriguez",
    "Tara Lewis",
  ];

  for (let i = 0; i < userNames.length; i++) {
    const name = userNames[i];
    const email = name.toLowerCase().replace(" ", ".") + "@ivf.edu";
    const hashedPassword = await bcrypt.hash("password123", 12);

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        password: hashedPassword,
        role: i < 5 ? "ADMIN" : "STUDENT", // First 5 are admins
      },
    });
    testUsers.push(user);
  }

  // Keep the original admin, student, and staff users
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

  testUsers.push(admin, student, staff);

  console.log(`✅ Created ${testUsers.length} test users`);

  // Create maintenance requests
  console.log("🔧 Creating maintenance requests...");
  const categories = [
    "PLUMBING",
    "ELECTRICAL",
    "CARPENTRY",
    "HVAC",
    "PERSONNEL",
    "CLEANING",
    "SECURITY",
    "IT",
  ];
  const priorities = ["LOW", "MEDIUM", "HIGH", "URGENT"];
  const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED"];

  const requestTemplates = [
    {
      title: "Broken Water Fountain",
      description:
        "The water fountain near the main entrance is not working properly. Students need access to drinking water.",
      location: "Main Building Lobby",
    },
    {
      title: "Malfunctioning Projector",
      description:
        "The projector in Lecture Hall A is displaying flickering images and sometimes shuts down completely during presentations.",
      location: "Building A, Lecture Hall A",
    },
    {
      title: "Broken Window",
      description:
        "One of the windows in the library is cracked and poses a safety risk. It needs immediate attention.",
      location: "Library, 2nd Floor",
    },
    {
      title: "AC Not Working",
      description:
        "The air conditioning system in Computer Lab B is not functioning, making it too hot for students to work comfortably.",
      location: "Building B, Computer Lab",
    },
    {
      title: "Leaking Ceiling",
      description:
        "There's a water leak from the ceiling in the cafeteria area, creating puddles on the floor.",
      location: "Cafeteria, Main Dining Area",
    },
    {
      title: "Broken Lockers",
      description:
        "Several lockers in the gymnasium are broken and cannot be opened by students.",
      location: "Gymnasium, Locker Room",
    },
    {
      title: "Internet Connection Issues",
      description:
        "Wi-Fi connectivity is very poor in the west wing of the building, affecting online learning.",
      location: "Building C, West Wing",
    },
    {
      title: "Broken Door Handle",
      description:
        "The door handle to the chemistry lab is broken and the door cannot be secured properly.",
      location: "Science Building, Chemistry Lab",
    },
    {
      title: "Overflowing Trash Cans",
      description:
        "Trash cans in the student lounge are overflowing and need to be emptied more frequently.",
      location: "Student Union Building",
    },
    {
      title: "Broken Elevator",
      description:
        "One of the elevators is making strange noises and sometimes stops between floors.",
      location: "Main Building, Elevator 2",
    },
    {
      title: "Parking Lot Lighting",
      description:
        "Several lights in the parking lot are out, creating safety concerns for evening students.",
      location: "Main Parking Lot",
    },
    {
      title: "Broken Chairs",
      description:
        "Multiple chairs in Classroom 205 are broken and unsafe for students to use.",
      location: "Building A, Classroom 205",
    },
    {
      title: "Water Damage",
      description:
        "There appears to be water damage on the walls in the basement storage area.",
      location: "Basement, Storage Area",
    },
    {
      title: "Fire Alarm Issue",
      description:
        "The fire alarm in the east wing has been randomly going off without cause.",
      location: "Building B, East Wing",
    },
    {
      title: "Broken Sink",
      description:
        "The sink in the art room is clogged and draining very slowly.",
      location: "Art Building, Studio 1",
    },
    {
      title: "Electrical Outlet Problems",
      description:
        "Several electrical outlets are not working in the study area.",
      location: "Library, Study Area",
    },
    {
      title: "Broken Gym Equipment",
      description:
        "The treadmill in the fitness center is making loud noises and needs maintenance.",
      location: "Gymnasium, Fitness Center",
    },
    {
      title: "Roof Leak",
      description:
        "There's a small leak in the roof above the administrative offices.",
      location: "Admin Building, 3rd Floor",
    },
    {
      title: "Broken Security Camera",
      description:
        "The security camera at the north entrance is not functioning.",
      location: "North Entrance",
    },
  ];

  const requests = [];

  for (let i = 0; i < Math.min(20, requestTemplates.length); i++) {
    const template = requestTemplates[i];
    if (!template) {
      console.log(`Warning: Template at index ${i} is undefined, skipping...`);
      continue;
    }
    const user = testUsers[i % testUsers.length];
    const category = categories[i % categories.length];
    const priority = priorities[i % priorities.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    const request = await prisma.maintenanceRequest.create({
      data: {
        title: template.title,
        description: template.description,
        category,
        priority,
        status,
        location: template.location,
        requestedBy: user.id,
        assignedTo:
          status !== "PENDING"
            ? testUsers[Math.floor(Math.random() * 5)].id
            : null, // Assign to admins if not pending
        completedAt: status === "COMPLETED" ? new Date() : null,
      },
    });

    requests.push(request);

    // Create notifications for this request
    const notificationTypes = ["new", "update", "urgent", "completed"];
    const notificationType = notificationTypes[i % notificationTypes.length];

    let notificationTitle, notificationMessage;

    switch (notificationType) {
      case "new":
        notificationTitle = "New Maintenance Request";
        notificationMessage = `${user.name} submitted a new ${priority.toLowerCase()} request: ${template.title}`;
        break;
      case "update":
        notificationTitle = "Request Status Updated";
        notificationMessage = `Request "${template.title}" status changed to ${status}`;
        break;
      case "urgent":
        notificationTitle = "Urgent Attention Required";
        notificationMessage = `High priority request needs immediate attention: ${template.title}`;
        break;
      case "completed":
        notificationTitle = "Request Completed";
        notificationMessage = `Maintenance request "${template.title}" has been completed`;
        break;
    }

    // Create notifications for admins
    for (let j = 0; j < 5; j++) {
      // First 5 users are admins
      await prisma.notification.create({
        data: {
          title: notificationTitle,
          message: notificationMessage,
          type: notificationType,
          userId: testUsers[j].id,
          requestId: request.id,
          read: Math.random() > 0.7, // 30% chance of being read
        },
      });
    }

    // Create some comments for certain requests
    if (Math.random() > 0.6) {
      // 40% chance of having comments
      const commentCount = Math.floor(Math.random() * 3) + 1; // 1-3 comments
      for (let k = 0; k < commentCount; k++) {
        const commentingUser =
          testUsers[Math.floor(Math.random() * testUsers.length)];
        const comments = [
          "I've looked into this issue and will start working on it soon.",
          "This has been resolved. Please check and confirm.",
          "Additional parts are needed. This might take a few more days.",
          "Scheduled for maintenance tomorrow morning.",
          "This is a recurring issue. We might need a permanent solution.",
        ];

        await prisma.comment.create({
          data: {
            content: comments[k % comments.length],
            requestId: request.id,
            userId: commentingUser.id,
          },
        });
      }
    }
  }

  console.log(`✅ Created ${requests.length} maintenance requests`);

  // Get final stats
  const [total, pending, inProgress, completed] = await Promise.all([
    prisma.maintenanceRequest.count(),
    prisma.maintenanceRequest.count({ where: { status: "PENDING" } }),
    prisma.maintenanceRequest.count({ where: { status: "IN_PROGRESS" } }),
    prisma.maintenanceRequest.count({ where: { status: "COMPLETED" } }),
  ]);

  const totalNotifications = await prisma.notification.count();
  const totalComments = await prisma.comment.count();

  console.log("\n📊 Test Data Summary:");
  console.log(`   Total Requests: ${total}`);
  console.log(`   Pending: ${pending}`);
  console.log(`   In Progress: ${inProgress}`);
  console.log(`   Completed: ${completed}`);
  console.log(`   Total Notifications: ${totalNotifications}`);
  console.log(`   Total Comments: ${totalComments}`);
  console.log(`   Test Users: ${testUsers.length}`);

  console.log("\n🎉 Test data creation completed successfully!");
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
