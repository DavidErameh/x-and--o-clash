import { checkWinner, isBoardFull, makeMove } from '@/utils/gameLogic';
import { CellValue } from '@/types/game';

describe('gameLogic', () => {
  describe('checkWinner', () => {
    it('should return X for horizontal win on 3x3', () => {
      const cells: CellValue[] = ['X', 'X', 'X', 'O', 'O', null, null, null, null];
      expect(checkWinner(cells, 3)).toBe('X');
    });

    it('should return O for vertical win on 3x3', () => {
      const cells: CellValue[] = ['O', 'X', null, 'O', 'X', null, 'O', null, null];
      expect(checkWinner(cells, 3)).toBe('O');
    });

    it('should return X for diagonal win on 3x3', () => {
      const cells: CellValue[] = ['X', 'O', null, 'O', 'X', null, null, null, 'X'];
      expect(checkWinner(cells, 3)).toBe('X');
    });

    it('should return null for no winner', () => {
      const cells: CellValue[] = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      expect(checkWinner(cells, 3)).toBeNull();
    });
  });

  describe('isBoardFull', () => {
    it('should return true when board is full', () => {
      const cells: CellValue[] = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
      expect(isBoardFull(cells)).toBe(true);
    });

    it('should return false when board has empty cells', () => {
      const cells: CellValue[] = ['X', 'O', null, 'O', 'X', null, null, null, null];
      expect(isBoardFull(cells)).toBe(false);
    });
  });

  describe('makeMove', () => {
    it('should place X in correct position', () => {
      const cells: CellValue[] = [null, null, null, null, null, null, null, null, null];
      const result = makeMove(cells, 4, 'X');
      expect(result[4]).toBe('X');
    });

    it('should not modify original array', () => {
      const cells: CellValue[] = [null, null, null, null, null, null, null, null, null];
      const result = makeMove(cells, 0, 'O');
      expect(cells[0]).toBeNull();
      expect(result[0]).toBe('O');
    });
  });
});

