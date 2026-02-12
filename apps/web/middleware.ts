import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token }) => {
      // Simple authentication check - let NextAuth handle the rest
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    // Exclude NextAuth API routes and static assets from middleware
    "!/api/auth/:path*",
    "!/_next/:path*",
    "!/favicon.ico",
    "!/robots.txt",
    "!/sitemap.xml",
    "!/manifest.json",
    // Only protect routes that need authentication
    "/admin/:path*",
    "/student/:path*",
    "/staff/:path*",
    "/settings/:path*",
    "/emergency/:path*",
    "/dashboard/:path*",
    "/role-selection",
    "/admin-pin-verification",
  ],
};
