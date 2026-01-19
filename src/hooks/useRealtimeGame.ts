import { useState, useEffect, useCallback } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { subscribeToGameUpdates, unsubscribeFromChannel } from '@/lib/supabase';
import { ConnectionState, GameUpdatePayload } from '@/types/realtime';
import { CellValue, GameStatus as GameStatusType } from '@/types/game';

interface RealtimeGameState {
  cells: CellValue[];
  currentTurn: string;
  status: GameStatusType;
  winnerId: string | null;
}

export function useRealtimeGame(gameId: string | null) {
  const [gameState, setGameState] = useState<RealtimeGameState | null>(null);
  const [connectionState, setConnectionState] = useState<ConnectionState>('disconnected');
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const handleGameUpdate = useCallback((payload: { new: GameUpdatePayload }) => {
    const data = payload.new;
    const cells = (data.board_state?.cells || []) as unknown as CellValue[];
    setGameState({
      cells,
      currentTurn: data.current_turn,
      status: data.status as GameStatusType,
      winnerId: data.winner_id,
    });
  }, []);

  useEffect(() => {
    if (!gameId) return;

    setConnectionState('reconnecting');

    const sub = subscribeToGameUpdates(gameId, handleGameUpdate);
    setChannel(sub);

    // Check subscription status
    sub.on('system', {}, (status) => {
      if (status === 'SUBSCRIBED') {
        setConnectionState('connected');
      }
    });

    return () => {
      if (sub) {
        unsubscribeFromChannel(sub);
        setConnectionState('disconnected');
      }
    };
  }, [gameId, handleGameUpdate]);

  return {
    gameState,
    connectionState,
    isConnected: connectionState === 'connected',
  };
}
