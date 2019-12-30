import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {

    return (
        <div>
            <div>
                {/* <button onClick={() => loginWithRedirect({})} > Login</button > */}
            </div>

            <div>
                {/* <button onClick={() => logout()}>Log Out</button> */}
                <button><Link to="/profile">Profile</Link></button>
            </div >
        </div>
    )
}


export default NavBar;
