import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware() {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to login page and API routes
        if (
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/api") ||
          req.nextUrl.pathname === "/"
        ) {
          return true;
        }

        // Protect admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "ADMIN";
        }

        // Protect student routes
        if (req.nextUrl.pathname.startsWith("/student")) {
          return !!token;
        }

        // Protect settings
        if (req.nextUrl.pathname.startsWith("/settings")) {
          return !!token;
        }

        // Protect emergency
        if (req.nextUrl.pathname.startsWith("/emergency")) {
          return !!token;
        }

        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/student/:path*",
    "/settings/:path*",
    "/emergency/:path*",
  ],
};
