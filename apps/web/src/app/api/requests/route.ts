import { NextRequest, NextResponse } from "next/server";

// Mock data storage (in a real app, this would be a database)
let mockRequests: any[] = [];
let requestIdCounter = 1;

export async function GET(request: NextRequest) {
  try {
    // Return mock requests
    return NextResponse.json(mockRequests);
  } catch (error) {
    console.error("Error fetching requests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      category,
      priority,
      building,
      roomNumber,
      floor,
      location,
      contactPhone,
      department,
      images,
    } = body;

    if (!title || !description || !category || !priority) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Create new request with proper ID format
    const newRequest = {
      id: `PPR-2026-${String(requestIdCounter++).padStart(3, "0")}`,
      title,
      description,
      category: category.charAt(0) + category.slice(1).toLowerCase(), // Capitalize first letter
      priority:
        priority === "URGENT"
          ? "Urgent - Emergency"
          : priority === "HIGH"
            ? "High Priority"
            : priority === "MEDIUM"
              ? "Medium Priority"
              : "Low Priority",
      status: "Pending",
      requestedBy: "Student User", // In a real app, get from session
      createdAt: new Date()
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(/\//g, "/"),
      updatedAt: new Date()
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
        .replace(/\//g, "/"),
      building: building || "Main Building",
      roomNumber: roomNumber || "TBD",
      floor: floor || "1st Floor",
      location: location || `${building} - Room ${roomNumber}`,
      contactPhone: contactPhone || "N/A",
      department: department || "Student",
      images: images || [],
    };

    // Add to mock requests
    mockRequests.unshift(newRequest);

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error("Error creating request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
