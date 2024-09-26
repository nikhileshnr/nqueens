import './App.css';
import NQueensVisualizer from './NQueensVisualizer';

const App = () => (
  <div className="App">
    <h1>N-Queens Visualization</h1>
    <NQueensVisualizer n={8} />
  </div>
);

export default App;
