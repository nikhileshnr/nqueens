# N-Queens Visualizer

![N-Queens Puzzle](https://img.shields.io/badge/Algorithm-N--Queens-blue)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![Vite](https://img.shields.io/badge/Vite-5.3.1-646cff)

An interactive visualization of the classic N-Queens problem using React and the backtracking algorithm. This application allows users to explore how the backtracking algorithm works to place N queens on an N×N chessboard so that no two queens threaten each other.

## 🎮 [Live Demo](#) <!-- Add your deployment URL here when available -->

![Screenshot](./screenshots/screenshot.png) <!-- Add a screenshot when available -->

## 🧩 The N-Queens Problem

The N-Queens puzzle is the problem of placing N chess queens on an N×N chessboard so that no two queens threaten each other. Thus, a solution requires that no two queens share the same row, column, or diagonal.

## ✨ Features

- 📊 Interactive visualization of the backtracking algorithm
- 🎬 Animation controls (Play, Pause, Step Forward/Backward)
- 🔄 Adjustable animation speed
- 📏 Adjustable board size (4×4 up to 12×12)
- 🧮 View all possible solutions for a given board size
- 🖥️ Responsive design for all device sizes
- ♿ Accessibility features included

## 🛠️ Technologies

- **React** - UI library
- **Vite** - Fast development environment
- **CSS3** - Modern styling with animations and transitions
- **Backtracking Algorithm** - Core solving logic

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nqueens.git
cd nqueens
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 💻 Usage

- **Adjust Board Size**: Use the slider to change the size of the chessboard.
- **Play/Pause**: Start or pause the algorithm visualization.
- **Speed Control**: Adjust how fast the algorithm steps through solutions.
- **Step Controls**: Navigate through the algorithm steps manually.
- **View Mode**: Toggle between seeing the backtracking process or browsing through all solutions.
- **Animation Toggle**: Turn animations on/off for performance on slower devices.

## 🧠 How It Works

The N-Queens Visualizer uses a backtracking algorithm to find solutions:

1. Start in the first row, trying to place a queen in each column.
2. When a queen is placed, move to the next row and try to place a queen there.
3. If no valid position is found in a row, backtrack to the previous row and try a different position.
4. Continue until all queens are placed or all possibilities are exhausted.

The visualization shows this process step by step, making it easy to understand the algorithm's decision-making process.

## 🔍 Algorithm Details

The core algorithm can be found in `src/utils/nQueensSolver.js`. It includes:

- A safety check function to verify if a queen can be placed at a specific position
- The recursive backtracking function that builds up the solution
- Tracking of all steps for visualization purposes
- Collection of all found solutions

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🌟 Acknowledgements

- The N-Queens problem is a classic example in computer science and mathematics
- Inspired by various algorithm visualization tools and educational resources


---

Created by Nikhilesh Raj Singh <!-- Replace with your name -->
