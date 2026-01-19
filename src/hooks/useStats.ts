import { useState, useEffect, useCallback } from 'react';
import { PlayerStats } from '@/types/stats';
import { getPlayerStats, calculateWinRate } from '@/services/statsService';
import { useAuth } from '@/hooks/useAuth';

export function useStats() {
  const { userId } = useAuth();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const data = await getPlayerStats(userId);
      setStats(data);
    } catch (err) {
      setError('Failed to load stats');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const winRate = stats ? calculateWinRate(stats) : 0;

  return {
    stats,
    loading,
    error,
    winRate,
    refetch: fetchStats,
  };
}
