export type GameMode = 'pvp' | 'ai';

export interface GameSetupState {
  mode: GameMode | null;
}
