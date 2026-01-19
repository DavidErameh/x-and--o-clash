'use client';

import { Grid, Spacer, Text } from '@geist-ui/core';
import { Button } from '@whop/react/components';
import { Users, Cpu } from '@geist-ui/icons';
import ModeCard from './ModeCard';
import { useGameSetup } from '@/hooks/useGameSetup';
import { useRouter } from 'next/navigation';

export default function GameModeSelector() {
  const { selectedMode, selectMode } = useGameSetup();
  const router = useRouter();

  const handleContinue = () => {
    if (selectedMode === 'ai') {
        router.push('/game/ai'); // Placeholder route
    } else if (selectedMode === 'pvp') {
        router.push('/game/pvp'); // Placeholder route
    }
  };

  return (
    <Grid.Container gap={2} direction="column" alignItems="center">
      <Text h3>Select Game Mode</Text>
      <Grid.Container gap={2} justify="center">
        <Grid xs={24} sm={12}>
          <ModeCard
            title="Player vs AI"
            description="Challenge our smart AI engine"
            icon={<Cpu size={48} />}
            selected={selectedMode === 'ai'}
            onClick={() => selectMode('ai')}
          />
        </Grid>
        <Grid xs={24} sm={12}>
           <ModeCard
            title="Player vs Player"
            description="Compete against other players"
            icon={<Users size={48} />}
            selected={selectedMode === 'pvp'}
            onClick={() => selectMode('pvp')}
          />
        </Grid>
      </Grid.Container>
      
      <Spacer h={2} />
      
      <Button 
        onClick={handleContinue} 
        disabled={!selectedMode}
        variant="classic"
        size="4"
      >
        Continue
      </Button>
    </Grid.Container>
  );
}
