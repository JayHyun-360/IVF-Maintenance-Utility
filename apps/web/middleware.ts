import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    console.log("Middleware:", req.nextUrl.pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Allow access to public pages and API routes
        if (
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/register") ||
          req.nextUrl.pathname.startsWith("/api") ||
          req.nextUrl.pathname === "/"
        ) {
          return true;
        }

        // Protect role selection and admin PIN verification
        if (
          req.nextUrl.pathname.startsWith("/role-selection") ||
          req.nextUrl.pathname.startsWith("/admin-pin-verification")
        ) {
          console.log(
            "Protected route access:",
            req.nextUrl.pathname,
            "Token:",
            !!token,
          );
          return !!token;
        }

        // Protect admin routes
        if (req.nextUrl.pathname.startsWith("/admin")) {
          console.log(
            "Admin route access:",
            req.nextUrl.pathname,
            "Role:",
            token?.role,
          );
          return token?.role === "ADMIN";
        }

        // Protect staff routes (admin and staff roles)
        if (req.nextUrl.pathname.startsWith("/staff")) {
          console.log(
            "Staff route access:",
            req.nextUrl.pathname,
            "Role:",
            token?.role,
          );
          return token?.role === "ADMIN" || token?.role === "STAFF";
        }

        // Protect user routes
        if (req.nextUrl.pathname.startsWith("/student")) {
          console.log(
            "Student route access:",
            req.nextUrl.pathname,
            "Token:",
            !!token,
          );
          return !!token;
        }

        // Protect dashboard (role-based redirect handled by component)
        if (req.nextUrl.pathname.startsWith("/dashboard")) {
          console.log(
            "Dashboard route access:",
            req.nextUrl.pathname,
            "Token:",
            !!token,
          );
          return !!token;
        }

        // Protect settings
        if (req.nextUrl.pathname.startsWith("/settings")) {
          console.log(
            "Settings route access:",
            req.nextUrl.pathname,
            "Token:",
            !!token,
          );
          return !!token;
        }

        // Protect emergency
        if (req.nextUrl.pathname.startsWith("/emergency")) {
          console.log(
            "Emergency route access:",
            req.nextUrl.pathname,
            "Token:",
            !!token,
          );
          return !!token;
        }

        return true;
      },
    },
    pages: {
      signIn: "/login",
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
    "/role-selection",
    "/admin-pin-verification",
    "/api/admin/:path*",
    "/api/requests/:path*",
    "/api/auth/:path*",
  ],
};
