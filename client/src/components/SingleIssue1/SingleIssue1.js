import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import moment from "moment";
import "./SingleIssue1.scss";
import axios from "axios";

const SingleIssue1 = () => {

    const [issue, setIssue] = useState({});
    const [newComment, setNewComment] = useState("");
    const { statusUrl, dbUser, user } = useAuth0();
    const [comments, setComments] = useState([]);
    const [downVotes, setDownVotes] = useState();
    const [upVotes, setUpVotes] = useState();


    useEffect(() => {
        let issueUid = window.location.pathname.replace("/issues/", "")
        axios
            .get(`${statusUrl}/api/getissue/${issueUid}`)
            .then(response => setIssue(response.data))
            .catch(err => console.log(err))

        getComments(issueUid);

    }, [])

    const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + max)
    }


    const handleDelete = (e) => {
        const button = e.target;
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    }

    const handleCommentChange = (e) => {
        setNewComment(e.target.value)
    }

    const handleSubmit = (e) => {
        let issueUid = window.location.pathname.replace("/issues/", "")
        const uid = getRandomInt(10000000, 100000000);
        const formattedUserUid = dbUser.uid.toString();
        const formattedIssueUid = issue.uid.toString();
        let time = moment().format('LT');
        let date = moment().format('L')
        let formattedTime = time.replace(/\s/, "")
        let formattedDate = date.replace(/\//g, "-")
        console.log(dbUser)
        axios
            .post(`${statusUrl}/api/addcomment/${issueUid}`, {
                comm_uid: uid,
                user_uid: formattedUserUid,
                issue_uid: formattedIssueUid,
                comm_nickname: dbUser.nickname,
                comm_text: newComment,
                date_created: formattedDate,
                time_created: formattedTime,
                upvotes: 0,
                downvotes: 0
            })

        // e.preventDefault();
    }

    const getComments = (issueUid) => {
        axios
            .get(`${statusUrl}/api/getcomments/${issueUid}`, { timeout: 500 })
            .then(response => setComments([...response.data]))
            .catch(err => console.log(err))
    }

    const openModal = (modal) => {
        const overlay = document.getElementById("overlay");
        if (modal == null) return;
        modal.classList.add("active");
        overlay.classList.add("active");
    }

    const closeModal = (e, modal) => {
        const overlay = document.getElementById("overlay");

        if (e.target.id === "modalClose") {

            const button = e.target;
            const modal = button.closest('.deleteModal')
            modal.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            modal.classList.remove('active');
            overlay.classList.remove('active');
        }
    }

    const overlayClose = (e) => {
        const modal = document.querySelector(".deleteModal.active");
        closeModal(e, modal)
    }

    const deleteIssue = (e) => {
        axios
            .get(`${statusUrl}/api/deleteissue/${issue.uid}`, { timeout: 300 })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    const handleUpVote = (e) => {
        console.log(e.target)
    }

    const handleDownVote = (e) => {
        console.log(e.target)
    }
    return (
        <div className="singleMother">
            <div className="singleMain">
                <section className="titleTextSection">
                    <h1 className="singleTitle">{issue.issue_title}</h1>
                    <p className="singleText">{issue.issue_text}</p>
                </section>


                <div onClick={overlayClose} className="" id="overlay"></div>
                <hr></hr>

                <section className="descSection">
                    <div className="deleteDiv">            
                    
                    {/* Delete Modal */}
                        <div id="deleteModal" className="deleteModal">
                            <div className="modalHead">
                                <h4 className="modalTitle">Notice!</h4>
                                <button onClick={closeModal} id="modalClose" className="modalClose">&times;</button>
                            </div>
                            <div className="modalPara">If you would like to delete this post, please press the "Delete" button. If not, click the "X".</div>
                            <Link to={"/profile"}>
                                <button onClick={deleteIssue} className="deleteBtnModal">Delete</button>
                            </Link>
                        </div>
                        { dbUser.nickname === issue.nickname ? 
                         <button data-modal-target="#deleteModal" className="deleteBtn" onClick={handleDelete}>
                            Delete
                        </button> 
                        :
                        <div>
                            <button onClick={handleUpVote}>Up</button>
                            <button onClick={handleDownVote}>Down</button>
                        </div>
                        }


                    </div>

                    <div className="descDiv">
                        <p className="singleNickname">{issue.nickname}</p>
                        <div className="dateTime">
                            <p className="singleTime">{issue.time_created}</p>
                            <p className="singleDate">{issue.date_created}</p>
                        </div>
                    </div>
                </section>
                <section className="commentSection">
                    <h2 className="commentsHead">Comments</h2>
                    <form className="commentForm" onSubmit={handleSubmit} type="submit">
                        <textarea className="commentInput" onChange={handleCommentChange} placeholder="Add a informative and helpful comment..." />
                        <input className="commentSubmit" placeholder="Submit" type="submit" />
                    </form>
                    <div className="commentList">
                        {
                            comments.map(comment =>
                                <div className="commItem" key={comment.comm_uid}>
                                    <h3 className="commText">{comment.comm_text} - <strong>{comment.comm_nickname}</strong></h3>

                                    <div className="dateTimeNameDiv">
                                        {/* <p className="commName">{comment.comm_nickname}</p> */}
                                        <p className="commTime">{comment.time_created}</p>
                                        <p className="commDate">{comment.date_created}</p>

                                    </div>
                                </div>
                            )
                        }
                    </div>
                </section>
            </div>




        </div>
    )
}

export default SingleIssue1;