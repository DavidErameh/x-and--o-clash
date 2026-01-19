'use client';

import { Grid, Spacer } from '@geist-ui/core';
import Cell from './Cell';
import { CellValue, Player, BoardSize } from '@/types/game';

interface GameBoardProps {
  cells: CellValue[];
  size: BoardSize;
  onCellClick: (index: number) => void;
  winner: Player | null;
  status: 'waiting' | 'active' | 'completed' | 'draw';
}

export default function GameBoard({ cells, size, onCellClick, winner, status }: GameBoardProps) {
  const isGameOver = status === 'completed' || status === 'draw';

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${size}, 1fr)`,
      gap: '10px',
      maxWidth: '400px',
      margin: '0 auto',
      aspectRatio: '1/1'
    }}>
      {cells.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          disabled={!!cell || isGameOver}
        />
      ))}
    </div>
  );
}
