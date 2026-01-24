import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Role } from "@/types/database";

// Mock user database for testing
const users = [
  {
    id: "1",
    email: "admin@example.com",
    name: "Admin User",
    password: "$2b$12$kcpu83RgikVSYRrNniatOe5JHYk1CdGbcB18Yfua.BucyYhbfSx1S", // admin123
    role: Role.ADMIN,
  },
  {
    id: "2",
    email: "student@example.com",
    name: "John Student",
    password: "$2b$12$QHw/lFCSVA4S1DbAAS3cHOSKzKouR3FuiifxPkOq4iy1yNkIlyxSq", // student123
    role: Role.STUDENT,
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
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

        try {
          const user = users.find((u) => u.email === credentials.email);

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
            role: user.role as Role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
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
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  debug: process.env.NODE_ENV === "development",
};
