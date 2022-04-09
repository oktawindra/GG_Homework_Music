import Button from "../UI/Button";
import Image from "../UI/Image";

const Track = ({ albumName,songName,url,artistName,setSelectedList,selectedlist,uri }) => {

  const handleSelect = (data) =>{
    if (selectedlist.includes(data)) {
      const findIndex = selectedlist.findIndex((v) => v === data);
      setSelectedList((prevData) => {
        const newArr =[...prevData.slice(0, findIndex), ...prevData.slice(findIndex+1, prevData.length)];
        return newArr
      })
    } else {
      setSelectedList((prevData) => [...prevData, data])
    } 
  }

  return (
    <div className='music-content'>
      <Image
      title={songName}
      imgUrl={url}
      width="175px"
      height="175px"
      />
      <div className="music-info">
        <h2>{songName}</h2>
        <h3>{albumName}</h3>
        <p>{artistName}</p>
        <div
        onClick={() => {
          handleSelect(uri)
        }}>
        <Button
          selectedlist={selectedlist}
          uri={uri}
        />
        </div>
      </div>
    </div>
  );
};

export default Track;