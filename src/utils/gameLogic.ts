import { CellValue, Player, BoardSize } from '@/types/game';

export function checkWinner(cells: CellValue[], size: number): Player | null {
  const lines: number[][] = [];

  // Rows
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let j = 0; j < size; j++) {
      row.push(i * size + j);
    }
    lines.push(row);
  }

  // Columns
  for (let i = 0; i < size; i++) {
    const col = [];
    for (let j = 0; j < size; j++) {
      col.push(j * size + i);
    }
    lines.push(col);
  }

  // Diagonals
  const diag1 = [];
  const diag2 = [];
  for (let i = 0; i < size; i++) {
    diag1.push(i * size + i);
    diag2.push(i * size + (size - 1 - i));
  }
  lines.push(diag1);
  lines.push(diag2);

  for (const line of lines) {
    const first = cells[line[0]];
    if (first && line.every((index) => cells[index] === first)) {
      return first;
    }
  }

  return null;
}

export function isBoardFull(cells: CellValue[]): boolean {
  return cells.every((cell) => cell !== null);
}

export function makeMove(
  cells: CellValue[],
  index: number,
  player: Player
): CellValue[] {
  if (cells[index]) return cells;
  const newCells = [...cells];
  newCells[index] = player;
  return newCells;
}
