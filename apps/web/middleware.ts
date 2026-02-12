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

        // Protect staff routes (admin and staff roles)
        if (req.nextUrl.pathname.startsWith("/staff")) {
          return token?.role === "ADMIN" || token?.role === "STAFF";
        }

        // Protect user routes
        if (req.nextUrl.pathname.startsWith("/student")) {
          return !!token;
        }

        // Protect dashboard (role-based redirect handled by component)
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
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
    "/staff/:path*",
    "/settings/:path*",
    "/emergency/:path*",
    "/dashboard/:path*",
    "/api/admin/:path*",
    "/api/requests/:path*",
  ],
};
