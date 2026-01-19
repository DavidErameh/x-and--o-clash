'use client';

import { Text, Card } from '@geist-ui/core';
import { Player, GameStatus as GameStatusType } from '@/types/game';

interface GameStatusProps {
  status: GameStatusType;
  winner: Player | null;
  currentTurn: Player;
}

export default function GameStatus({ status, winner, currentTurn }: GameStatusProps) {
  let message = '';
  let type: 'default' | 'success' | 'warning' | 'error' | 'secondary' = 'default';

  if (status === 'waiting') {
    message = 'Waiting for opponent...';
    type = 'secondary';
  } else if (status === 'active') {
    message = `Current Turn: ${currentTurn}`;
    type = 'default';
  } else if (status === 'draw') {
    message = "It's a Draw!";
    type = 'warning';
  } else if (status === 'completed' && winner) {
    message = `Winner: ${winner}!`;
    type = 'success';
  }

  return (
    <Card 
       style={{ 
           textAlign: 'center', 
           marginBottom: '1.5rem',
           borderColor: type === 'success' ? 'var(--success)' : (type === 'warning' ? 'var(--warning)' : 'var(--accents-2)')
       }}
    >
      <Text h3 my={0} type={type}>{message}</Text>
    </Card>
  );
}
