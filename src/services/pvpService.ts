import { supabase } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

export async function createGame(playerId: string, username: string) {
  const { data, error } = await (supabase
    .from('games') as any)
    .insert({
      player1_id: playerId,
      status: 'waiting',
      board_state: { cells: Array(9).fill(null) },
      current_turn: playerId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function findOpenGame(excludePlayerId: string) {
  const { data, error } = await supabase
    .from('games')
    .select('*')
    .eq('status', 'waiting')
    .neq('player1_id', excludePlayerId)
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function joinGame(gameId: string, playerId: string) {
  const { data, error } = await (supabase
    .from('games') as any)
    .update({
      player2_id: playerId,
      status: 'active',
    })
    .eq('id', gameId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateGameState(
  gameId: string,
  cells: (string | null)[],
  currentTurn: string,
  status: string,
  winner: string | null
) {
  const { data, error } = await (supabase
    .from('games') as any)
    .update({
      board_state: { cells },
      current_turn: currentTurn,
      status,
      winner_id: winner,
    })
    .eq('id', gameId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function subscribeToGame(
  gameId: string,
  callback: (payload: any) => void
): RealtimeChannel {
  return supabase
    .channel(`game:${gameId}`)
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

export function unsubscribeFromGame(channel: RealtimeChannel) {
  supabase.removeChannel(channel);
}
