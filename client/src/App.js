import React from 'react';
import { useSelector, useDispatch } from "react-redux"
import allActions from "./actions/index";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./react-auth0-spa";
import RevealText from "./components/textState";
import './App.css';

const App = () => {

  const counter = useSelector(state => state.reducer);
  const { loading } = useAuth0();

  const dispatch = useDispatch();


  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <NavBar />
      <h1>Hello World</h1>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(allActions.actions.increment())}>Add!</button>
      <button onClick={() => dispatch(allActions.actions.decrement())}>Decrease!</button>
      <RevealText maxLength={15} text="howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy "/>
    </div>
  );
}


export default App;
