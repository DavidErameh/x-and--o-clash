'use client';

import { ButtonGroup } from '@geist-ui/core';
import { Button } from '@whop/react/components';
import { BoardSize } from '@/types/game';

interface BoardSizeSelectorProps {
  currentSize: BoardSize;
  onSizeChange: (size: BoardSize) => void;
  disabled?: boolean;
}

export default function BoardSizeSelector({ currentSize, onSizeChange, disabled }: BoardSizeSelectorProps) {
  return (
    <ButtonGroup>
      <Button 
        variant={currentSize === 3 ? 'classic' : 'ghost'} 
        onClick={() => onSizeChange(3)}
        disabled={disabled}
      >
        3x3
      </Button>
      <Button 
        variant={currentSize === 4 ? 'classic' : 'ghost'} 
        onClick={() => onSizeChange(4)}
        disabled={disabled}
      >
        4x4
      </Button>
       <Button 
        variant={currentSize === 5 ? 'classic' : 'ghost'} 
        onClick={() => onSizeChange(5)}
        disabled={disabled}
      >
        5x5
      </Button>
    </ButtonGroup>
  );
}
