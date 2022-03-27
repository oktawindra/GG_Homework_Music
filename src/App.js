import './App.css';
import Track from "./components/Track";
import data from './Data';

function App() {
  return (
    <div className="App">
    {
      data.map((item) => (
        <Track item={item} />
      ))
    }
    </div>
  );
}

export default App;