import { useState } from 'react';
import { GameMode } from '@/types/gameSetup';

export function useGameSetup() {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const selectMode = (mode: GameMode) => {
    setSelectedMode(mode);
  };

  return {
    selectedMode,
    selectMode,
  };
}
