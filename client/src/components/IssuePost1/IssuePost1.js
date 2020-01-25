import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import "./IssuePost1.scss";
import axios from "axios";
import { useAuth0 } from "../../contexts/auth0-context";
import moment from "moment";
import Loading from "../Loading/Loading";
// import Footer from "../Footer/Footer";

const IssuePost = () => {
  const [issueTitle, setIssueTitle] = useState("");
  const [issueText, setIssueText] = useState("");
  const { dbUser, statusUrl } = useAuth0();
  const [issueUid, setIssueUid] = useState("");
  const [recentIssue, setRecentIssue] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   console.log(statusUrl);
  // });

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + max);
  };

  const postIssue = uid => {
    const formattedUid = uid.toString();
    const user_uid = dbUser.uid.toString();
    let time = moment().format("LT");
    let date = moment().format("L");
    let formattedTime = time.replace(/\s/, "");
    let formattedDate = date.replace(/\//g, "-");
    axios
      .post(
        `${statusUrl}/api/issue/post`,
        {
          uid: formattedUid,
          user_uid: user_uid,
          nickname: dbUser.nickname,
          issue_title: issueTitle,
          issue: issueText,
          date_created: formattedDate,
          time_created: formattedTime
        },
        { timeout: 300 }
      )
      .then(response => console.log(response.data))
      .catch(err => console.log(err));
  };

  const getRecentIssue = uid => {
    axios
      .get(`${statusUrl}/api/getissue/${uid}`)
      .then(response => setRecentIssue(response.data.uid))
      .catch(err => console.log(err));
  };

  const handleSubmit = e => {
    const uid = getRandomInt(10000000, 100000000);
    postIssue(uid);
    setIssueUid(uid);
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      getRecentIssue(uid);
      setLoading(false);
    }, 500);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="issuePost1Mother">
      <div className="issuePost1Main">
        <h1 className="issueHead">Post an issue?</h1>
        <form id="issueForm" className="issueForm" onSubmit={handleSubmit}>
          <input
            className="issueTitleInput"
            placeholder="Title your issue..."
            type="text"
            value={issueTitle}
            onChange={e => setIssueTitle(e.target.value)}
          />
          <textarea
            className="issueTextInput"
            value={issueText}
            type="text"
            placeholder="Explain your issue..."
            onChange={e => setIssueText(e.target.value)}
          />
          <input className="issueSubmit" type="submit" />
        </form>
      </div>
      {recentIssue !== "" && (
        <div className="forbidden">
          <h3 className="forbHead">Issue Posted!</h3>
          <Link className="forbLink" to={`/issues/${recentIssue}`}>Click Here</Link>
        </div>
      )}
    </div>
  );
};

export default IssuePost;
