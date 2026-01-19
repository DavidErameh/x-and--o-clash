export interface PlayerStats {
  userId: string;
  wins: number;
  losses: number;
  draws: number;
  elo: number;
  gamesPlayed: number;
}

export type GameResult = 'win' | 'loss' | 'draw';
export type GameMode = 'ai' | 'pvp';
