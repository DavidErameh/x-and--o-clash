import { CellValue, Player } from '@/types/game';
import { checkWinner, isBoardFull } from '@/utils/gameLogic';

const AI_PLAYER: Player = 'O';
const HUMAN_PLAYER: Player = 'X';

function evaluateBoard(cells: CellValue[], size: number): number {
  const winner = checkWinner(cells, size);
  if (winner === AI_PLAYER) return 10;
  if (winner === HUMAN_PLAYER) return -10;
  return 0;
}

function minimax(
  cells: CellValue[],
  size: number,
  depth: number,
  isMaximizing: boolean,
  alpha: number,
  beta: number
): number {
  const score = evaluateBoard(cells, size);

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (isBoardFull(cells)) return 0;

  if (isMaximizing) {
    let best = -Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === null) {
        cells[i] = AI_PLAYER;
        best = Math.max(best, minimax(cells, size, depth + 1, false, alpha, beta));
        cells[i] = null;
        alpha = Math.max(alpha, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i] === null) {
        cells[i] = HUMAN_PLAYER;
        best = Math.min(best, minimax(cells, size, depth + 1, true, alpha, beta));
        cells[i] = null;
        beta = Math.min(beta, best);
        if (beta <= alpha) break;
      }
    }
    return best;
  }
}

export function findBestMove(cells: CellValue[], size: number): number {
  let bestScore = -Infinity;
  let bestMove = -1;
  const cellsCopy = [...cells];

  for (let i = 0; i < cellsCopy.length; i++) {
    if (cellsCopy[i] === null) {
      cellsCopy[i] = AI_PLAYER;
      const score = minimax(cellsCopy, size, 0, false, -Infinity, Infinity);
      cellsCopy[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}
