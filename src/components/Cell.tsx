'use client';

import { Card, Text } from '@geist-ui/core';
import { CellValue } from '@/types/game';

interface CellProps {
  value: CellValue;
  onClick: () => void;
  disabled?: boolean;
}

export default function Cell({ value, onClick, disabled }: CellProps) {
  const isX = value === 'X';
  const isO = value === 'O';

  return (
    <Card 
      onClick={!disabled ? onClick : undefined}
      className={`game-cell ${disabled ? 'disabled' : ''} transition-all hover-scale`}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        minHeight: '80px',
        backgroundColor: value ? (isX ? '#f5f5f5' : '#111') : 'transparent',
        transition: 'all 0.2s ease',
      }}
    >
      <Text 
        h2 
        className={value ? 'animate-scale-in' : ''}
        style={{ 
          margin: 0, 
          color: isX ? '#0070f3' : (isO ? '#f81ce5' : 'inherit') 
        }}
      >
        {value}
      </Text>
    </Card>
  );
}

