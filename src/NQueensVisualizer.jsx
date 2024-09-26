import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { solveNQueens } from './NQueensSolver';
import NQueensBoard from './NQueensBoard';
import './NQueensVisualizer.css';

const NQueensVisualizer = ({ n }) => {
  const [steps, setSteps] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [algorithmFinished, setAlgorithmFinished] = useState(false);

  useEffect(() => {
    if (n < 1) return; // Edge case handling for invalid 'n'
    const { solutions, messages } = solveNQueens(n);
    setSteps(solutions);
    setMessages(messages);
    setCurrentStep(0);
    setAlgorithmFinished(false);
    setIsPlaying(false);
  }, [n]);

  useEffect(() => {
    let timeout;
    if (isPlaying && currentStep < steps.length - 1) {
      timeout = setTimeout(() => {
        setCurrentStep(prevStep => {
          const nextStep = prevStep + 1;
          if (nextStep >= steps.length - 1) {
            setAlgorithmFinished(true);
            setIsPlaying(false);
          }
          return nextStep;
        });
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [currentStep, isPlaying, speed, steps.length]);

  const handlePlayPause = () => {
    if (algorithmFinished) {
      resetBoard();
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSpeedChange = (event) => {
    const value = Number(event.target.value);
    const newSpeed = 2100 - value; // Reverse the speed calculation
    setSpeed(newSpeed);
  };

  const resetBoard = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setAlgorithmFinished(false);
  };

  return (
    <div className="visualizer-container">
      <NQueensBoard board={steps[currentStep] || []} />
      <div className="controls">
        <button onClick={handlePlayPause} disabled={n < 1}>
          {algorithmFinished ? 'Reset' : (isPlaying ? 'Pause' : 'Play')}
        </button>
        {!algorithmFinished && (
          <label>
            Speed:
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={2100 - speed} // Reverse the value to match the newSpeed calculation
              onChange={handleSpeedChange}
            />
          </label>
        )}
      </div>
      <div className="message-log">
        <h2>Move Log</h2>
        <ul>
          {messages.slice(0, currentStep + 1).reverse().map((msg, index) => (
            <li key={index} className={msg.includes('Placed') ? 'placed' : 'removed'}>
              {msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

NQueensVisualizer.propTypes = {
  n: PropTypes.number.isRequired,
};

export default NQueensVisualizer;