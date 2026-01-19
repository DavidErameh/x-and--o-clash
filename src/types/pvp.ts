export interface PvPPlayer {
  id: string;
  username: string;
}

export interface PvPGameState {
  gameId: string;
  player1: PvPPlayer;
  player2: PvPPlayer | null;
  cells: (string | null)[];
  currentTurn: string; // player id
  status: 'waiting' | 'active' | 'completed' | 'draw';
  winner: string | null; // player id
}
