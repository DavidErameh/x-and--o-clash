
import { createClient, SupabaseClient, RealtimeChannel } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

export const supabase = createClient<Database, "public">(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

export function subscribeToGameUpdates(
  gameId: string,
  callback: (payload: any) => void
): RealtimeChannel {
  return supabase
    .channel(`game-${gameId}`)
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'games',
        filter: `id=eq.${gameId}`,
      },
      callback
    )
    .subscribe();
}

export function unsubscribeFromChannel(channel: RealtimeChannel): void {
  supabase.removeChannel(channel);
}
