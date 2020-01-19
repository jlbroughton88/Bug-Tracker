import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";
import "./AllIssues1.scss";

const AllIssues1 = () => {
  const { isLoading, user, dbUser, statusUrl } = useAuth0();
  const [issueArr, setIssueArr] = useState([]);

  useEffect(() => {
    axios
      .get(`${statusUrl}/api/issues/${dbUser.uid}`)
      .then(response => setIssueArr([...response.data]))
      .catch(err => console.log(err));
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <section className="bioSection">
        <img className="profilePic" src={user.picture} alt={dbUser.nickname} />

        <div className="bioInfo">
          <h1 className="profileName">
            {dbUser.given_name !== "null" ? dbUser.given_name : dbUser.nickname}
            's Profile
          </h1>

          {dbUser.company !== "null" && dbUser.role !== "null" && (
            <h1 className="profileRoleComp">
              {dbUser.role} at {dbUser.company}
            </h1>
          )}
        </div>
      </section>
      <section className="issuesSection">
        {issueArr.reverse().map(issue => (
          <div key={issue.uid} className="issuePost">
            {console.log("not slicing")}
            <Link to={`/issues/${issue.uid}`}>
              <h2 className="issueTitle">{issue.issue_title}</h2>
            </Link>
            <p className="issuePara">{`${issue.date_created} | ${issue.time_created}`}</p>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default AllIssues1;
