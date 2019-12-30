import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import "./Navbar.scss";

const NavBar = () => {

    const { isLoading, loginWithRedirect, logout, user } = useAuth0();

    return (
        <nav className="navMother">
            <div className="navMain">
                <section className="leftNav">
                    <div className="logoDiv">
                        <div className="logo">Bug Tracker</div>
                    </div>
                </section>
                <section className="rightNav">
                    <div className="loginLogoutSect">
                        { !isLoading && !user && (
                            <div className="loggedOutSect">
                                <button className="navLogIn" onClick={loginWithRedirect}>Log In</button>
                            </div>
                        )}
                        { !isLoading && user && (
                            <div className="loggedInSect">
                                <h2 className="navGreeting">Hello, {user.given_name ? user.given_name : user.nickname}!</h2>
                                <button className="navLogOut" onClick={logout}> Log Out</button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </nav>
    )
}


export default NavBar;
