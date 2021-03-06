import React, {useState} from "react";
import axios from "axios";
import GameSummary from "../../components/GameSummary";

function GamesBySystem() {
    const [systemName, setSystemName] = useState(null);
    const [gamesData, setGamesData] = useState([]);

    const source = axios.CancelToken.source();

    async function fetchGameBySystem(e) {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const result = await axios.get(`http://localhost:8080/games/system/${systemName}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                cancelToken: source.token,
            });
            setGamesData(result.data);
            console.log(result.data);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <div className="bars">
        <form
            onSubmit={fetchGameBySystem}>
            <input className="searchbar"
                   type="text"
                   onChange={(e) => setSystemName(e.target.value)}
                   placeholder="zoek game op systeem"
            />
            <button className="searchbutton"
                    type="submit">
                nu zoeken
            </button>
        </form>
        </div>
            {gamesData && gamesData.map((item) => <GameSummary game={item} key={item.id}/>)}
        </>
    );
}

export default GamesBySystem;