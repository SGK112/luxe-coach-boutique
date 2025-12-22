import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Define allowed admin emails - add your email(s) here
const ALLOWED_ADMIN_EMAILS = [
  "joshb@surprisegranite.com",
  // Add more authorized emails as needed
];

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow specific emails to sign in
      if (user.email && ALLOWED_ADMIN_EMAILS.includes(user.email)) {
        return true;
      }
      return false;
    },
    async session({ session, token }) {
      // Add user info to session
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
});
