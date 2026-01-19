'use client';

import { Text, Grid } from '@geist-ui/core';

export default function AppFooter() {
  return (
    <footer style={{ borderTop: '1px solid #333', padding: '2rem 0', marginTop: 'auto' }}>
       <Grid.Container justify="center">
            <Text span type="secondary" font="12px">
                © {new Date().getFullYear()} X&O Clash. All rights reserved.
            </Text>
       </Grid.Container>
    </footer>
  );
}
