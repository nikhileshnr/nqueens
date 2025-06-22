import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { solveNQueens } from './utils/nQueensSolver';
import NQueensBoard from './NQueensBoard';
import './NQueensVisualizer.css';

const NQueensVisualizer = ({ initialN = 8 }) => {
  const [n, setN] = useState(initialN);
  const [steps, setSteps] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [algorithmFinished, setAlgorithmFinished] = useState(false);
  const [allSolutions, setAllSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(0);
  const [showingSolutions, setShowingSolutions] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [viewMode, setViewMode] = useState('backtracking'); // 'backtracking' or 'solutions'

  useEffect(() => {
    if (n < 1) return; // Edge case handling for invalid 'n'
    const { solutions, messages, allFoundSolutions, totalSolutions } = solveNQueens(n);
    setSteps(solutions);
    setMessages(messages);
    setAllSolutions(allFoundSolutions);
    setCurrentStep(0);
    setCurrentSolution(0);
    setAlgorithmFinished(false);
    setIsPlaying(false);
    setViewMode('backtracking');
  }, [n]);

  useEffect(() => {
    let timeout;
    if (isPlaying && currentStep < steps.length - 1 && viewMode === 'backtracking') {
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
  }, [currentStep, isPlaying, speed, steps.length, viewMode]);

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

  const handleStepFirst = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setAlgorithmFinished(false);
  };

  const handleStepPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsPlaying(false);
    }
  };

  const handleStepNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsPlaying(false);
      if (currentStep === steps.length - 2) {
        setAlgorithmFinished(true);
      }
    }
  };

  const handleStepLast = () => {
    setCurrentStep(steps.length - 1);
    setIsPlaying(false);
    setAlgorithmFinished(true);
  };

  const handlePreviousSolution = () => {
    if (currentSolution > 0) {
      setCurrentSolution(currentSolution - 1);
    }
  };

  const handleNextSolution = () => {
    if (currentSolution < allSolutions.length - 1) {
      setCurrentSolution(currentSolution + 1);
    }
  };

  const handleBoardSizeChange = (event) => {
    const newSize = Number(event.target.value);
    if (newSize >= 4 && newSize <= 12) {
      setN(newSize);
    }
  };

  const handleAnimationToggle = () => {
    setAnimationEnabled(!animationEnabled);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    if (mode === 'solutions' && allSolutions.length > 0) {
      setCurrentSolution(0);
    }
  };

  return (
    <div className="visualizer-container">
      <div className="board-container">
        <div className="view-mode-selector">
          <button 
            onClick={() => handleViewModeChange('backtracking')}
            className={viewMode === 'backtracking' ? 'active' : ''}
          >
            Backtracking Process
          </button>
          <button 
            onClick={() => handleViewModeChange('solutions')}
            className={viewMode === 'solutions' ? 'active' : ''}
            disabled={!allSolutions.length}
          >
            View Solutions ({allSolutions.length})
          </button>
        </div>

        {viewMode === 'backtracking' ? (
          <>
            <div className="board-and-log">
              <NQueensBoard board={steps[currentStep] || []} animationEnabled={animationEnabled} />
              
              <div className="message-log">
                <h2>Move Log</h2>
                <ul aria-live="polite" aria-label="Algorithm steps log">
                  {messages.slice(0, currentStep + 1).reverse().slice(0, 10).map((msg, index) => (
                    <li key={index} className={msg.includes('Placed') ? 'placed' : (msg.includes('Solution') ? 'solution' : 'removed')}>
                      {msg}
                    </li>
                  ))}
                  {currentStep > 9 && <li className="more">...{currentStep - 9} more steps</li>}
                </ul>
              </div>
            </div>
            
            <div className="controls">
              <div className="board-size-controls">
                <label htmlFor="board-size">
                  Board Size:
                  <input
                    id="board-size"
                    type="range"
                    min="4"
                    max="12"
                    value={n}
                    onChange={handleBoardSizeChange}
                    aria-label="Change board size"
                  />
                  <span>{n}x{n}</span>
                </label>
              </div>

              <div className="playback-controls">
                <button 
                  onClick={handlePlayPause} 
                  disabled={n < 1}
                  aria-label={algorithmFinished ? 'Reset' : (isPlaying ? 'Pause' : 'Play')}
                >
                  {algorithmFinished ? 'Reset' : (isPlaying ? 'Pause' : 'Play')}
                </button>
                {!algorithmFinished && (
                  <label htmlFor="speed-slider">
                    Speed:
                    <input
                      id="speed-slider"
                      type="range"
                      min="100"
                      max="2000"
                      step="100"
                      value={2100 - speed}
                      onChange={handleSpeedChange}
                      aria-label="Adjust animation speed"
                    />
                  </label>
                )}

                <div className="animation-toggle">
                  <label htmlFor="animation-toggle">
                    <input
                      id="animation-toggle"
                      type="checkbox"
                      checked={animationEnabled}
                      onChange={handleAnimationToggle}
                      aria-label="Toggle animations"
                    />
                    Animations
                  </label>
                </div>
              </div>

              <div className="step-controls">
                <button 
                  onClick={handleStepFirst}
                  disabled={currentStep === 0}
                  aria-label="Go to first step"
                >
                  First
                </button>
                <button 
                  onClick={handleStepPrevious}
                  disabled={currentStep === 0}
                  aria-label="Go to previous step"
                >
                  Previous
                </button>
                <span aria-live="polite">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <button 
                  onClick={handleStepNext}
                  disabled={currentStep === steps.length - 1}
                  aria-label="Go to next step"
                >
                  Next
                </button>
                <button 
                  onClick={handleStepLast}
                  disabled={currentStep === steps.length - 1}
                  aria-label="Go to last step"
                >
                  Last
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {allSolutions.length > 0 ? (
              <>
                <NQueensBoard board={allSolutions[currentSolution]} animationEnabled={false} />
                <div className="solution-controls">
                  <div className="board-size-controls">
                    <label htmlFor="board-size-solution">
                      Board Size:
                      <input
                        id="board-size-solution"
                        type="range"
                        min="4"
                        max="12"
                        value={n}
                        onChange={handleBoardSizeChange}
                        aria-label="Change board size"
                      />
                      <span>{n}x{n}</span>
                    </label>
                  </div>
                  
                  <div className="solution-nav">
                    <button 
                      onClick={handlePreviousSolution}
                      disabled={currentSolution === 0}
                    >
                      Previous Solution
                    </button>
                    <span aria-live="polite">
                      Solution {currentSolution + 1} of {allSolutions.length}
                    </span>
                    <button 
                      onClick={handleNextSolution}
                      disabled={currentSolution === allSolutions.length - 1}
                    >
                      Next Solution
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-solutions">
                No solutions found. Try a different board size.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

NQueensVisualizer.propTypes = {
  initialN: PropTypes.number
};

export default NQueensVisualizer;