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

        // Check for demo credentials first
        if (
          credentials.email.toLowerCase() === "admin@test.com" &&
          credentials.password === "admin123"
        ) {
          console.log("Admin demo user authentication successful");
          return {
            id: "admin-demo-user-id",
            email: "admin@test.com",
            name: "Admin Demo",
            role: "ADMIN",
          };
        }

        if (
          credentials.email.toLowerCase() === "user@test.com" &&
          credentials.password === "user123"
        ) {
          console.log("User demo account authentication successful");
          return {
            id: "user-demo-user-id",
            email: "user@test.com",
            name: "User Demo",
            role: "USER",
          };
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
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If the URL is relative, prepend the base URL
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // If the URL is on the same site, allow it
      else if (new URL(url).origin === baseUrl) return url;
      // Default redirect based on user role
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
    },
  },
};
