import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./store";
import { Auth0Provider } from "./contexts/auth0-context";
import { IssuesProvider } from "./contexts/issues-context";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { usePromiseTracker } from "react-promise-tracker";


ReactDOM.render(
    <Auth0Provider>
        {/* <IssuesProvider> */}
            <Provider store={store}>
                <App />
            </Provider>
        {/* </IssuesProvider> */}
    </Auth0Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
