export interface GameHistoryItem {
  id: string;
  opponent: string;
  result: 'win' | 'loss' | 'draw';
  mode: 'ai' | 'pvp';
  playedAt: string;
}

export interface DashboardData {
  stats: {
    wins: number;
    losses: number;
    draws: number;
    elo: number;
    winRate: number;
    gamesPlayed: number;
  };
  recentGames: GameHistoryItem[];
}
