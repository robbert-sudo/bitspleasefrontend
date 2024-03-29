import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import "./UploadGame.css";
import GamePageButtonsContainer from "./gamepagecomponents/GamePageButtonsContainer";

function UploadGame() {
    //state voor het formulier
    const [toBigWarning, toggleToBigWarning] = useState(false);
    const [gameName, setGameName] = useState(null);
    const [system, toggleSystem] = useState("");
    const [developer, setDeveloper] = useState("");
    const [price, setPrice] = useState(null);
    const [postImage, setPostImage] = useState({
        image: "",
    });

    //state voor functionaliteit
    const history = useHistory()
    const {user} = useContext(AuthContext);
    const source = axios.CancelToken.source();

    useEffect(() => {
        const source = axios.CancelToken.source();
        return function cleanup() {
            source.cancel();
        }
    }, [])

    async function handleGameUpload(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        if (postImage.image.length <= 250000) {
                    toggleToBigWarning(false);
            if (gameName !== null) {
                if (price !== null) {
                    try {
                        const result =
                        await axios.post('http://localhost:8080/games', {
                            "name": gameName,
                            "system": system,
                            "developer": developer,
                            "uploader": user.user_id,
                            "uploader_name": user.username,
                            "price": price,
                            "image": postImage.image,
                        }, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            },
                            cancelToken: source.token,
                        });
                        history.push(`fullgamepage/${result.data.id}`);
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    console.log("naam is een verplicht veld!");
                }
            } else {
                console.log("prijs is een verplicht veld.");
            }
        } else {
            toggleToBigWarning(true);
        }
    }


        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    resolve(fileReader.result);
                };
                fileReader.onerror = (error) => {
                    reject(error);
                };
            });
        };


        const handleFileUpload = async (e) => {
            const file = e.target.files[0];
            const base64 = await convertToBase64(file);
            setPostImage({...postImage, "image": base64});
        };


        return (
            <>
                <GamePageButtonsContainer/>
                <h1>Upload game: </h1>
                <form className="gameuploaden"
                      onSubmit={handleGameUpload}>
                    <p>Invoervelden</p>

                    <div className="namefield">
                        <label htmlFor="gamename">Game name</label>
                        <input
                            id="gamename"
                            type="text"
                            name="gamename"
                            onChange={(e) => setGameName(e.target.value)}
                            placeholder="(verplicht)"
                        />
                    </div>

                    <div className="systemfield">
                        <label htmlFor="systemname">systeem</label>
                        <select name="system"
                                onChange={(e) => toggleSystem(e.target.value)}
                        >
                            <option>systeem</option>
                            <option value="gameboy">gameboy</option>
                            <option value="gameboy color">gameboy color</option>
                            <option value="gameboy advance">gameboy advance</option>
                            <option value="nes">nes</option>
                            <option value="snes">snes</option>
                            <option value="nintendo 64">nintendo 64</option>
                            <option value="gamecube">gamecube</option>
                            <option value="game gear">game gear</option>
                            <option value="master system">master system</option>
                            <option value="megadrive">megadrive</option>
                            <option value="dreamcast">dreamcast</option>
                            <option value="psx">psx</option>
                        </select>
                    </div>

                    <div className="developerfield">
                        <label htmlFor="developername">developer</label>
                        <input
                            id="developername"
                            type="text"
                            name="developer"
                            onChange={(e) => setDeveloper(e.target.value)}
                            placeholder="developer"
                        />
                    </div>

                    <div className="pricefield">
                        <label htmlFor="price">prijs</label>
                        <input
                            id="price"
                            type="number"
                            name="price"
                            step="0.01"
                            min="0"
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="(verplicht)"
                        />
                    </div>


                    <label htmlFor="Image">foto upload</label>
                    <input
                        id="Image"
                        type="file"
                        // maxLength={250000}
                        name="myImage"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e) => handleFileUpload(e)}
                    />


                    <button
                        type="submit"
                    >
                        Submit
                    </button>
                    {toBigWarning ? <h1>Foto is te groot zoek kleinere afbeelding</h1> : <> </>}

                </form>
            </>


        );
    }

    export default UploadGame;