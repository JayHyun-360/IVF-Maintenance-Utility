import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}

import prisma from "./prisma";

// Helper function to find user by email
const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });
};

// Get the base URL with fallbacks for different environments
const getBaseUrl = () => {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
};

export const authOptions: NextAuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET ||
    "ivf-maintenance-secret-key-2024-secure-production-auth",
  debug: process.env.NODE_ENV === "development", // Enable debug in development

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "missing-google-client-id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "missing-google-client-secret",
      async profile(profile) {
        console.log("Google profile:", profile);
        // Check if user exists in our system
        const existingUser = await findUserByEmail(profile.email!);

        if (existingUser) {
          // Return existing user with their role
          return {
            id: existingUser.id,
            email: existingUser.email,
            name: existingUser.name,
            role: existingUser.role,
          };
        } else {
          // For Google users not in our system, create a default USER role
          // In production, you might want to redirect them to registration first
          return {
            id: profile.sub,
            email: profile.email,
            name: profile.name,
            role: "STUDENT", // Default role for new Google users
          };
        }
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials authorize attempt:", {
          email: credentials?.email,
        });

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        // Check for demo credentials first (but use real database users)
        if (
          credentials.email.toLowerCase() === "admin@test.com" &&
          credentials.password === "admin123"
        ) {
          console.log("Admin demo user authentication successful");
          // Find the real admin user in database
          const adminUser = await findUserByEmail("admin@ivf.edu");
          if (adminUser) {
            return {
              id: adminUser.id,
              email: adminUser.email,
              name: adminUser.name,
              role: adminUser.role,
            };
          }
        }

        if (
          credentials.email.toLowerCase() === "user@test.com" &&
          credentials.password === "user123"
        ) {
          console.log("Student demo user authentication successful");
          // Find the real student user in database
          const studentUser = await findUserByEmail("student@ivf.edu");
          if (studentUser) {
            return {
              id: studentUser.id,
              email: studentUser.email,
              name: studentUser.name,
              role: studentUser.role,
            };
          }
        }

        const user = await findUserByEmail(credentials.email);
        console.log("Found user:", user ? user.email : "Not found");

        if (!user) {
          console.log("User not found");
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
          console.log("Invalid password");
          return null;
        }

        console.log("Authentication successful for:", user.email);
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  useSecureCookies: process.env.NODE_ENV === "production",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.sub = user.id; // Set sub to user ID for session compatibility
        if (user.name) token.name = user.name;
        if (user.email) token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - token:", token);
      console.log("Session callback - session:", session);
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
        if (token.name) session.user.name = token.name as string;
        if (token.email) session.user.email = token.email as string;
        console.log("Session updated:", session.user);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log("NextAuth redirect callback:", { url, baseUrl });

      // Allows relative callback URLs
      if (url.startsWith("/")) {
        const fullUrl = `${baseUrl}${url}`;
        console.log("Redirecting to relative URL:", fullUrl);
        return fullUrl;
      }

      // Allows callback URLs on the same origin
      try {
        const urlObj = new URL(url, baseUrl);
        if (urlObj.origin === baseUrl) {
          console.log("Redirecting to same origin URL:", url);
          return url;
        }
      } catch (e) {
        console.log("URL parsing failed, treating as relative:", e);
        // If URL parsing fails, it might be a relative path
        return `${baseUrl}${url}`;
      }

      // Default to baseUrl if the URL is from a different origin or invalid
      console.log("Defaulting to baseUrl:", baseUrl);
      return baseUrl;
    },
  },
  pages: {
    signIn: "/login",
  },
  events: {
    async signIn({ user, account }) {
      // You can add custom logic here when user signs in
      console.log("User signed in:", { user, account });
    },
    async signOut({ session }) {
      console.log("User signed out:", { session });
      // Clear any client-side storage
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }
    },
  },
};
