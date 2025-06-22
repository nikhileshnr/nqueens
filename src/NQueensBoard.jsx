import PropTypes from 'prop-types';
// src/NQueensBoard.jsx
import './NQueensBoard.css';

const NQueensBoard = ({ board, animationEnabled = true }) => (
  <div className="board">
    {board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={`cell ${cell ? 'queen' : ''} ${animationEnabled ? '' : 'no-animation'}`}
            aria-label={cell ? `Queen at row ${rowIndex + 1}, column ${colIndex + 1}` : `Empty cell at row ${rowIndex + 1}, column ${colIndex + 1}`}
          >
            {cell ? `${rowIndex + 1}` : ''}
          </div>
        ))}
      </div>
    ))}
  </div>
);

NQueensBoard.propTypes = {
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.bool
    )
  ).isRequired,
  animationEnabled: PropTypes.bool
};

export default NQueensBoard;
