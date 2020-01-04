import React from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import allActions from "../../actions/index";
// import RevealText from "../textState";
import Home1 from "../Home1/Home1";

const Home = () => {
  // const counter = useSelector(state => state.reducer);
  // const dispatch = useDispatch();

  return (
      <div className="Home">
        <div className="homeMain">
          <Home1/>
        </div>

        {/* <h1>Hello World</h1>
        <h1>Counter: {counter}</h1>
        <button onClick={() => dispatch(allActions.actions.increment())}>Add!</button>
        <button onClick={() => dispatch(allActions.actions.decrement())}>Decrease!</button>
        <RevealText maxLength={15} text="howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy " /> */}
      </div>

  );
}

export default Home;