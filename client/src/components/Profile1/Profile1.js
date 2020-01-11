import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Profile1.scss";

const Profile1 = () => {
    const { isLoading, user, dbUser } = useAuth0();
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [issueArr, setIssueArr] = useState([]);

    const getIssue = (() => {
        axios
            .get(`http://localhost:5002/api/issues/${dbUser.uid}`)
            .then(response => setIssueArr([...response.data]))
            .catch(err => console.log(err))
    })

    useEffect(() => {
        getIssue();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleSubmitName = (e) => {
        console.log(`Submitting name: ${first} ${last}`);
        addName();
    }

    const handleSubmitCompRole = (e) => {
        console.log(`Submitting company and role: ${role} at ${company}`)
        addCompRole();
    }

    const addName = () => {
        axios
            .get(`http://localhost:5002/api/addname/${first}/${last}/${user.email}`, { timeout: 200 })
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }

    const addCompRole = () => {
        axios
            .get(`http://localhost:5002/api/addcomprole/${company}/${role}/${user.email}`, { timeout: 200 })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className="profile1Mother">
            <div className="profile1Main">

                <div className="issuesWrapper">
                    {issueArr.map(issue =>
                        <div key={issue.uid} className="issuePost">
                            <h3>{issue.nickname}</h3>
                            <h2>{issue.issue_title}</h2>
                            <p>{issue.issue_text}</p>
                            <p>{`${issue.date_created} | ${issue.time_created}`}</p>
                            <Link to={`/issues/${issue.uid}`}>
                                <button>View</button>
                            </Link>
                        </div>
                    )}
                </div>

                <section className="bioSection">
                    <h1>{dbUser.given_name !== "null" ? dbUser.given_name : dbUser.nickname}'s Profile</h1>
                    {dbUser.company !== "null" && dbUser.role !== "null" && (
                        <h1>{dbUser.role} at {dbUser.company}</h1>
                    )}

                    {dbUser.given_name === "null" && dbUser.family_name === "null" && (
                        <form onSubmit={handleSubmitName} value="Submit">
                            <input className="profileInput" placeholder="first name" type="text" value={first} name="firstname" onChange={e => setFirst(e.target.value)} />
                            <input className="profileInput" placeholder="last name" type="text" value={last} name="lastname" onChange={e => setLast(e.target.value)} />
                            <input className="profileSubmit" placeholder="submit" type="submit" />
                        </form>
                    )} {dbUser.company === "null" && dbUser.role === "null" && (
                        <form onSubmit={handleSubmitCompRole} value="submit">
                            <input className="profileInput" type="text" placeholder="Company" value={company} name="company" onChange={e => setCompany(e.target.value)} />
                            <input className="profileInput" type="text" placeholder="Role" value={role} name="role" onChange={e => setRole(e.target.value)} />
                            <input className="profileSubmit" type="submit" placeholder="submit" />
                        </form>
                    )}
                </section>

            </div>
        </div>

    )
}

export default Profile1;