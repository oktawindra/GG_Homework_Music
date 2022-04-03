import { Component, useEffect, useState } from "react";
import Track from "../Track";
import Login from "../Login";
import Recent from "../RecentSearch";
import Play from '../Playlist/play.js'
import { getUserProfile } from '../../Data/Profile.js'
const axios = require('axios').default;


const Search = () => {
    const [login, setLogin] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [tracks, setTracks] = useState([]);
    const [token, setToken] = useState([]);
    const [recent, setRecent] = useState([]);
    const [selectedlist, setSelectedList] = useState([]);
    const [user, setUser] = useState({});


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
        const accessTokenParams = new URLSearchParams(window.location.hash).get('#access_token');
        
        if (accessTokenParams !== null) {
            setToken(accessTokenParams);
            setLogin(accessTokenParams !== null);
    
            const setUserProfile = async () => {
            try {
                const response = await getUserProfile(accessTokenParams);
    
                setUser(response);
            } catch (e) {
            }
            }
        setUserProfile();
        }
    }, []);

    return (
        <div className="search-content">
        <h1>Want to search for some songs? Find them here</h1>
            {(login)?
            <></>
            :
            <h5>Tekan tombol Login agar dapat melakukan pencarian</h5>
            }
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
                    <hr></hr>
                    <br></br>
                    <h1>Riwayat Pencarian Sebelumnya</h1>
                    <div className="Album-container">
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
                </>
            )
                :
            <h2>Status: belum login</h2>
            }
        </div>
    )
}

export default Search;