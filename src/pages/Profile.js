import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";

import axios from "axios";
import jwt_decode from "jwt-decode";


function Profile() {
    const [profileData, setProfileData] = useState({
        username: null,
        enabled: null,
        authorities: [],
        user_id: null,
    });


    useEffect(() => {
        const source = axios.CancelToken.source();

        //haal de pagina content op in de mounting-cycle
        async function fetchProfileData() {
            // haal de token uit de local storage om in het GET-request te bewijzen dat we geauthoriseert zijn
            const token = localStorage.getItem('token');


            try {
                const decoded = jwt_decode(token);
                const username = decoded.sub;
                console.log(username);
                const result = await axios.get(`http://localhost:8080/user/${username}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    cancelToken: source.token,
                });
                console.log(result);
                setProfileData({
                    username: result.data.username,
                    enabled: result.data.enabled,
                    authorities: result.data.authorities,
                    user_id: result.data.user_id,
                });


            } catch (e) {
                console.error(e);
            }

        }

        fetchProfileData();

        return function cleanup() {
            source.cancel();
        }
    }, [])



    const authorityList = profileData.authorities && profileData.authorities.map((item, pos)=>
    {
        return (
            <div key={pos}>
                <h1>{item.authority}</h1>
            </div>
        );
    })



    return (
        <>
            <div>
            <h1>Profielpagina</h1>
            <section>
                <h2>Gegevens</h2>
                <p><strong>Gebruikersnaam:</strong> {profileData.username} </p>
                <p><strong>User_id: </strong> {profileData.user_id} </p>
                <p><strong>Authorities: </strong> </p>
                {authorityList}
            </section>
            <p>Terug naar de <Link to="/">Homepagina</Link></p>
            </div>
        </>
    );
}

export default Profile;