import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// In-memory storage for demo purposes
// In production, you would save to your database
let users = [
  {
    id: "1",
    email: "admin@test.com",
    name: "Admin User",
    password: "$2b$12$vwxEfJR/W2qRw4k6nLIC5.ncGhon.drnZCTWvXgTcXF5AMFIgxjQW", // Hashed "admin12345"
    role: "ADMIN",
  },
  {
    id: "2",
    email: "user@test.com",
    name: "General User",
    password: "$2b$12$CGPZqCI0BrwuPvRFDvu1AeYdfRcxSHK/2XIOWWlYFUWVWN91goVi.", // Hashed "user12345"
    role: "USER",
  },
];

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = {
      id: (users.length + 1).toString(),
      name,
      email,
      password: hashedPassword,
      role,
    };

    users.push(newUser);

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
