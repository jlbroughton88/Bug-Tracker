import React from 'react';
// import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/Navbar/NavBar";
import { useAuth0 } from "./contexts/auth0-context";
import AppRouter from "./components/Router";
import './App.css';

const App = () => {

  const { isLoading, user } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div> 
  }
  

  return (
    <Router> 
      <div className="App">
        <NavBar />
        <AppRouter/>
      </div>
   </Router>

  );
}




export default App;
