'use client';

import { Grid, Text, Spacer } from '@geist-ui/core';
import { Button } from '@whop/react/components';
import { useRouter } from 'next/navigation';
import { Player } from '@/types/game';

interface GameResultsProps {
  result: 'win' | 'loss' | 'draw';
  winner?: Player | null;
  onPlayAgain: () => void;
}

export default function GameResults({ result, winner, onPlayAgain }: GameResultsProps) {
  const router = useRouter();

  const getMessage = () => {
    if (result === 'win') return '🎉 You Won!';
    if (result === 'loss') return '😔 You Lost';
    return '🤝 Draw!';
  };

  const getColor = () => {
    if (result === 'win') return 'var(--success)';
    if (result === 'loss') return 'var(--error)';
    return 'var(--warning)';
  };

  return (
    <Grid.Container direction="column" alignItems="center" gap={2}>
      <Text h1 style={{ color: getColor(), fontSize: '3rem' }}>
        {getMessage()}
      </Text>
      
      {winner && (
        <Text type="secondary">Winner: {winner}</Text>
      )}
      
      <Spacer h={2} />
      
      <Grid.Container gap={1} justify="center">
        <Grid>
          <Button onClick={onPlayAgain} variant="classic">
            Play Again
          </Button>
        </Grid>
        <Grid>
          <Button onClick={() => router.push('/')} variant="ghost">
            Back to Menu
          </Button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
}
