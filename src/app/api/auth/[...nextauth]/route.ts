import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/login", // ✅ ensure no "/auth/admin"
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Store user role in token (if available)
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      // Add role to session
      if (token?.role) session.user.role = token.role as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect admin to dashboard, user to home
      if (url.startsWith("/")) {
        if (url.includes("admin")) return `${baseUrl}/admin/dashboard`;
        return `${baseUrl}/`;
      }
      return url;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
