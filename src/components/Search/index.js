import { Component } from "react";
import Track from "../Track";
import Login from "../Login";
const axios = require('axios').default;

// axios.<method> will now provide autocomplete and parameter typings


class Search extends Component{
    state ={
        login: false,
        keyword:"",
        tracks: [],
        token: ""
    }

    handleInput = (e)=>{
        this.setState({keyword: e.target.value})
    }

    handleSubmit = async()=>{
        try{
            const response = await axios.get("https://api.spotify.com/v1/search", {
                params: {
                    type: 'track',
                    q: this.state.keyword,
                    limit: 5
                },
                headers: {
                    Authorization: `Bearer ${this.state.token}`
                }

            })
            this.setState({
                tracks: response.data.tracks.items
            })
            window.scrollTo({ top: 5250, behavior: 'smooth' });
        }
        catch(e){
            alert("Tidak dapat mengautentikasi. Silahkan login terlebih dahulu.")
            console.error(e)
        }

    }

    componentDidMount(){
        const url = localStorage.getItem("access_token");
        if( url !== null){
            this.setState({
                token: localStorage.getItem("access_token"),
                login: true
            })
        }
        else{
            this.setState({
                token: "",
                login: false
            })
        }
    }

    handleKeyPress = e => {
        if (e.key === "Enter") {
            this.handleSubmit();
        }
    };

    render(){
        return(
            <div class="search-content">
            <h1>Want to search for another songs? Find them here</h1>

            <Login/>
            <br/>
            <div class="search-form">
                <input type="text" onChange={this.handleInput} onKeyPress={this.handleKeyPress}/>
                <button onClick={this.handleSubmit}>Cari</button>
            </div>
            <h3>Hasil pencarian : {this.state.keyword}</h3>
            <br/>

            {
                (this.state.login)?
                this.state.tracks.map((item) => (
                    <Track
                    item={item}
                    />
                    
                    ))
                :
                <h2>Status: belum login</h2>
                    
           }
            </div>
        )
    }
}

export default Search;