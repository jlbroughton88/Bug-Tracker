import React, { useEffect, useState } from "react";
import "./SingleIssue1.scss";
import axios from "axios";

const SingleIssue1 = () => {

    const [issue, setIssue] = useState({})

    useEffect(() => {
        let issueUid = window.location.pathname.replace("/issues/", "")
        axios
            .get(`http://localhost:5002/api/getissue/${issueUid}`)
            .then(response => setIssue(response.data))
            .catch(err => console.log(err))
    })


    return (
        <div>
            <h1>{issue.issue_title}</h1>
            <h3>{issue.nickname}</h3>
            <p>{issue.issue_text}</p>
            <p>{issue.date_created}</p>
            <p>{issue.time_created}</p>
        </div>
    )
}

export default SingleIssue1;