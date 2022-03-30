import { Component } from "react";

class Login extends Component{
    state = {
        login: false,
        token: "",
        CLIENT_ID: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
        REDIRECT_URI: "http://localhost:3000/",
        AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
        RESPONSE_TYPE: "token"
    }

    handleLogin = ()=>{
        window.location = `${this.state.AUTH_ENDPOINT}?client_id=${this.state.CLIENT_ID}&redirect_uri=${this.state.REDIRECT_URI}&response_type=${this.state.RESPONSE_TYPE}`;
    }
    
    handleLogout = ()=>{
        this.setState({
            token:"",
            login: false
        })
        localStorage.clear()
        window.location = `${this.state.REDIRECT_URI}`;
    }

    // showToken = () =>{
    // const url = window.location.hash
    // console.log(url)
    // }

    componentDidMount(){
        let url = window.location.hash;
        if(url.length > 0 ){
            url = url.substring(1).split("&")[0].split("=")[1];
            this.setState({
                token: url,
                login: true
            })
            
            localStorage.setItem("access_token", url);
        }
    }

    render(){
        return(
            <div class="login-content">
            {
                (!this.state.login) ?
                <button onClick={this.handleLogin} >Login with Spotify Auth API</button>
                :
                <button onClick={this.handleLogout} >Logout</button>
            }
            </div>
        );
    }

}

export default Login;