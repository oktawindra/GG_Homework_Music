import Button from "../UI/Button";
import Image from "../UI/Image";

const Track = ({ item }) => {
  return (
    <div className="App">
      <div className='music-content'>
        <Image
        title={item.name}
        imgUrl={item.album.images[0].url}
        width="182px"
        height="182px"
        />
        <h2>{item.name}</h2>
        <h3>{item.album.name}</h3>
        <p>{item.artists[0].name}</p>
        <h4>{item.id}</h4>
        <div>
          <Button text="Select" />
        </div>
      </div>
    </div>
  );
};

export default Track;