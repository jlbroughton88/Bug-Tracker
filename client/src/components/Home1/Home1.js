import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import "./Home1.scss";
import axios from "axios";

const Home1 = () => {

    const [ currentId, setId ] = useState(0);
    const { isLoading, user } = useAuth0();

    useEffect(() => {
        if (user) {
            axios
                .get(`http://localhost:5002/api/finduser/${user.email}`)
                .then(response => setId(response.data.uid))
                .catch(err => console.log(err))
        } else {
            console.log("no user yet")
        }

    })

    if (isLoading) {
        return <div>Loading...</div> 
      }


    return (
        <div className="home1Mother">
            <div className="home1Main">
                {isLoading && !user && (
                    <h3>Loading...</h3>
                )}
                {!isLoading && !user && (
                    <h1>Welcome to Bug Tracker!</h1>
                )}

                {!isLoading && user && (
                    <div>
                        <h1>Welcome to Bug Tracker, {user.given_name ? user.given_name : user.nickname}!</h1>
                        <h3>{currentId}</h3>
                        <Link to="profile">Profile</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home1;    