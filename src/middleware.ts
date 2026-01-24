import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Get the token from the request
  const token = await getToken({ req: request });

  // Check if the path is protected
  const isAdminPath = pathname.startsWith("/admin");
  const isStudentPath = pathname.startsWith("/student");
  const isProtectedPath = isAdminPath || isStudentPath;

  // If accessing protected routes without a token, redirect to login
  if (isProtectedPath && !token) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Role-based access control
  if (isAdminPath && token?.role !== "ADMIN") {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (
    isStudentPath &&
    !["STUDENT", "ADMIN", "STAFF"].includes(token?.role as string)
  ) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated and trying to access login page, allow access to home page
  // Remove automatic redirect to let users choose where to go

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
