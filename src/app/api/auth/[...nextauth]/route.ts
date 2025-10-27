import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password");
        }

        // 🔍 Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("No user found with that email");
        }

        // 🔐 Compare passwords
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid password");
        }

        // ✅ Return the user object to NextAuth
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // "USER" | "ADMIN"
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // 🧠 Store role + id in the JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    // 💾 Attach JWT data to the session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as number;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },

  // 📄 Custom pages
  pages: {
    signIn: "/auth/login",
  },

  // 🛠️ Optional: Secret (recommended for JWT encryption)
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Export both API handlers and authOptions
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
