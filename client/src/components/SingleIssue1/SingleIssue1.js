import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth0 } from "../../contexts/auth0-context";
import "./SingleIssue1.scss";
import axios from "axios";

const SingleIssue1 = () => {

    const [issue, setIssue] = useState({});
    const { statusUrl } = useAuth0();
   

    useEffect(() => {
        let issueUid = window.location.pathname.replace("/issues/", "")
        axios
            .get(`${statusUrl}/api/getissue/${issueUid}`)
            .then(response => setIssue(response.data))
            .catch(err => console.log(err))

    }, [])

    const handleDelete = (e) => {
        const button = e.target;
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    }

    const openModal = (modal) => { 
        const overlay = document.getElementById("overlay");
        if(modal == null) return;
        modal.classList.add("active");
        overlay.classList.add("active");
    }

    const closeModal = (e, modal) => {
       const overlay = document.getElementById("overlay"); 
       
       if(e.target.id === "modalClose"){

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

    return (
        <div className="singleMother">
            <div className="singleMain">
                <section className="titleTextDiv">
                    <h1 className="singleTitle">{issue.issue_title}</h1>
                    <p className="singleText">{issue.issue_text}</p>
                </section>

                <hr></hr>

                <section className="descCont">
                    <div className="deleteDiv">
                        <button data-modal-target="#deleteModal" className="deleteBtn" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                    <div className="descDiv">
                        <p className="singleNickname">{issue.nickname}</p>
                        <div className="dateTime">
                            <p className="singleTime">{issue.time_created}</p>
                            <p className="singleDate">{issue.date_created}</p>
                        </div>
                    </div>
                </section>


            </div>
            <div id="deleteModal" className="deleteModal">
                <div className="modalHead">
                    <h4 className="modalTitle">Notice!</h4>
                    <button onClick={closeModal} id="modalClose" className="modalClose">&times;</button>
                </div>
                <div className="modalPara">If you would like to delete this post, please press the "Delete" button. If not, click the "X".</div>
                <Link to={"/profile"}>
                    <button onClick={deleteIssue} className="deleteBtn">Delete</button>
                    </Link>
            </div>

            <div onClick={overlayClose} className="" id="overlay"></div>
        </div>
    )
}

export default SingleIssue1;