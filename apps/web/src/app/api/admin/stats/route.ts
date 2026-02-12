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

    // Get current date and date 30 days ago for trend calculation
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const [
      total,
      pending,
      inProgress,
      completed,
      totalThirtyDaysAgo,
      pendingThirtyDaysAgo,
      inProgressThirtyDaysAgo,
      completedThirtyDaysAgo,
    ] = await Promise.all([
      // Current counts
      prisma.maintenanceRequest.count(),
      prisma.maintenanceRequest.count({ where: { status: "PENDING" } }),
      prisma.maintenanceRequest.count({ where: { status: "IN_PROGRESS" } }),
      prisma.maintenanceRequest.count({ where: { status: "COMPLETED" } }),
      // Counts from 30 days ago
      prisma.maintenanceRequest.count({
        where: { createdAt: { lt: thirtyDaysAgo } },
      }),
      prisma.maintenanceRequest.count({
        where: { status: "PENDING", createdAt: { lt: thirtyDaysAgo } },
      }),
      prisma.maintenanceRequest.count({
        where: { status: "IN_PROGRESS", createdAt: { lt: thirtyDaysAgo } },
      }),
      prisma.maintenanceRequest.count({
        where: { status: "COMPLETED", createdAt: { lt: thirtyDaysAgo } },
      }),
    ]);

    // Calculate trends
    const calculateTrend = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? "+100%" : "0%";
      const change = ((current - previous) / previous) * 100;
      return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
    };

    const stats = [
      {
        label: "Total Requests",
        value: total,
        icon: "📊",
        trend: calculateTrend(total, totalThirtyDaysAgo),
        color: "#6366f1",
      },
      {
        label: "Pending",
        value: pending,
        icon: "⏳",
        trend: calculateTrend(pending, pendingThirtyDaysAgo),
        color: "#f59e0b",
      },
      {
        label: "In Progress",
        value: inProgress,
        icon: "⚙️",
        trend: calculateTrend(inProgress, inProgressThirtyDaysAgo),
        color: "#3b82f6",
      },
      {
        label: "Completed",
        value: completed,
        icon: "✅",
        trend: calculateTrend(completed, completedThirtyDaysAgo),
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
