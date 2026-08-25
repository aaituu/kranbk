import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // For demo/development - use env variables
        const adminEmail = process.env.ADMIN_EMAIL || "admin@sa-consulting.kz";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        if (credentials.email !== adminEmail) {
          return null;
        }

        // Simple password check (in production, use bcrypt with DB)
        if (credentials.password !== adminPassword) {
          return null;
        }

        return {
          id: "admin-1",
          email: adminEmail,
          name: "Administrator",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
});
