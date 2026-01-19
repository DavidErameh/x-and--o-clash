import { useState, useCallback, useEffect } from 'react';
import { CellValue, Player, GameStatus, BoardSize } from '@/types/game';
import { checkWinner, isBoardFull, makeMove } from '@/utils/gameLogic';
import { findBestMove } from '@/ai/minimax';

export function useAIGame(size: BoardSize = 3) {
  const [cells, setCells] = useState<CellValue[]>(Array(size * size).fill(null));
  const [status, setStatus] = useState<GameStatus>('active');
  const [winner, setWinner] = useState<Player | null>(null);
  const [currentTurn, setCurrentTurn] = useState<Player>('X');
  const [isAIThinking, setIsAIThinking] = useState(false);

  const resetGame = useCallback(() => {
    setCells(Array(size * size).fill(null));
    setStatus('active');
    setWinner(null);
    setCurrentTurn('X');
    setIsAIThinking(false);
  }, [size]);

  const handlePlayerMove = useCallback((index: number) => {
    if (status !== 'active' || currentTurn !== 'X' || cells[index] !== null) return;

    const newCells = makeMove(cells, index, 'X');
    setCells(newCells);

    const gameWinner = checkWinner(newCells, size);
    if (gameWinner) {
      setWinner(gameWinner);
      setStatus('completed');
      return;
    }

    if (isBoardFull(newCells)) {
      setStatus('draw');
      return;
    }

    setCurrentTurn('O');
  }, [cells, status, currentTurn, size]);

  // AI Move Effect
  useEffect(() => {
    if (currentTurn === 'O' && status === 'active') {
      setIsAIThinking(true);
      
      const timeout = setTimeout(() => {
        const aiMoveIndex = findBestMove(cells, size);
        if (aiMoveIndex !== -1) {
          const newCells = makeMove(cells, aiMoveIndex, 'O');
          setCells(newCells);

          const gameWinner = checkWinner(newCells, size);
          if (gameWinner) {
            setWinner(gameWinner);
            setStatus('completed');
          } else if (isBoardFull(newCells)) {
            setStatus('draw');
          } else {
            setCurrentTurn('X');
          }
        }
        setIsAIThinking(false);
      }, 300); // Simulate thinking time
      
      return () => clearTimeout(timeout);
    }
  }, [currentTurn, status, cells, size]);

  return {
    cells,
    status,
    winner,
    currentTurn,
    isAIThinking,
    handlePlayerMove,
    resetGame,
  };
}
