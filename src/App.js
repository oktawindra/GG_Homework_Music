import './App.css';
import './App.css';
import Search from "./components/Search";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Home from './pages/Home/';
import { dataAccessToken } from './Data/Action.js';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

function App() {
  const token = useSelector(state => state.dataAccessToken.value);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(()=>{
    if(token !== ""){
      setIsLogin(true);
    }else{
      setIsLogin(false);
    }
  },[token])

  useEffect(() => {
    let url = window.location.hash;
    if(url.length > 0 ){
        url = url.substring(1).split("&")[0].split("=")[1];
        dispatch(dataAccessToken(url));
    }
  }, [dispatch])

  return (  
  <div className='App'>
  <h1>Want to search for some songs? Find them here</h1>
    <Router>
      <Switch>
        <Route exact path="/">
          { (!isLogin)? <Home/> : <Redirect to="/create-playlist"/>}
        </Route>
        <Route path="/create-playlist">
          { (!isLogin)?
            <Redirect to="/"/>
          : 
          <Search
            tokencode={token}
          />
          }
        </Route>
      </Switch>
    </Router>
  </div>
  );
}

export default App;