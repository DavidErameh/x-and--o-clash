'use client';

import { Grid, Text, Loading, Spacer } from '@geist-ui/core';

export default function WaitingForOpponent() {
  return (
    <Grid.Container 
      direction="column" 
      alignItems="center" 
      justify="center" 
      style={{ minHeight: '200px' }}
    >
      <Loading scale={2} />
      <Spacer h={1} />
      <Text h4>Waiting for opponent...</Text>
      <Text small type="secondary">Looking for another player</Text>
    </Grid.Container>
  );
}
