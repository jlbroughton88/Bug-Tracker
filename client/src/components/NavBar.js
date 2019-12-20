import React from "react";
import { useAuth0 } from "../AuthProvider";
import { Link } from "react-router-dom";
const { Auth0Lock } = require("auth0-lock");

const NavBar = () => {
    // console.log(useAuth0());
    const { logout } = useAuth0();

    // return (
    //     <div>
    //         <button><Link to="/">Home</Link></button>
    //         {/* {!isAuthenticated && (
    //             <button onClick={() => loginWithRedirect({})}>Log In</button>
    //         )}
    //     </div>

    // )

    // ===============================
    // This works, but need to figure out how to get response logged
    // and how to make the log in button go away when user is authenticated.
    var options = {
        additionalSignUpFields: [
            {
                name: "first_name",
                placeholder: "Enter your first name",
                // The following properties are optional
                validator: function (first_name) {
                    return {
                        valid: first_name.length >= 2,
                        hint: "You must include a first name" // optional
                    };
                }
            },
            {
                name: "last_name",
                placeholder: "Enter your last name",
                validator: function (last_name) {
                    return {
                        valid: last_name.length >= 2,
                        hint: "You must include a last name"
                    };
                }
            }
        ]
    }

    var lock = new Auth0Lock('piWchDvXGOycCbEuR95WgYqkX0BvC6cQ', 'jlb1999.auth0.com', options, {
        auth: {
            redirectUrl: 'http://localhost:3001',
            responseType: 'token id_token',
            audience: 'https://jlb1999.auth0.com/userinfo',
            params: {
                scope: 'openid profile email' // Learn about scopes: https://auth0.com/docs/scopes
            }
        }
    });



    const handleClick = () => {
        lock.show()
    }

    var accessToken = null;
    var profile = null;

    lock.on('authenticated', (authResult) => {
        console.log(authResult);
        lock.getUserInfo(authResult.accessToken, (error, profileResult) => {
            if(error) {
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
                < button onClick={handleClick} > Login</button >
            </div>

            < div >
                <button onClick={() => logout()}>Log Out</button>
                <button><Link to="/profile">Profile</Link></button>
            </div >
        </div>
    )
}


export default NavBar;
