import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import "./Home1.scss";
import axios from "axios";

const Home1 = () => {

    const { isLoading, user } = useAuth0();
    const [dbUser, setUser] = useState(0);

    useEffect(() => {
        getDbUser();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    const getDbUser = () => {
        if (user) {
            axios
                .get(`http://localhost:5002/api/finduser/${user.email}`, { timeout: 200 })
                .then(response => setUser(response.data))
                .catch(err => console.log(err))
        } else {
            console.log("no user yet")
        }
    }

    return (
        <div className="home1Mother">
            <div className="home1Main">

                {!isLoading && !user && (
                    <h1>Welcome to Bug Tracker!</h1>
                )}

                {!isLoading && user && (
                    <div>
                        {/* <h1>Welcome to Bug Tracker, {user.given_name ? user.given_name : user.nickname}!</h1> */}
                        <h1>Welcome to Bug Tracker {dbUser.given_name ? dbUser.given_name : dbUser.nickname}</h1>
                        <Link to="profile">Profile</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home1;    