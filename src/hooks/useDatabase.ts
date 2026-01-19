import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/database.types';
import { getOpenGames } from '@/lib/db-helpers';

type Game = Database['public']['Tables']['games']['Row'];

export function useDatabase() {
  const [openGames, setOpenGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchOpenGames = async () => {
    setLoading(true);
    try {
      const games = await getOpenGames();
      setOpenGames(games as any[]); // Type assertion due to join complexity
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOpenGames();
    
    // Subscribe to new games
    const subscription = supabase
      .channel('public:games')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'games' }, (payload) => {
        if (payload.new.status === 'waiting') {
           setOpenGames((prev) => [payload.new as Game, ...prev]);
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'games' }, (payload) => {
         if (payload.new.status !== 'waiting') {
           setOpenGames((prev) => prev.filter(g => g.id !== payload.new.id));
         }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { openGames, loading, error, refreshGames: fetchOpenGames };
}
