import './App.css';
import data from './Data';

function App() {
  return (
    <div className="App">
      <div className='music-content'>
        <img src={data.album.images[1].url} alt='Song Cover'/>
        <h1 className='song-title'>{data.name}</h1>
        <h2 className='song-artist'>{data.album.artists[0].name}</h2>
        <button className='btn-select'>Select</button>
      </div>
    </div>
  );
}

export default App;