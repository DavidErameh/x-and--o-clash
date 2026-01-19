'use client';

import { useEffect } from 'react';
import { Grid, Spacer, Text } from '@geist-ui/core';
import { Button } from '@whop/react/components';
import GameBoard from '@/components/GameBoard';
import GameStatus from '@/components/GameStatus';
import GameContainer from '@/components/GameContainer';
import WaitingForOpponent from '@/components/WaitingForOpponent';
import ConnectionStatus from '@/components/ConnectionStatus';
import { usePvPGame } from '@/hooks/usePvPGame';
import { useRealtimeGame } from '@/hooks/useRealtimeGame';

export default function PvPGame() {
  const {
    gameId,
    cells,
    status,
    winner,
    myMark,
    isMyTurn,
    opponentName,
    initGame,
    handleMove,
  } = usePvPGame();

  const { connectionState } = useRealtimeGame(gameId);

  useEffect(() => {
    initGame();
  }, [initGame]);

  if (status === 'waiting') {
    return (
      <GameContainer>
        <WaitingForOpponent />
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <Grid.Container direction="column" alignItems="center" gap={2}>
        <div className="flex justify-between items-center w-full max-w-md">
          <Text h2 style={{ margin: 0 }}>Player vs Player</Text>
          <ConnectionStatus state={connectionState} />
        </div>
        <Text small type="secondary">
          You are playing as <b>{myMark}</b>
          {opponentName && <> against <b>{opponentName}</b></>}
        </Text>

        <GameStatus
          status={status}
          winner={winner}
          currentTurn={isMyTurn ? myMark : (myMark === 'X' ? 'O' : 'X')}
        />

        {!isMyTurn && status === 'active' && (
          <Text small type="warning">Waiting for opponent's move...</Text>
        )}

        <Spacer h={1} />

        <GameBoard
          cells={cells}
          size={3}
          onCellClick={handleMove}
          winner={winner}
          status={status}
        />

        <Spacer h={2} />

        {(status === 'completed' || status === 'draw') && (
          <Button onClick={() => window.location.reload()} variant="classic">
            Play Again
          </Button>
        )}
      </Grid.Container>
    </GameContainer>
  );
}
