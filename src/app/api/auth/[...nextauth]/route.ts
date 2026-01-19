import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { whopsdk } from "@/lib/whop";

import { createUser, getUserByWhopId } from "@/lib/db-helpers";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Whop",
      credentials: {
        token: { label: "Token", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.token) return null;
        
        try {
          // Verify the token with Whop SDK
          const { userId } = await whopsdk.verifyUserToken(credentials.token);
          
          if (userId) {
             // Retrieve full user profile from Whop
             const whopUser = await whopsdk.users.retrieve(userId);

             // Sync with Supabase: Check if user exists, else create
             let dbUser = await getUserByWhopId(userId);
             if (!dbUser) {
                dbUser = await createUser(userId, whopUser.username);
             }
             
             if (!dbUser) return null;
             
            return {
              id: (dbUser as any).id,           // Supabase UUID
              name: whopUser.username,
              email: null,
              image: whopUser.profile_picture?.url,
              whopUserId: userId,      // Whop String ID
            };
          }
          return null;
        } catch (e) {
          console.error("Auth error", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.whopUserId = (user as any).whopUserId;
        }
        return token;
    },
    async session({ session, token }) {
        if (session.user) {
            (session.user as any).id = token.id; // Supabase ID
            (session.user as any).whopUserId = token.whopUserId;
        }
        return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
