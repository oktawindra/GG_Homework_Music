import './App.css';
import Track from "./components/Track";
import Login from "./components/Login";
import Search from "./components/Search";
import data from './Data';

function App() {
  return (
    <div className="App">
    {
      data.map((item) => (
        <Track item={item} />
      ))
    }
    <br/>
    <Search />
    </div>
  );
}

export default App;