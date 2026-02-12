import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const priority = searchParams.get("priority");
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "50");

    // Build where clause
    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (category) where.category = category;

    // Fetch maintenance requests with user data
    const requests = await prisma.maintenanceRequest.findMany({
      where,
      include: {
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
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: limit,
    });

    // Fetch user data separately to avoid relation issues
    const userIds = [...new Set(requests.map((req) => req.requestedBy))];
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, name: true, email: true },
    });

    const userMap = users.reduce(
      (acc, user) => {
        acc[user.id] = user;
        return acc;
      },
      {} as Record<string, (typeof users)[0]>,
    );

    // Transform the data to match the frontend interface
    const transformedRequests = requests.map((request) => {
      const user = userMap[request.requestedBy];
      return {
        id: request.id,
        title: request.title,
        description: request.description,
        category: request.category,
        priority: request.priority,
        status: request.status,
        location: request.location,
        images: request.images ? JSON.parse(request.images) : [],
        documents: request.documents ? JSON.parse(request.documents) : [],
        requestedBy: user?.name || "Unknown User",
        requestedByEmail: user?.email || "unknown@example.com",
        assignedTo: request.assignedTo,
        createdAt: request.createdAt.toISOString(),
        updatedAt: request.updatedAt.toISOString(),
        completedAt: request.completedAt?.toISOString() || null,
        user: user || {
          id: request.requestedBy,
          name: "Unknown User",
          email: "unknown@example.com",
        },
        comments: request.comments.map((comment) => ({
          id: comment.id,
          content: comment.content,
          userId: comment.userId,
          userName: comment.user?.name || "Unknown User",
          userEmail: comment.user?.email || "unknown@example.com",
          createdAt: comment.createdAt.toISOString(),
          updatedAt: comment.updatedAt.toISOString(),
        })),
        commentCount: request._count.comments,
      };
    });

    return NextResponse.json(transformedRequests);
  } catch (error) {
    console.error("Error fetching admin requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
