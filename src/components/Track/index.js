import Button from "../UI/Button";
import Image from "../UI/Image";

const Track = ({ data }) => {
  return (
    <div className="App">
      <div className='music-content'>
        <Image
        title={data.name}
        imgUrl={data.album.images[0].url}
        width="150px"
        height="150px"
        />
        <h2>{data.name}</h2>
        <h3>{data.album.name}</h3>
        <p>{data.artists[0].name}</p>
        <div>
          <Button text="Select" />
        </div>
      </div>
    </div>
  );
};

export default Track;