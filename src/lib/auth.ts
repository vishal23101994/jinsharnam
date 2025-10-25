import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;

        // ✅ Compare hashed password using bcrypt
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        // ✅ Convert numeric ID to string (NextAuth requires string IDs)
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  // ✅ Use JWT-based sessions
  session: { strategy: "jwt" },

  // ✅ Optional custom login page
  pages: { signIn: "/auth/login" },

  // ✅ Handle token and session values
  callbacks: {
    async jwt({ token, user }) {
      // Attach user data to the token when first signed in
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      // Ensure session.user exists before assigning
      if (token && session.user) {
        // Type-safe assignments with explicit casting
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },

  // ✅ Add your secret from .env
  secret: process.env.NEXTAUTH_SECRET,
};
