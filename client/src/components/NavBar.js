import React from "react";
import { useAuth0 } from "../AuthProvider";
import isAuthenticated from "../Auth/isAuthenticated";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            <button><Link to="/">Home</Link></button>
            {!isAuthenticated && (
                <button onClick={() => loginWithRedirect({})}>Log In</button>
            )}

            {isAuthenticated &&
                <div>
                    <button onClick={() => logout()}>Log Out</button>
                    <button><Link to="/profile">Profile</Link></button>
                </div>
            }
        </div>

    )
}

export default NavBar;
