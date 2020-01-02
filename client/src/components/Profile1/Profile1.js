import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import { Link } from "react-router-dom";
import "./Profile1.scss";

const Profile1 = () => {
    const { isLoading, user } = useAuth0();

    return (

        <div className="profile1Mother">
            <div className="profile1Main">
                {isLoading && !user && (
                    <h3>Loading...</h3>
                )}
                {!isLoading && user && (
                    <div>
                        <h1>{user.given_name ? user.given_name : user.nickname}'s Profile</h1>
                    </div>
                )}
            </div>
        </div>

    )
}

export default Profile1;