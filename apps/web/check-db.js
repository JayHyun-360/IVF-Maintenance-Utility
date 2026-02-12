const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function checkData() {
  try {
    console.log("Checking database contents...");
    
    // Check users
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users:`);
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    // Check maintenance requests
    const requests = await prisma.maintenanceRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    console.log(`\nFound ${requests.length} maintenance requests:`);
    requests.forEach(request => {
      console.log(`- ${request.title} - Status: ${request.status} - By: ${request.user?.name || 'Unknown'}`);
    });
    
    // Check notifications
    const notifications = await prisma.notification.findMany();
    console.log(`\nFound ${notifications.length} notifications`);
    
  } catch (error) {
    console.error("Error checking database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
