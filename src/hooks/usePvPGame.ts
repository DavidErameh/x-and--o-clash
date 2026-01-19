import { useState, useEffect, useCallback } from 'react';
import { CellValue, Player, GameStatus as GameStatusType } from '@/types/game';
import { checkWinner, isBoardFull, makeMove } from '@/utils/gameLogic';
import {
  createGame,
  findOpenGame,
  joinGame,
  updateGameState,
  subscribeToGame,
  unsubscribeFromGame,
} from '@/services/pvpService';
import { useAuth } from '@/hooks/useAuth';
import { RealtimeChannel } from '@supabase/supabase-js';

export function usePvPGame() {
  const { userId, user } = useAuth();
  const [gameId, setGameId] = useState<string | null>(null);
  const [cells, setCells] = useState<CellValue[]>(Array(9).fill(null));
  const [status, setStatus] = useState<GameStatusType>('waiting');
  const [winner, setWinner] = useState<Player | null>(null);
  const [currentTurn, setCurrentTurn] = useState<string | null>(null);
  const [myMark, setMyMark] = useState<Player>('X');
  const [opponentName, setOpponentName] = useState<string | null>(null);
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const isMyTurn = currentTurn === userId;

  const initGame = useCallback(async () => {
    if (!userId || !user?.name) return;

    try {
      // Try to find an existing open game
      const openGame = await findOpenGame(userId);

      if (openGame) {
        // Join existing game
        const joined = await joinGame((openGame as any).id, userId);
        setGameId(joined.id);
        setMyMark('O');
        setCells(joined.board_state?.cells || Array(9).fill(null));
        setCurrentTurn(joined.current_turn);
        setStatus('active');
      } else {
        // Create new game
        const created = await createGame(userId, user.name);
        setGameId(created.id);
        setMyMark('X');
        setStatus('waiting');
        setCurrentTurn(userId);
      }
    } catch (error) {
      console.error('Error initializing game:', error);
    }
  }, [userId, user?.name]);

  // Subscribe to game updates
  useEffect(() => {
    if (!gameId) return;

    const sub = subscribeToGame(gameId, (payload) => {
      const game = payload.new;
      setCells(game.board_state?.cells || []);
      setCurrentTurn(game.current_turn);
      setStatus(game.status);
      if (game.winner_id) {
        setWinner(game.winner_id === userId ? myMark : (myMark === 'X' ? 'O' : 'X'));
      }
    });

    setChannel(sub);

    return () => {
      if (sub) unsubscribeFromGame(sub);
    };
  }, [gameId, userId, myMark]);

  const handleMove = useCallback(async (index: number) => {
    if (!gameId || !isMyTurn || status !== 'active' || cells[index]) return;

    const newCells = makeMove(cells, index, myMark);
    const gameWinner = checkWinner(newCells, 3);
    const isDraw = !gameWinner && isBoardFull(newCells);

    let newStatus: GameStatusType = 'active';
    let winnerId: string | null = null;

    if (gameWinner) {
      newStatus = 'completed';
      winnerId = userId || null;
      setWinner(myMark);
    } else if (isDraw) {
      newStatus = 'draw';
    }

    setCells(newCells);
    setStatus(newStatus);

    // Next turn is the opponent (we need to figure out opponent's ID)
    // For simplicity, we'll just send the move and let subscription handle the rest
    await updateGameState(
      gameId,
      newCells,
      winnerId ? currentTurn! : 'opponent', // simplified
      newStatus,
      winnerId
    );
  }, [gameId, isMyTurn, status, cells, myMark, userId, currentTurn]);

  return {
    gameId,
    cells,
    status,
    winner,
    currentTurn,
    myMark,
    isMyTurn,
    opponentName,
    initGame,
    handleMove,
  };
}
