import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;         // Supabase UUID
      whopUserId: string; // Whop User ID
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;         // Supabase UUID
    whopUserId: string; // Whop User ID
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    whopUserId: string;
  }
}

export interface WhopAuthResponse {
  userId: string;
}
