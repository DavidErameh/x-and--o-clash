import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { DashboardData, GameHistoryItem } from '@/types/dashboard';
import { getPlayerStats, calculateWinRate } from '@/services/statsService';

export function useDashboardData() {
  const { userId } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      // Fetch stats
      const stats = await getPlayerStats(userId);
      
      // Fetch recent games
      const { data: games, error: gamesError } = await supabase
        .from('games')
        .select('*')
        .or(`player1_id.eq.${userId},player2_id.eq.${userId}`)
        .order('created_at', { ascending: false })
        .limit(10);

      if (gamesError) throw gamesError;

      const recentGames: GameHistoryItem[] = (games || []).map((game: any) => ({
        id: game.id,
        opponent: game.player1_id === userId ? 'Player 2' : 'Player 1',
        result: game.winner_id === userId ? 'win' : game.winner_id ? 'loss' : 'draw' as 'win' | 'loss' | 'draw',
        mode: game.player2_id ? 'pvp' : 'ai' as 'ai' | 'pvp',
        playedAt: game.created_at,
      }));

      setData({
        stats: {
          wins: stats?.wins || 0,
          losses: stats?.losses || 0,
          draws: stats?.draws || 0,
          elo: stats?.elo || 1200,
          winRate: stats ? calculateWinRate(stats) : 0,
          gamesPlayed: stats?.gamesPlayed || 0,
        },
        recentGames,
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return { data, loading, error, refetch: fetchDashboardData };
}
