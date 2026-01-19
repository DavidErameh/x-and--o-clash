'use client';

import { Spinner, Grid } from '@geist-ui/core';

export default function LoadingSpinner() {
  return (
    <Grid.Container justify="center" alignItems="center" style={{ height: '300px' }}>
      <Spinner scale={2} />
    </Grid.Container>
  );
}
