'use client';

import { useState, useEffect } from 'react';
import { Grid, Spacer } from '@geist-ui/core';
import { Button } from '@whop/react/components';
import GameContainer from '@/components/GameContainer';
import GameBoard from '@/components/GameBoard';
import BoardSizeSelector from '@/components/BoardSizeSelector';
import GameStatus from '@/components/GameStatus';
import type { BoardSize, CellValue, GameState, GameStatus as GameStatusType } from '@/types/game';
import { checkWinner, isBoardFull, makeMove } from '@/utils/gameLogic';

export default function Playground() {
  const [size, setSize] = useState<BoardSize>(3);
  const [game, setGame] = useState<GameState>({
    cells: Array(9).fill(null),
    status: 'active',
    winner: null,
    currentTurn: 'X'
  });

  // Reset game when size changes
  useEffect(() => {
    setGame({
      cells: Array(size * size).fill(null),
      status: 'active',
      winner: null,
      currentTurn: 'X'
    });
  }, [size]);

  const handleCellClick = (index: number) => {
    if (game.status !== 'active' || game.cells[index]) return;

    const newCells = makeMove(game.cells, index, game.currentTurn);
    const winner = checkWinner(newCells, size);
    const isDraw = !winner && isBoardFull(newCells);

    let nextStatus: GameStatusType = game.status;
    if (winner) nextStatus = 'completed';
    else if (isDraw) nextStatus = 'draw';

    setGame({
      cells: newCells,
      status: nextStatus,
      winner: winner,
      currentTurn: game.currentTurn === 'X' ? 'O' : 'X'
    });
  };

  const resetGame = () => {
    setGame({
      cells: Array(size * size).fill(null),
      status: 'active',
      winner: null,
      currentTurn: 'X'
    });
  };

  return (
    <GameContainer>
       <Grid.Container direction="column" alignItems="center" gap={2}>
           <GameStatus 
              status={game.status} 
              winner={game.winner} 
              currentTurn={game.currentTurn} 
           />
           
           <BoardSizeSelector 
              currentSize={size} 
              onSizeChange={setSize}
              disabled={game.status !== 'waiting' && game.status !== 'active' && !isBoardFull(game.cells) && !game.winner} // Allow change if game over or fresh
           />
           
           <Spacer h={2} />
           
           <GameBoard 
              cells={game.cells} 
              size={size} 
              onCellClick={handleCellClick} 
              winner={game.winner}
              status={game.status}
           />
           
           <Spacer h={2} />
           
           <Button onClick={resetGame} variant="ghost">Reset Game</Button>
       </Grid.Container>
    </GameContainer>
  );
}
