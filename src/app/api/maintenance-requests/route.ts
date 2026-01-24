import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { Status, Category, Priority } from "@/types/database";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requests = await prisma.maintenanceRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching maintenance requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      category,
      priority,
      location,
      images,
      documents,
    } = body;

    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || "" },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const maintenanceRequest = await prisma.maintenanceRequest.create({
      data: {
        title,
        description,
        category: category as Category,
        priority: (priority as Priority) || Priority.MEDIUM,
        location,
        images: images || [],
        documents: documents || [],
        requestedBy: user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    // Create notification for admins
    const admins = await prisma.user.findMany({
      where: { role: "ADMIN" },
    });

    await prisma.notification.createMany({
      data: admins.map(
        (admin: { id: string; name: string; email: string }) => ({
          title: "New Maintenance Request",
          message: `A new maintenance request "${title}" has been submitted by ${user.name}`,
          type: "REQUEST_CREATED",
          userId: admin.id,
          requestId: maintenanceRequest.id,
        }),
      ),
    });

    return NextResponse.json(maintenanceRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating maintenance request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
