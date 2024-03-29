import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, togglePassword] = useState("");
    const {login} = useContext(AuthContext);
    const source = axios.CancelToken.source();

//mocht onze pagina ge-unmount worden voor we klaar zijn met data ophalen, aborten we het request
    useEffect
    (() => {
        return function cleanup() {
            source.cancel();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    async function handleSubmit(e) {
        e.preventDefault();


        try {
            const result = await axios.post('http://localhost:8080/authenticate', {
                "username": username,
                "password": password,
            }, {
                cancelToken: source.token,
            });
                   // geef de jwt token aan de login-functie van de context mee


            login(result.data.jwt);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p></p>

            <form className="inloggen"
                  onSubmit={handleSubmit}>
                <p>Inloggen</p>
                <input
                    type="text"
                    name="username"
                    //value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="username"
                />
                <input
                    type="password"
                    name="password"
                    //value={password}
                    onChange={(e) => togglePassword(e.target.value)}
                    placeholder="password"
                />
                <button
                    type="submit"
                >
                    Inloggen
                </button>
            </form>

            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;