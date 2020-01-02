import React, { Component, createContext, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
const axios = require("axios");
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

// Create the context
export const Auth0Context = createContext();

export const useAuth0 = () => useContext(Auth0Context);

// Create a provider
export class Auth0Provider extends Component {
    state = {
        auth0Client: null,
        isLoading: true,
        isAuthenticated: false,
        user: null
    };

    config = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin
    };

    componentDidMount() {
        this.initializeAuth0();
    };

    addUser = async (newUser) => {
        // try {
        //     await axios.get(`http://localhost:5002/api/newuser/${newUser.email}/${newUser.given_name}/${newUser.family_name}/${newUser.nickname}`);
        // } catch (error) {
        //     console.log(error.toJSON());
        // )
        await axios
            .get(`http://localhost:5002/api/newuser/${newUser.email}/${newUser.given_name}/${newUser.family_name}/${newUser.nickname}`, { timeout: 1 })
            .then(response =>  response)
            .catch(error => { console.log(error)})
    } 

    findUser = async (newUser) => {
        axios.get(`http://localhost:5002/api/finduser/${newUser.email}`)
            .then(response => {
                if(response.data === "") {
                    this.addUser(newUser);
                    console.log("user added!")
                } else {
                    console.log("User already exists!")
                }
            }).catch(error => {
                console.log(error.toJSON());
            })
    }

    // Initialize the auth0 library
    initializeAuth0 = async () => {
        const auth0Client = await createAuth0Client(this.config);

        this.setState({ auth0Client });

        // Check to see if they have been redirected after login
        if (window.location.search.includes("code=")) {
            return this.handleRedirectCallback();
        };

        const isAuthenticated = await auth0Client.isAuthenticated();
        const user = isAuthenticated ? await auth0Client.getUser() : null;

        this.setState({ isLoading: false, isAuthenticated, user });
    };

    // Handles the authentication callback
    handleRedirectCallback = async () => {
        this.setState({ isLoading: true });

        await this.state.auth0Client.handleRedirectCallback();
        const user = await this.state.auth0Client.getUser();
        this.setState({ user, isAuthenticated: true, isLoading: false })

        await this.findUser(user);
        // await source.cancel("request canceled")

        window.history.replaceState({}, document.title, window.location.pathname);
    };

    render() {
        const { auth0Client, isLoading, isAuthenticated, user } = this.state;
        const { children } = this.props;

        const configObject = {
            isLoading,
            isAuthenticated,
            user,
            loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
            getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
            getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
            logout: (...p) => auth0Client.logout(...p)
        };

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        )
    }
}