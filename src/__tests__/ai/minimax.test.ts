import { findBestMove } from '@/ai/minimax';
import { CellValue } from '@/types/game';

describe('minimax AI', () => {
  describe('findBestMove', () => {
    it('should block opponent winning move', () => {
      // O needs to block X from winning
      const cells: CellValue[] = ['X', 'X', null, 'O', null, null, null, null, null];
      const bestMove = findBestMove(cells, 3);
      expect(bestMove).toBe(2); // Block X winning
    });

    it('should take winning move when available', () => {
      // O can win
      const cells: CellValue[] = ['X', 'X', null, 'O', 'O', null, 'X', null, null];
      const bestMove = findBestMove(cells, 3);
      expect(bestMove).toBe(5); // O wins
    });

    it('should return a valid move on empty board', () => {
      const cells: CellValue[] = [null, null, null, null, null, null, null, null, null];
      const bestMove = findBestMove(cells, 3);
      expect(bestMove).toBeGreaterThanOrEqual(0);
      expect(bestMove).toBeLessThan(9);
    });

    it('should return -1 on full board', () => {
      const cells: CellValue[] = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      const bestMove = findBestMove(cells, 3);
      expect(bestMove).toBe(-1);
    });
  });
});

