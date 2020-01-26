import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";
import "./Home1.scss";
import axios from "axios";

const Home1 = () => {
  const { isLoading, user, dbUser, statusUrl } = useAuth0();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const getIssues = () => {
    axios
      .get(`${statusUrl}/api/getallissues`)
      .then(response => setIssues([...response.data].reverse()))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getIssues();

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, [setIssues]);

  if (isLoading || loading) {
    return <Loading />;
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
              <div className="noticeDiv">
                <h1 className="noticeH1">
                &nbsp; Safari users will be logged out on refresh due to
                  Safari's recent crackdown on cross-site cookie tracking. Auth0 is working on a solution for this, but until then, being
                  logged out only occurs on Safari.
                </h1>
              </div>

              <div className="headDiv">
                <h1 className="homeHead">
                  Welcome,{" "}
                  {dbUser.given_name != "null"
                    ? dbUser.given_name
                    : dbUser.nickname}
                  !
                </h1>
                <Link to="/post">
                  <div className="promptBtnDiv">
                    <button className="issuePromptBtn"> Post an issue? </button>
                  </div>
                </Link>
              </div>
              <div className="issuesParent">
                <div className="openIssuesDiv">
                  <div className="openHeadDiv">
                    <h3 className="openHead">Open Issues</h3>
                  </div>
                  <div className="openIssuesList">
                    {issues.map(
                      issue =>
                        issue.solved === 0 && (
                          <Link key={issue.uid} to={`/issues/${issue.uid}`}>
                            <div className="issuePost">
                              <h3 className="issueTitle">
                                {issue.issue_title}
                              </h3>
                              <div className="openDateTime">
                                <p className="issueNickname">
                                  {issue.nickname}
                                </p>
                                <p className="issueDate">
                                  {issue.date_created}
                                </p>
                                <p className="issueTime">
                                  {issue.time_created}
                                </p>
                              </div>
                            </div>
                          </Link>
                        )
                    )}
                  </div>
                </div>
                <div className="solvedIssuesDiv">
                  <div className="solvedHeadDiv">
                    <h3 className="solvedHead">Solved Issues</h3>
                  </div>
                  <div className="solvedIssuesList">
                    {issues.map(
                      issue =>
                        issue.solved === 1 && (
                          <Link key={issue.uid} to={`/issues/${issue.uid}`}>
                            <div className="issuePost">
                              <h3 className="issueTitle">
                                {issue.issue_title}
                              </h3>
                              <div className="solvedDateTime">
                                <p className="issueNickname">
                                  {issue.nickname}
                                </p>
                                <p className="issueDate">
                                  {issue.date_created}
                                </p>
                                <p className="issueTime">
                                  {issue.time_created}
                                </p>
                                {/* <div className="solvedDiv">
                                  <p>Solved!</p>
                                </div> */}
                              </div>
                            </div>
                          </Link>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home1;
