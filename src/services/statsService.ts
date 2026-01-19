import { supabase } from '@/lib/supabase';
import { PlayerStats, GameResult } from '@/types/stats';

export async function getPlayerStats(userId: string): Promise<PlayerStats | null> {
  const { data, error } = await supabase
    .from('player_stats')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  
  if (!data) return null;
  
  const d = data as any;
  return {
    userId: d.user_id,
    wins: d.wins || 0,
    losses: d.losses || 0,
    draws: d.draws || 0,
    elo: d.elo || 1200,
    gamesPlayed: (d.wins || 0) + (d.losses || 0) + (d.draws || 0),
  };
}

export async function updatePlayerStats(
  userId: string,
  result: GameResult
): Promise<void> {
  const stats = await getPlayerStats(userId);
  
  if (!stats) {
    // Create new stats record
    await (supabase.from('player_stats') as any).insert({
      user_id: userId,
      wins: result === 'win' ? 1 : 0,
      losses: result === 'loss' ? 1 : 0,
      draws: result === 'draw' ? 1 : 0,
      elo: 1200,
    });
    return;
  }

  const updates: Record<string, number> = {};
  
  if (result === 'win') {
    updates.wins = stats.wins + 1;
    updates.elo = stats.elo + 25;
  } else if (result === 'loss') {
    updates.losses = stats.losses + 1;
    updates.elo = Math.max(0, stats.elo - 25);
  } else {
    updates.draws = stats.draws + 1;
  }

  await (supabase.from('player_stats') as any)
    .update(updates)
    .eq('user_id', userId);
}

export function calculateWinRate(stats: PlayerStats): number {
  if (stats.gamesPlayed === 0) return 0;
  return Math.round((stats.wins / stats.gamesPlayed) * 100);
}
