// src/NQueensSolver.js

export function solveNQueens(n) {
  const solutions = [];
  const messages = [];
  const board = Array.from({ length: n }, () => Array(n).fill(false));

  const isSafe = (board, row, col) => {
    for (let i = 0; i < col; i++) if (board[row][i]) return false;
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
    for (let i = row, j = col; i < n && j >= 0; i++, j--) if (board[i][j]) return false;
    return true;
  };
  const solve = (col) => {
    if (col >= n) {
      solutions.push(board.map(row => row.slice()));
      messages.push("Solution found!");
      return true;
    }
    for (let i = 0; i < n; i++) {
      if (isSafe(board, i, col)) {
        board[i][col] = true;
        solutions.push(board.map(row => row.slice()));
        messages.push(`Placed queen ${col + 1} at (${i}, ${col})`);
        if (solve(col + 1)) return true;
        board[i][col] = false;
        solutions.push(board.map(row => row.slice()));
        messages.push(`Removed queen ${col + 1} from (${i}, ${col})`);
      }
    }
    return false;
  };

  solve(0);
  return { solutions, messages };
}
