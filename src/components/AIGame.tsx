'use client';

import { Grid, Spacer, Text, Loading } from '@geist-ui/core';
import { Button } from '@whop/react/components';
import GameBoard from '@/components/GameBoard';
import GameStatus from '@/components/GameStatus';
import GameContainer from '@/components/GameContainer';
import { useAIGame } from '@/hooks/useAIGame';

export default function AIGame() {
  const { 
    cells, 
    status, 
    winner, 
    currentTurn, 
    isAIThinking, 
    handlePlayerMove, 
    resetGame 
  } = useAIGame(3);

  return (
    <GameContainer>
      <Grid.Container direction="column" alignItems="center" gap={2}>
        <Text h2>Player vs AI</Text>
        
        <GameStatus status={status} winner={winner} currentTurn={currentTurn} />
        
        {isAIThinking && (
          <Grid.Container alignItems="center" gap={1}>
            <Loading scale={0.5} />
            <Text small type="secondary">AI is thinking...</Text>
          </Grid.Container>
        )}
        
        <Spacer h={1} />
        
        <GameBoard
          cells={cells}
          size={3}
          onCellClick={handlePlayerMove}
          winner={winner}
          status={status}
        />
        
        <Spacer h={2} />
        
        <Button onClick={resetGame} variant="ghost">
          {status === 'active' ? 'Restart' : 'Play Again'}
        </Button>
      </Grid.Container>
    </GameContainer>
  );
}
