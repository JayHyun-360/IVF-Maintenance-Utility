import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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

        // For demo purposes, we'll use hardcoded users
        // In production, you would fetch from your database
        const users = [
          {
            id: "1",
            email: "admin@test.com",
            name: "Admin User",
            password:
              "$2b$12$vwxEfJR/W2qRw4k6nLIC5.ncGhon.drnZCTWvXgTcXF5AMFIgxjQW", // Hashed "admin12345"
            role: "ADMIN",
          },
          {
            id: "2",
            email: "user@test.com",
            name: "General User",
            password:
              "$2b$12$CGPZqCI0BrwuPvRFDvu1AeYdfRcxSHK/2XIOWWlYFUWVWN91goVi.", // Hashed "user12345"
            role: "USER",
          },
        ];

        const user = users.find((user) => user.email === credentials.email);

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
};
