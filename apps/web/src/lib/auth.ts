import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

// In-memory user storage for demo purposes
// In production, this would be your database
const users = [
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

// Helper function to find user by email
const findUserByEmail = (email: string) => {
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const authOptions: NextAuthOptions = {
  secret:
    process.env.NEXTAUTH_SECRET ||
    "ivf-maintenance-secret-key-2024-secure-production-auth",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        // Check if user exists in our system
        const existingUser = findUserByEmail(profile.email!);

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
            role: "USER", // Default role for new Google users
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
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = findUserByEmail(credentials.email);

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

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
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
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
  },
};
