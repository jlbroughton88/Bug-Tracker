import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import Loading from "../Loading/Loading";
import "./Home1.scss";
import axios from "axios";

const Home1 = () => {

    const { isLoading, user, dbUser, statusUrl } = useAuth0();
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        axios
            .get(`${statusUrl}/api/getallissues`)
            .then(response => setIssues([...response.data].reverse()))
            .catch(err => console.log(err))

    }, [])

    if (isLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="home1Mother">
            <div className="home1Main">
                
                    {!isLoading && !user && (
                    <div className="noUserCont">
                        <h1>Welcome to Bug Tracker!</h1>
                    </div>
                    )}
                

               
                    {!isLoading && dbUser && ( 
                    <div className="userCont">
                        <div className="userContChild">
                            <div className="headDiv">
                                <h1 className="homeHead">Welcome, {dbUser.given_name != "null" ? dbUser.given_name : dbUser.nickname}!</h1>
                                <Link to="/post">
                                    <div className="promptBtnDiv">
                                        <button className="issuePromptBtn"> Post an issue? </button>
                                    </div>
                                </Link>
                            </div>
                            <div className="recentIssuesDiv">
                                <div className="recentHeadDiv">
                                    <h3 className="recentHead">Recent Open Issues</h3>
                                </div>
                                <div className="recentIssuesList">
                                    {
                                        issues.map(issue =>
                                            <Link key={issue.uid} to={`/issues/${issue.uid}`}>
                                                    <div className="issuePost" >
                                                        <h3 className="issueTitle">{issue.issue_title}</h3>
                                                        <div className="recentDateTime">
                                                            <p className="issueNickname">{issue.nickname}</p>
                                                            <p className="issueDate">{issue.date_created}</p>
                                                            <p className="issueTime">{issue.time_created}</p>
                                                        </div>
                                                </div>
                                            </Link>

                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                
            </div>
        </div>
    )
}

export default Home1;    