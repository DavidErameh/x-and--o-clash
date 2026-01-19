import { supabase } from '@/lib/supabase';

export async function syncGameState(
  gameId: string,
  cells: (string | null)[],
  currentTurn: string,
  status: string,
  winnerId: string | null
): Promise<void> {
  const { error } = await (supabase.from('games') as any).update({
    board_state: { cells },
    current_turn: currentTurn,
    status,
    winner_id: winnerId,
    updated_at: new Date().toISOString(),
  }).eq('id', gameId);

  if (error) throw error;
}

export function resolveConflict(
  localTimestamp: number,
  serverTimestamp: number
): 'local' | 'server' {
  // Server timestamp wins in case of conflict
  return serverTimestamp >= localTimestamp ? 'server' : 'local';
}
