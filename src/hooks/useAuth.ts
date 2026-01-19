import { useSession } from 'next-auth/react';

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    whopUserId: session?.user?.whopUserId,
    userId: session?.user?.id, // Supabase ID
  };
}
