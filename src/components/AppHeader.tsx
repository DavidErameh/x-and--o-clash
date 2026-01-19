'use client';

import { Text, Grid } from '@geist-ui/core';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function AppHeader() {
  const { data: session } = useSession();

  return (
    <nav style={{ borderBottom: '1px solid #333', padding: '0.5rem 0' }}>
       <Grid.Container gap={2} justify="space-between" alignItems="center" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1rem' }}>
            <Grid>
                 <Link href="/" style={{ textDecoration: 'none' }}>
                     <Text h4 style={{ margin: 0, cursor: 'pointer', color: 'inherit' }}>X&O Clash</Text>
                 </Link>
            </Grid>
            <Grid>
                 <Link href="/" style={{ marginRight: '1.5rem', textDecoration: 'none' }}>
                     <Text span style={{ cursor: 'pointer', color: 'inherit' }}>Home</Text>
                 </Link>
                 <Link href="/discover" style={{ textDecoration: 'none' }}>
                      <Text span style={{ cursor: 'pointer', color: 'inherit' }}>Discover</Text>
                 </Link>
            </Grid>
            <Grid>
                 {session?.user ? (
                      <Text span font="14px">Signed in as <b>{session.user.name}</b></Text>
                 ) : (
                      <Text span font="14px">Guest</Text>
                 )}
            </Grid>
       </Grid.Container>
    </nav>
  );
}
