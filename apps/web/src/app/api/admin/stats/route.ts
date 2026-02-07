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

    const [total, pending, inProgress, completed] = await Promise.all([
      prisma.maintenanceRequest.count(),
      prisma.maintenanceRequest.count({ where: { status: "PENDING" } }),
      prisma.maintenanceRequest.count({ where: { status: "IN_PROGRESS" } }),
      prisma.maintenanceRequest.count({ where: { status: "COMPLETED" } }),
    ]);

    // Calculate trends (mocked for now, or could calculate from past dates)
    const stats = [
      {
        label: "Total Requests",
        value: total,
        icon: "📊",
        trend: "+0%",
        color: "#6366f1",
      },
      {
        label: "Pending",
        value: pending,
        icon: "⏳",
        trend: "+0%",
        color: "#f59e0b",
      },
      {
        label: "In Progress",
        value: inProgress,
        icon: "⚙️",
        trend: "+0%",
        color: "#3b82f6",
      },
      {
        label: "Completed",
        value: completed,
        icon: "✅",
        trend: "+0%",
        color: "#10b981",
      },
    ];

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
