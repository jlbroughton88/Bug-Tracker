import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import "./Home1.scss";
import axios from "axios";

const Home1 = () => {

    const { isLoading, user, dbUser } = useAuth0();

    return (
        <div className="home1Mother">
            <div className="home1Main">

                {!isLoading && !user && (
                    <h1>Welcome to Bug Tracker!</h1>
                )}
                {!isLoading && dbUser && (
                    <div>
                        <h1>Welcome to Bug Tracker, {dbUser.given_name != "null" ? dbUser.given_name : dbUser.nickname}!</h1>
                        <Link to="/post">
                            <button className="issuePromptBtn">
                                <h3 className="issuePromptHead">Post an issue?</h3>
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home1;    