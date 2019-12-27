import React from "react";
import { useAuth0 } from "../AuthProvider";
import { Link } from "react-router-dom";
const { Auth0Lock } = require("auth0-lock");

const NavBar = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    let lock;

    let options = {
        auth: {
            responseType: "token id_token",
            audience: "https://jlb1999.auth0.com/userinfo",
            redirectUrl: "http://localhost:3001",
            scope: "openid profile family_name given_name"
        },
        autoclose: true,
        oidcConformant: false,
        additionalSignUpFields: [
            {
                name: "given_name",
                placeholder: "Enter your first name",
                // The following properties are optional
                validator: function (given_name) {
                    return {
                        valid: given_name.length >= 2,
                        hint: "You must include a first name" // optional
                    };
                }
            },
            {
                name: "family_name",
                placeholder: "Enter your last name",
                validator: function (family_name) {
                    return {
                        valid: family_name.length >= 2,
                        hint: "You must include a last name"
                    };
                }
            }
        ]
    }

    lock = new Auth0Lock('piWchDvXGOycCbEuR95WgYqkX0BvC6cQ', 'jlb1999.auth0.com', options)

    const handleClick = () => {
        lock.show()
    }

    var accessToken = null;
    var profile = null;

    lock.on('authenticated', (authResult) => {
        console.log(authResult);


        lock.getUserInfo(authResult.accessToken, (error, profileResult) => {
            if (error) {
                return;
            };

            accessToken = authResult.accessToken;
            profile = profileResult;
            console.log(profile);
        })


    })
    return (
        <div>
            <div>
                < button onClick={() => loginWithRedirect({})} > Login</button >
            </div>

            < div >
                <button onClick={() => logout()}>Log Out</button>
                <button><Link to="/profile">Profile</Link></button>
            </div >
        </div>
    )
}


export default NavBar;
