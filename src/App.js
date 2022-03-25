import './App.css';
import Track from "./components/Track";
import data from './Data';

function App() {
  return (
    <div className="App">
      <Track data={data} />
    </div>
  );
}

export default App;