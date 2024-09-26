import PropTypes from 'prop-types';
// src/NQueensBoard.jsx
import './NQueensBoard.css';

const NQueensBoard = ({ board }) => (
  <div className="board">
    {board.map((row, rowIndex) => (
      <div key={rowIndex} className="row">
        {row.map((cell, colIndex) => (
          <div
            key={colIndex}
            className={`cell ${cell ? 'queen' : ''}`}
          >
            {cell ? `${colIndex + 1}` : ''}
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
};

export default NQueensBoard;
