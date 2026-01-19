export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type GameStatus = 'waiting' | 'active' | 'completed' | 'draw';

export interface GameState {
  cells: CellValue[];
  status: GameStatus;
  winner: Player | null;
  currentTurn: Player;
}

export type BoardSize = 3 | 4 | 5; // Start with 3x3, scalable to larger sizes

export const GAME_VERSION = '1.0'; // Force runtime module
