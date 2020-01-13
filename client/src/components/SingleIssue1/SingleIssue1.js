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
    }, [])


    return (
        <div className="singleMother">
            <div className="singleMain">
                <h1 className="singleTitle">{issue.issue_title}</h1>
                <h3 className="singleNickname">{issue.nickname}</h3>
                <p className="singleText">{issue.issue_text}</p>
                <p className="singleDate">{issue.date_created}</p>
                <p className="singleTime">{issue.time_created}</p>
                <p className="singleUpvotes">Upvotes: {issue.upvotes}</p>
                <p className="singleDownvotes">Downvotes: {issue.downvotes}</p>
            </div>

        </div>
    )
}

export default SingleIssue1;