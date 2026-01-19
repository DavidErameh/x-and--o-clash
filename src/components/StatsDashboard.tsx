'use client';

import { Grid, Text, Loading } from '@geist-ui/core';
import StatCard from './StatCard';
import { useStats } from '@/hooks/useStats';

export default function StatsDashboard() {
  const { stats, loading, winRate } = useStats();

  if (loading) {
    return (
      <Grid.Container justify="center" style={{ padding: '2rem' }}>
        <Loading />
      </Grid.Container>
    );
  }

  if (!stats) {
    return (
      <Grid.Container justify="center" style={{ padding: '2rem' }}>
        <Text type="secondary">No stats available yet. Play a game!</Text>
      </Grid.Container>
    );
  }

  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={6} md={4}>
        <StatCard label="Games Played" value={stats.gamesPlayed} />
      </Grid>
      <Grid xs={12} sm={6} md={4}>
        <StatCard label="Wins" value={stats.wins} color="var(--success)" />
      </Grid>
      <Grid xs={12} sm={6} md={4}>
        <StatCard label="Losses" value={stats.losses} color="var(--error)" />
      </Grid>
      <Grid xs={12} sm={6} md={4}>
        <StatCard label="Draws" value={stats.draws} color="var(--warning)" />
      </Grid>
      <Grid xs={12} sm={6} md={4}>
        <StatCard label="Win Rate" value={`${winRate}%`} />
      </Grid>
      <Grid xs={12} sm={6} md={4}>
        <StatCard label="ELO Rating" value={stats.elo} color="var(--cyan)" />
      </Grid>
    </Grid.Container>
  );
}
