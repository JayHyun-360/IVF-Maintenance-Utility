import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    console.log("=== SESSION DEBUG ===");
    console.log("Session exists:", !!session);
    console.log("Session data:", JSON.stringify(session, null, 2));

    return NextResponse.json({
      session,
      debug: {
        hasSession: !!session,
        userEmail: session?.user?.email,
        userRole: session?.user?.role,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Session debug error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    );
  }
}
