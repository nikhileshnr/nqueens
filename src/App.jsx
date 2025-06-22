import './App.css';
import NQueensVisualizer from './NQueensVisualizer';

const App = () => (
  <div className="App">
    <h1>N-Queens Visualization</h1>
    <p>A visualization of the backtracking algorithm to solve the N-Queens puzzle</p>
    <NQueensVisualizer initialN={8} />
  </div>
);

export default App;
