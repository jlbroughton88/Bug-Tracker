import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import { Auth0Provider } from "./contexts/auth0-context";
// import config from "./auth_config.json";
import history from "./utils/history";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// A function that routes the user to the right place after login.
const onRedirectCallback = appState => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    )
}

ReactDOM.render(
    <Auth0Provider>
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
