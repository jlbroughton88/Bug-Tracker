import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import Loading from "../Loading/Loading";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import "./Profile1.scss";

const Profile1 = () => {
  const { isLoading, user, dbUser, statusUrl } = useAuth0();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [issueArr, setIssueArr] = useState([]);
  const [reversedArr, setReversedArr] = useState([]);

  const getIssue = () => {
    axios
      .get(`${statusUrl}/api/issues/${dbUser.uid}`)
      .then(response => setIssueArr(() => [...response.data].reverse()))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getIssue();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmitName = e => {
    console.log(`Submitting name: ${first} ${last}`);
    addName();
  };

  const handleSubmitCompRole = e => {
    console.log(`Submitting company and role: ${role} at ${company}`);
    addCompRole();
  };

  const addName = () => {
    axios
      .get(`${statusUrl}/api/addname/${first}/${last}/${user.email}`, {
        timeout: 200
      })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  const addCompRole = () => {
    axios
      .get(`${statusUrl}/api/addcomprole/${company}/${role}/${user.email}`, {
        timeout: 200
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <div className="profile1Mother">
      <div className="profile1Main">
        <section className="bioSection">
          <img
            className="profilePic"
            src={user.picture}
            alt={dbUser.nickname}
          />
          <div className="bioInfo">
            <h1 className="profileName">
              {dbUser.given_name !== "null"
                ? dbUser.given_name
                : dbUser.nickname}
              's Profile
            </h1>

            {dbUser.company !== "null" && dbUser.role !== "null" && (
              <h3 className="profileRoleComp">
                {dbUser.role} at {dbUser.company}
              </h3>
            )}
          </div>
          {dbUser.given_name === "null" && dbUser.family_name === "null" && (
            <form onSubmit={handleSubmitName} value="Submit">
              <input
                className="profileInput"
                placeholder="first name"
                type="text"
                value={first}
                name="firstname"
                onChange={e => setFirst(e.target.value)}
              />
              <input
                className="profileInput"
                placeholder="last name"
                type="text"
                value={last}
                name="lastname"
                onChange={e => setLast(e.target.value)}
              />
              <input
                className="profileSubmit"
                placeholder="submit"
                type="submit"
              />
            </form>
          )}{" "}
          {dbUser.company === "null" && dbUser.role === "null" && (
            <form onSubmit={handleSubmitCompRole} value="submit">
              <input
                className="profileInput"
                type="text"
                placeholder="Company"
                value={company}
                name="company"
                onChange={e => setCompany(e.target.value)}
              />
              <input
                className="profileInput"
                type="text"
                placeholder="Role"
                value={role}
                name="role"
                onChange={e => setRole(e.target.value)}
              />
              <input
                className="profileSubmit"
                type="submit"
                placeholder="submit"
              />
            </form>
          )}
        </section>

        <div className="issuesWrapper">
          <div className="issuesDiv">
            {issueArr.length <= 5 ? (
              issueArr.map(issue => (
                <div key={issue.uid} className="issuePost">
                  <Link to={`/issues/${issue.uid}`}>
                    <h2 className="issueTitle">{issue.issue_title}</h2>
                  </Link>
                  <p className="issuePara">{`${issue.date_created} | ${issue.time_created}`}</p>
                </div>
              ))
            ) : (
              <div>
                {issueArr.slice(0, 5).map(issue => (
                  <div key={issue.uid} className="issuePost">
                    <Link to={`/issues/${issue.uid}`}>
                      <h2 className="issueTitle">{issue.issue_title}</h2>
                    </Link>
                    <p className="issuePara">{`${issue.date_created} | ${issue.time_created}`}</p>
                  </div>
                ))}
                <Link to={`/all/${dbUser.uid}/`}>
                  <button className="issueViewBtn">View All</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Profile1;
