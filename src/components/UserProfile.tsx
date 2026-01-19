'use client';

import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { Card, Text, Grid, Avatar, Loading } from '@geist-ui/core';
import { useEffect, useState } from 'react';
import { Database } from '@/types/database.types';

type PlayerStats = Database['public']['Tables']['player_stats']['Row'];

export default function UserProfile() {
  const { user, userId, isAuthenticated } = useAuth();
  const [stats, setStats] = useState<PlayerStats | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchStats() {
      if (!userId) return;
      setLoading(true);
      const { data } = await supabase
        .from('player_stats')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (data) setStats(data);
      setLoading(false);
    }

    fetchStats();
  }, [userId]);

  if (!isAuthenticated || !user) return null;

  return (
    <Card width="100%">
       <Grid.Container gap={2} alignItems="center">
           <Grid>
               <Avatar src={user.image || ''} text={user.name?.[0]} scale={2} />
           </Grid>
           <Grid xs={24} md={12} direction="column">
               <Text h4 style={{ margin: 0 }}>{user.name}</Text>
               <Text small type="secondary">Whop ID: {user.whopUserId}</Text>
           </Grid>
           <Grid xs={24} md={8}>
               {loading ? <Loading /> : (
                   <div style={{ display: 'flex', gap: '1rem' }}>
                       <div>
                           <Text b>Wins</Text>
                           <Text p style={{ margin: 0, textAlign: 'center', color: 'var(--success)' }}>{stats?.wins || 0}</Text>
                       </div>
                       <div>
                           <Text b>Losses</Text>
                           <Text p style={{ margin: 0, textAlign: 'center', color: 'var(--error)' }}>{stats?.losses || 0}</Text>
                       </div>
                       <div>
                           <Text b>ELO</Text>
                           <Text p style={{ margin: 0, textAlign: 'center' }}>{stats?.elo || 1200}</Text>
                       </div>
                   </div>
               )}
           </Grid>
       </Grid.Container>
    </Card>
  );
}
