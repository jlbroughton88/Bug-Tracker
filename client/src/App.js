import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./contexts/auth0-context";
import Profile from "./components/pages/Profile";
import './App.css';

const App = () => {

  const { isLoading, user, loginWithRedirect, logout } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div> 
  }

  return (
    <Router>
      <div className="App">
        <button onClick={loginWithRedirect}>Log In</button>
        <button onClick={logout}>Log out</button>

        {!isLoading && user && (
           <h1>Hello, {user.given_name}!</h1>
        )}
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/profile" component={Profile}/>
        </Switch>
      </div>
    </Router>

  );
}


export default App;
