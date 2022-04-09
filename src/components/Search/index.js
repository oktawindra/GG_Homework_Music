import { useEffect, useState } from "react";
import { useSelector, useDispatch, connect } from 'react-redux';
import { dataAccessToken } from '../../Data/Action.js';
import Track from "../Track";
import Login from "../Login";
import Recent from "../RecentSearch";
import Play from '../Playlist/play.js'
import { getUserProfile } from '../../Data/Profile.js'
const axios = require('axios').default;


const Search = ({tokencode})=> {
    const token = useSelector(state => state.dataAccessToken.value); 
    const [login, setLogin] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [tracks, setTracks] = useState([]);
    const [recent, setRecent] = useState([]);
    const [selectedlist, setSelectedList] = useState([]);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();


    const handleInput = (e) => {
        setKeyword(e.target.value);
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
                params: {
                    type: 'track',
                    q: keyword,
                    limit: 5
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })
            setRecent(tracks);
            setTracks(response.data.tracks.items);
        }
        catch (e) {
            alert(`Kamu belum login ${e}`)
            console.error(e)
        }

    }

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    useEffect(() => {
        const accessTokenParams = tokencode;

        if (accessTokenParams !== null) {
            dispatch(dataAccessToken(accessTokenParams));
    
            const setUserProfile = async () => {
            try {
                const response = await getUserProfile(accessTokenParams);
    
                setUser(response);
                setLogin(true);
            } catch (e) {
                //console.log('error');
            }
            }
        setUserProfile();
        }
    }, [token, tokencode, dispatch]);

    return (
        <div className="search-content">
        <Login />
            {(login) ? (
                <>
                <Play
                    accessToken={token}
                    userId={user.id}
                    uriTracks={selectedlist}
                />
                    <div className="search-form">
                        <input type="text" onChange={handleInput} onKeyPress={handleKeyPress}/>
                        <button onClick={handleSubmit}>Cari</button>
                    </div>
                    <h1>Hasil pencarian : {keyword}</h1>
                    <div className="Album-container">
                        <div className="Songs-container">
                            {
                                tracks.map((item) => (
                                    <Track
                                        key={item.uri}
                                        albumName={item.album.name}
                                        songName={item.name}
                                        uri={item.uri}
                                        url={item.album.images[0].url}
                                        artistName={item.artists[0].name}
                                        setSelectedList={setSelectedList}
                                        selectedlist={selectedlist}
                                    />
                                ))
                            }
                        </div>
                    </div>
                    <div className="Recent-search">
                        <br></br>
                        <h1>Riwayat Pencarian Sebelumnya</h1>
                        <div className="Album-container-recent">
                            {recent.map((item) => (
                                <Recent
                                    key={item.id}
                                    img={item.album.images[2].url}
                                    title={item.name}
                                    artist={item.artists[0].name}
                                />
                                )
                            )
                            }
                        </div>
                        <br></br>
                    </div>
                </>
            )
                :
            <h2>Status: belum login</h2>
            }
        </div>
    )
}
const mapStateToProps = (state) => ({
    token: state.token,
  });
  
export default connect(mapStateToProps)(Search);