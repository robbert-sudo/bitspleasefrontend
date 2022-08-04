import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import GameSummary from "../../components/GameSummary";

import {useParams} from "react-router-dom";

function MyGames() {

    const {uploader} = useParams();
    const [gamesData, setGamesData] = useState([]);


    useEffect(() => {

        const source = axios.CancelToken.source();

        async function fetchMyGameData() {
            const token = localStorage.getItem('token');
            try {
                const result = await axios.get(`http://localhost:8080/games/uploader/${uploader}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    cancelToken: source.token,
                });

                setGamesData(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchMyGameData();
    }, [])

    const mapGameData = gamesData && gamesData.map((gameProp, pos) =>
        <GameSummary game={gameProp} key={pos}/>)

    return (
        <>
            {mapGameData}
        </>
    );

}

export default MyGames;