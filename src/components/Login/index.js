import { useEffect, useState } from "react";

const Login = ()=>{

    const [login, setLogin] = useState(false);
    const [token, setToken] = useState("");
    const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const REDIRECT_URI = "http://localhost:3000/";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";
    const SCOPE = "playlist-modify-private";

    const handleLogin = ()=>{
        window.location = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    }
    
    const handleLogout = ()=>{
        setLogin(false);
        setToken("");
        localStorage.clear()
        window.location = REDIRECT_URI;
    }


    useEffect(()=> {
            let url = window.location.hash;
            if(url.length > 0 ){
                url = url.substring(1).split("&")[0].split("=")[1];
                setToken(url);
                setLogin(true);
                
                localStorage.setItem("access_token", url);
            }
        }, []
    )
    return(
        <div class="login-content">
        {
            (!login)?
            <button onClick={handleLogin} >Login with Spotify Auth API</button>
            :
            <button onClick={handleLogout} >Logout</button>
        }
        </div>
    );

}

export default Login;