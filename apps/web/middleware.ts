import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Minimal middleware - let NextAuth handle most auth logic
    console.log("Middleware:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Public routes that don't need authentication
        const publicRoutes = ["/", "/login", "/register"];
        const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

        if (isPublicRoute) {
          return true;
        }

        // API routes (except auth)
        if (
          req.nextUrl.pathname.startsWith("/api") &&
          !req.nextUrl.pathname.startsWith("/api/auth")
        ) {
          return true;
        }

        // For all other routes, require authentication
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    // Exclude NextAuth API routes and static assets
    "!/api/auth/:path*",
    "!/_next/static/:path*",
    "!/_next/image/:path*",
    "!/favicon.ico",
    "!/robots.txt",
    // Protect specific routes
    "/admin/:path*",
    "/student/:path*",
    "/staff/:path*",
    "/settings/:path*",
    "/emergency/:path*",
    "/dashboard/:path*",
    "/role-selection",
    "/admin-pin-verification",
    "/api/admin/:path*",
    "/api/requests/:path*",
  ],
};
