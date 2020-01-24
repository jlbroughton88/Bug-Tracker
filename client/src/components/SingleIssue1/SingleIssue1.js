import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import Footer from "../Footer/Footer";
import Loading from "../Loading/Loading";
import moment from "moment";
import "./SingleIssue1.scss";
import axios from "axios";

const SingleIssue1 = () => {
  // const [issueUid, setIssueUid] = useState(window.location.pathname.replace("/issues/", ""))
  const [issue, setIssue] = useState({});
  const [newComment, setNewComment] = useState("");
  const { isLoading, statusUrl, dbUser, user } = useAuth0();
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  let [votes, setVotes] = useState([]);
  const [downVotes, setDownVotes] = useState();
  const [upVotes, setUpVotes] = useState();
  const currentUser = dbUser.uid.toString();
  const [loading, setLoading] = useState(true);

  const getIssue = issueUid => {
    axios
      .get(`${statusUrl}/api/getissue/${issueUid}`, { timeout: 300 })
      .then(response => setIssue(response.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    let issueUid = window.location.pathname.replace("/issues/", "");
    getIssue(issueUid);
    getVotes(issueUid);
    getComments(issueUid);

    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + max);
  };

  const handleDelete = e => {
    const button = e.target;
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  };

  const handleCommentChange = e => {
    setNewComment(e.target.value);
  };

  const handleSubmit = e => {
    let issueUid = window.location.pathname.replace("/issues/", "");
    const uid = getRandomInt(10000000, 100000000);
    const formattedUserUid = dbUser.uid.toString();
    const formattedIssueUid = issue.uid.toString();
    let time = moment().format("LT");
    let date = moment().format("L");
    let formattedTime = time.replace(/\s/, "");
    let formattedDate = date.replace(/\//g, "-");
    axios.post(`${statusUrl}/api/addcomment/${issueUid}`, {
      comm_uid: uid,
      user_uid: formattedUserUid,
      issue_uid: formattedIssueUid,
      comm_nickname: dbUser.nickname,
      comm_text: newComment,
      date_created: formattedDate,
      time_created: formattedTime,
      upvotes: 0,
      downvotes: 0,
      solved: 0
    });

    // e.preventDefault();
  };

  const getComments = issueUid => {
    axios
      .get(`${statusUrl}/api/getcomments/${issueUid}`, { timeout: 500 })
      .then(response => setComments([...response.data].reverse()))
      .catch(err => console.log(err));
  };

  const getVotes = issueUid => {
    axios
      .get(`${statusUrl}/api/getvotes/${issueUid}`, { timeout: 300 })
      .then(response => setVotes([...response.data]))
      .catch(err => console.log(err));
  };

  const openModal = modal => {
    const overlay = document.getElementById("overlay");
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  };

  const closeModal = (e, modal, replyModal) => {
    const overlay = document.getElementById("overlay");

    if (e.target.id === "modalClose") {
      const button = e.target;
      const modal = button.closest(".deleteModal");
      modal.classList.remove("active");
      overlay.classList.remove("active");
    } else {
      if (modal !== null) {
        modal.classList.remove("active");
      }
      if(replyModal !== null) {
        replyModal.classList.remove("active");
      }
      overlay.classList.remove("active");
    }
  };

  const overlayClose = e => {
    const modal = document.querySelector(".deleteModal.active");
    const replyModals = document.getElementsByClassName("replyForm");
    let replyModalsArr = [].slice.call(replyModals)
    for(let i = 0; i < replyModalsArr.length; i++) {
      if(replyModalsArr[i].className.includes("active")) {
        closeModal(e, modal, replyModalsArr[i]);
      }
    }
    closeModal(e, modal, null);
  };

  const deleteIssue = e => {
    axios
      .get(`${statusUrl}/api/deleteissue/${issue.uid}`, { timeout: 300 })
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };

  const voteQuery = (upvote, downvote, issueUid) => {
    let time = moment().format("LT");
    let date = moment().format("L");
    let formattedTime = time.replace(/\s/, "");
    let formattedDate = date.replace(/\//g, "-");

    if (votes.length === 0) {
      handleVotePost(
        issueUid,
        currentUser,
        upvote,
        downvote,
        formattedDate,
        formattedTime
      );
      window.location.reload();
    } else {
      for (let i = 0; i < votes.length; i++) {
        if (votes[i].user_uid === currentUser) {
          handleVoteUpdate(upvote, downvote, issueUid, currentUser);
          break;
        } else {
          handleVotePost(
            issueUid,
            currentUser,
            upvote,
            downvote,
            formattedDate,
            formattedTime
          );
          break;
        }
      }
    }
  };

  const handleUpVote = e => {
    let issueUid = window.location.pathname.replace("/issues/", "");
    voteQuery(1, 0, issueUid);
  };

  const handleDownVote = e => {
    let issueUid = window.location.pathname.replace("/issues/", "");
    voteQuery(0, 1, issueUid);
  };

  const handleVotePost = (
    issue_uid,
    user_uid,
    upvoted,
    downvoted,
    date_voted,
    time_voted
  ) => {
    axios
      .post(
        `${statusUrl}/api/postvote`,
        {
          issue_uid,
          user_uid,
          upvoted,
          downvoted,
          date_voted,
          time_voted
        },
        { timeout: 300 }
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));
    window.location.reload();
  };

  const handleVoteUpdate = (upvote, downvote, issueUid, currentUser) => {
    axios
      .get(
        `${statusUrl}/api/updatevote/${upvote}/${downvote}/${issueUid}/${currentUser}`,
        { timeout: 300 }
      )
      .then(response => console.log(response))
      .catch(err => console.log(err));
    window.location.reload();
  };

  const handleDeleteComment = e => {
    axios
      .get(`${statusUrl}/api/deletecomment/${e.target.id}`)
      .then(response => console.log(response))
      .catch(err => console.log(err));

    window.location.reload();
  };

  const handleSolved = e => {
    let issueUid = window.location.pathname.replace("/issues/", "");
    let comm = e.target.parentNode.parentNode.id;
    console.log(comm);

    axios
      .get(`${statusUrl}/api/updatesolved/${issueUid}/${comm}`)
      .then(response => console.log(response))
      .catch(err => console.log(err));

    window.location.reload();
  };

  const replyFormOpen = e => {
    const overlay = document.getElementById("overlay");
    const commentList = document.getElementsByClassName("replyForm");
    let commArr = [].slice.call(commentList)

    for(let i = 0; i < commArr.length; i++) {
      if(commArr[i].className.includes(e.target.id)) {
        overlay.classList.add("active");
        commArr[i].classList.add("active")
      }
    }
  };

  const replyFormClose = e => {
    const overlay = document.getElementById("overlay");
    const commentList = document.getElementsByClassName("replyForm");
    let commArr = [].slice.call(commentList)

    for(let i = 0; i < commArr.length; i++) {
        overlay.classList.remove("active");
        commArr[i].classList.remove("active")
    }
  };

  if (isLoading || loading) {
    return <Loading />;
  }

  return (
    <div className="singleMother">
      <div className="singleMain">
        <section className="titleTextSection">
          <h1 className={`singleTitle ${issue.solved && "active"}`}>
            {issue.issue_title}
          </h1>
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
                <button
                  onClick={closeModal}
                  id="modalClose"
                  className="modalClose"
                >
                  &times;
                </button>
              </div>
              <div className="modalPara">
                If you would like to delete this post, please press the "Delete"
                button. If not, click the "X".
              </div>
              <Link to={"/profile"}>
                <button onClick={deleteIssue} className="deleteBtnModal">
                  Delete
                </button>
              </Link>
            </div>
            {dbUser.nickname === issue.nickname && (
              <button
                data-modal-target="#deleteModal"
                className="deleteBtn"
                onClick={handleDelete}
              >
                Delete
              </button>
            )}
          </div>

          <div className="descDiv">
            <p className="singleNickname">{issue.nickname}</p>
            <div className="dateTime">
              <p className="singleTime">{issue.time_created}</p>
              <p className="singleDate">{issue.date_created}</p>
            </div>
            {issue.solved === 1 && (
              <div className="solvedDiv">
                <p>Solved!</p>
              </div>
            )}
          </div>
        </section>

        <section className="commentSection">
          <h2 className="commentsHead">Comments ({`${comments.length}`})</h2>
          <form className="commentForm" onSubmit={handleSubmit} type="submit">
            <textarea
              className="commentInput"
              onChange={handleCommentChange}
              placeholder="Add a informative and helpful comment..."
            />
            <input
              className="commentSubmit"
              placeholder="Submit"
              type="submit"
            />
          </form>
          <div id="commentList" className="commentList">
            {comments.map(comment => (
              <div
                className={`commItem ${comment.solved ? " solved" : ""}`}
                id={`${comment.comm_uid}`}
                key={comment.comm_uid}
              >
                <p className="commText">
                  {comment.comm_text} - <strong>{comment.comm_nickname}</strong>
                </p>

                <div className="dateTimeNameDiv">
                  <button
                    className="replyBtn"
                    id={`${comment.comm_uid}`}
                    onClick={replyFormOpen}
                  >
                    Reply
                  </button>
                  {dbUser.uid.toString() == comment.user_uid &&
                    issue.solved === 0 && (
                      <button
                        className="deleteCommBtn"
                        id={`${comment.comm_uid}`}
                        onClick={handleDeleteComment}
                      >
                        Delete
                      </button>
                    )}
                  {dbUser.uid.toString() == issue.user_uid &&
                    issue.solved === 0 && (
                      <button className="solvedBtn" onClick={handleSolved}>
                        Solved?
                      </button>
                    )}

                  <p className="commTime">{comment.time_created}</p>
                  <p className="commDate">{comment.date_created}</p>
                </div>

                <div key={comment.comm_uid} className={`replyForm ${comment.comm_uid}`} id="replyForm">
                  <form className="repForm">
                    <textarea className="repTextInput" placeholder="Reply here" />
                    <input className="repSubmit" type="submit" placeholder="Submit" />
                  </form>
                  <button className="repClose" onClick={replyFormClose}>X</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleIssue1;
