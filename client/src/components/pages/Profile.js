import React from 'react';
import {useAuth0} from "../../AuthProvider";
import useAxios from "axios-hooks";





const Profile = () => {    
    // console.log(useAuth0());
    const {user} = useAuth0();
    console.log(user)

    const [{ data, loading, error, response}, refetch] = useAxios(
         `http://localhost:5002/api/${user.email}`
    )

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>
    // console.log(response.data[0])
    const profile = response.data[0];
    const name = profile.first_name + " " + profile.last_name
    const email = profile.email;
    const company = profile.company;
    const role = profile.role;

    
    

    return (
        <div>
            
            <h3>Email: {email}</h3>
            <h2>{name}</h2>
            <h3>Works at {company} as a {role}</h3>
        </div>

    )
}

export default Profile;