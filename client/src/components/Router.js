import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import { useAuth0 } from "../contexts/auth0-context";
import Profile from "./pages/Profile";
import SingleIssue from "./pages/SingleIssue"
import IssuePost from "./pages/IssuePost";
import AllIssues from "./pages/AllIssues";


const AppRouter = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/post" component={IssuePost}/>
        <Route path="/issues/:issueuid" component={SingleIssue}/>
        <Route path="/all/:useruid" component={AllIssues}/>
        <PrivateRoute path="/profile" component={Profile} />
    </Switch>
)

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth0();

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