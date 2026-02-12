import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Get all maintenance requests with user data (no auth required for testing)
    const requests = await prisma.maintenanceRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
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
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get stats
    const [total, pending, inProgress, completed] = await Promise.all([
      prisma.maintenanceRequest.count(),
      prisma.maintenanceRequest.count({ where: { status: "PENDING" } }),
      prisma.maintenanceRequest.count({ where: { status: "IN_PROGRESS" } }),
      prisma.maintenanceRequest.count({ where: { status: "COMPLETED" } }),
    ]);

    // Transform the data to match the frontend interface
    const transformedRequests = requests.map((request) => ({
      id: request.id,
      title: request.title,
      description: request.description,
      category: request.category,
      priority: request.priority,
      status: request.status,
      location: request.location,
      images: request.images ? JSON.parse(request.images) : [],
      documents: request.documents ? JSON.parse(request.documents) : [],
      requestedBy: request.user.name,
      requestedByEmail: request.user.email,
      assignedTo: request.assignedTo,
      createdAt: request.createdAt.toISOString(),
      updatedAt: request.updatedAt.toISOString(),
      completedAt: request.completedAt?.toISOString() || null,
      user: request.user,
      comments: request.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        userId: comment.userId,
        userName: comment.user.name,
        userEmail: comment.user.email,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
      })),
      commentCount: request._count.comments,
    }));

    const stats = [
      { label: "Total Requests", value: total },
      { label: "Pending", value: pending },
      { label: "In Progress", value: inProgress },
      { label: "Completed", value: completed },
    ];

    return NextResponse.json({
      message: "Test data loaded successfully",
      stats,
      requests: transformedRequests,
      count: transformedRequests.length,
    });
  } catch (error) {
    console.error("Error fetching test data:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
