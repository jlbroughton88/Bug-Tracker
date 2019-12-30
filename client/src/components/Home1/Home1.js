import React from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import "./Home1.scss";

const Home1 = () => {

    const { isLoading, user } = useAuth0();
    console.log(user);


    return (
        <div className="home1Mother">
            <div className="home1Main">
                { isLoading && !user && (
                    <h3>Loading...</h3>
                )}
                { !isLoading && !user && (
                    <h1>Welcome to Bug Tracker!</h1>
                )}

                { !isLoading && user && (
                    <h1>Welcome to Bug Tracker, {user.given_name ? user.given_name : user.nickname}!</h1>
                )}
            </div>
        </div>
    )
}

export default Home1;