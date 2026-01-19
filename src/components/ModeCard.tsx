'use client';

import { Card, Text, Grid } from '@geist-ui/core';
import { ReactNode } from 'react';

interface ModeCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function ModeCard({ title, description, icon, selected, onClick }: ModeCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={`mode-card ${selected ? 'selected' : ''}`}
      style={{
        cursor: 'pointer',
        border: selected ? '2px solid var(--success)' : '1px solid var(--accents-2)',
        transition: 'all 0.2s ease',
        backgroundColor: selected ? 'rgba(0, 112, 243, 0.05)' : 'transparent'
      }}
      width="100%"
    >
      <Grid.Container justify="center" direction="column" alignItems="center" gap={1}>
        <Grid>{icon}</Grid>
        <Grid><Text h4 my={0}>{title}</Text></Grid>
        <Grid><Text p small type="secondary" style={{ textAlign: 'center' }}>{description}</Text></Grid>
      </Grid.Container>
    </Card>
  );
}
