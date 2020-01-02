import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth0 } from "../contexts/auth0-context";
import Profile from "./pages/Profile";


const AppRouter = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/profile" component={Profile} />
    </Switch>
)

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth0();
    console.log(user)

    return (
        <Route
            {...rest}
            render={props =>

                user ? 
                ( <Component {...props} /> ) 
                : 
                ( <Redirect to={{ pathname: "/" }} /> )

            }
        />
    )


}


export default AppRouter;