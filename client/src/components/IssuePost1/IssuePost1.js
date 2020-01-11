import React, { useState, useEffect, useCallback } from "react";
import "./IssuePost1.scss";
import axios from "axios";
import { useAuth0 } from "../../contexts/auth0-context";
import moment from "moment";

const IssuePost = () => {

    const [issueTitle, setIssueTitle] = useState("");
    const [issueText, setIssueText] = useState("");
    const [issueArr, setIssueArr] = useState([]);
    const { dbUser } = useAuth0();
    const [issueArrLen, setIssueArrLen] = useState(0);
    const [loading, setLoading] = useState(true);


    const handleSubmit = (e) => {
        postIssue();
        e.preventDefault();
    };

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + max)
    }

    const postIssue = () => {
        const uid = getRandomInt(10000000, 100000000);
        const formattedUid = uid.toString();
        const user_uid = dbUser.uid.toString();
        let time = moment().format('LT');
        let date = moment().format('L')
        let formattedTime = time.replace(/\s/, "")
        let formattedDate = date.replace(/\//g, "-")
        axios
            .post("http://localhost:5002/api/issue/post", {
                uid: formattedUid,
                user_uid: user_uid,
                nickname: dbUser.nickname,
                issue_title: issueTitle,
                issue: issueText,
                date_created: formattedDate,
                time_created: formattedTime
            }, { timeout: 300 })
            .then(response => console.log(response.data))
            .catch(err => console.log(err))
    }

    return (
        <div className="issuePost1Mother">
            <div className="issuePost1Main">
                <h1>Post an issue?</h1>
                <form className="issueForm" onSubmit={handleSubmit}>
                    <input className="issueTitleInput" placeholder="Title your issue..." type="text" value={issueTitle} onChange={e => setIssueTitle(e.target.value)} />
                    <textarea className="issueTextInput" value={issueText} type="text" placeholder="Explain your issue..." onChange={e => setIssueText(e.target.value)} />
                    <input className="issueSubmit" type="submit" />
                </form>
                <div className="issuesWrapper">
                    {issueArr.map(issue =>
                        <div className="issuePost">
                            {issue.issue_text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default IssuePost;