export function solveNQueens(n) {
  const solutions = [];
  const messages = [];
  const board = Array.from({ length: n }, () => Array(n).fill(false));
  const allSolutions = []; // To store all valid solutions

  const isSafe = (board, row, col) => {
    // Check same column
    for (let i = 0; i < row; i++) if (board[i][col]) return false;
    // Check upper left diagonal
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) if (board[i][j]) return false;
    // Check upper right diagonal
    for (let i = row, j = col; i >= 0 && j < n; i--, j++) if (board[i][j]) return false;
    return true;
  };

  const solve = (row) => {
    if (row >= n) {
      solutions.push(board.map(row => row.slice()));
      messages.push("Solution found!");
      allSolutions.push(board.map(row => row.slice())); // Store this valid solution
      return true; // Stop after finding one solution
    }

    for (let col = 0; col < n; col++) {
      if (isSafe(board, row, col)) {
        board[row][col] = true;
        solutions.push(board.map(row => row.slice()));
        messages.push(`Placed queen ${row + 1} at (${row}, ${col})`);
        
        // If we've found a solution, stop here
        if (solve(row + 1)) {
          return true;
        }
        
        board[row][col] = false;
        solutions.push(board.map(row => row.slice()));
        messages.push(`Removed queen ${row + 1} from (${row}, ${col})`);
      }
    }
    return false;
  };

  solve(0);
  return { 
    solutions, 
    messages, 
    allFoundSolutions: allSolutions,
    totalSolutions: allSolutions.length
  };
} 