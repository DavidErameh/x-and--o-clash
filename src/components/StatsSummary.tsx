'use client';

import StatCard from '@/components/StatCard';

interface StatsSummaryProps {
  wins: number;
  losses: number;
  draws: number;
  elo: number;
  winRate: number;
  gamesPlayed: number;
}

export default function StatsSummary({ wins, losses, draws, elo, winRate, gamesPlayed }: StatsSummaryProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard label="Games Played" value={gamesPlayed} />
      <StatCard label="Wins" value={wins} color="var(--green-10)" />
      <StatCard label="Losses" value={losses} color="var(--red-10)" />
      <StatCard label="Draws" value={draws} color="var(--yellow-10)" />
      <StatCard label="Win Rate" value={`${winRate}%`} />
      <StatCard label="ELO Rating" value={elo} color="var(--blue-10)" />
    </div>
  );
}
