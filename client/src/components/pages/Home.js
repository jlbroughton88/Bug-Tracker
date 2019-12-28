import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../actions/index";
import { useAuth0 } from "../../AuthProvider";
import RevealText from "../textState";
import useAxios from "axios-hooks";

const Home = () => {

  const counter = useSelector(state => state.reducer);
  // const { loading } = useAuth0();

  const dispatch = useDispatch();

  const [{data, loading, error, response}, refetch] = useAxios(
    // 'http://localhost:3001'
    "https://bug-tracker-jb.herokuapp.com"
  )
  // console.log(response)


  if (loading) {
    return <div>Loading...</div>
  }

  return (
      <div className="Home">
        <h1>Hello World</h1>
        <h1>Counter: {counter}</h1>
        <button onClick={() => dispatch(allActions.actions.increment())}>Add!</button>
        <button onClick={() => dispatch(allActions.actions.decrement())}>Decrease!</button>
        <RevealText maxLength={15} text="howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy howdy " />
      </div>

  );
}

export default Home;