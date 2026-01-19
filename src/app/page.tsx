'use client';

import { Text, Grid, Spacer } from '@geist-ui/core';
import GameContainer from '@/components/GameContainer';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import GameModeSelector from '@/components/GameModeSelector';

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <GameContainer>
        <Grid.Container gap={2} justify="center" direction="column" alignItems="center">
            <Text h1>X&O Clash</Text>
            <Text p type="secondary" style={{ textAlign: 'center' }}>
                The ultimate Tic-Tac-Toe battle arena. <br />
                Play against friends, AI, or compete in the ranked ladder.
            </Text>
            <Spacer h={2} />
            {session ? (
                 <GameModeSelector />
            ) : (
                <Text p>Please sign in via Whop to play.</Text>
            )}
        </Grid.Container>
    </GameContainer>
  );
}
