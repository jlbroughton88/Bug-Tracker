import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./AuthProvider";
import Profile from "./components/pages/Profile";
import './App.css';

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <div className="App">
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
