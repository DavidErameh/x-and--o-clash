'use client';

import { Card } from '@geist-ui/core';
import { ReactNode } from 'react';

export default function GameContainer({ children }: { children: ReactNode }) {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
       <Card width="100%">
          {children}
       </Card>
    </div>
  );
}
