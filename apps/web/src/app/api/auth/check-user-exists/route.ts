import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // For demo purposes, check against hardcoded users
    // In production, you would query your database
    const users = [
      {
        email: "admin@test.com",
        role: "ADMIN",
      },
      {
        email: "user@test.com",
        role: "USER",
      },
    ];

    const user = users.find((u) => u.email === email);

    return NextResponse.json({
      exists: !!user,
      role: user?.role || null,
    });
  } catch (error) {
    console.error("Error checking user existence:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
