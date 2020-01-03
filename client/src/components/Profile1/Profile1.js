import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/auth0-context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Profile1.scss";

const Profile1 = () => {
    const { isLoading, user } = useAuth0();
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [dbUser, setUser] = useState("");

    useEffect(() => {
        console.log("hello")
        getDbUser();
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const getDbUser = () => {
        if (user) {
            axios
                .get(`http://localhost:5002/api/finduser/${user.email}`, { timeout: 200 })
                .then(response => setUser(response.data))
                .catch(err => console.log(err))
        } else {
            console.log("no user yet")
        }
    }

    const handleSubmit = (e) => {
        console.log(`Submitting name: ${first} ${last}`);
        addName();
    }

    const addName = () => {
        axios
            .get(`http://localhost:5002/api/addname/${first}/${last}/${user.email}`, { timeout: 200 })
            .then(response => console.log(response))
            .catch(err => console.log(err));
        console.log(`Name changed to: ${first} ${last}`)
    }

    return (
        <div className="profile1Mother">
            <div className="profile1Main">
                <h1>{dbUser.given_name != "null" ? dbUser.given_name : dbUser.nickname}'s Profile</h1>
                {dbUser.given_name === "null" && dbUser.family_name === "null" && (
                    <form onSubmit={handleSubmit} value="Submit">
                        <input placeholder="first name" type="text" value={first} name="firstname" onChange={e => setFirst(e.target.value)} />
                        <input placeholder="last name" type="text" value={last} name="lastname" onChange={e => setLast(e.target.value)} />
                        <input placeholder="submit" type="submit" />
                    </form>
                )}
            </div>
        </div>

    )
}

export default Profile1;