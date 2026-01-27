import { NextRequest, NextResponse } from "next/server";

// Shared user data - in production, this would come from a database
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

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

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
