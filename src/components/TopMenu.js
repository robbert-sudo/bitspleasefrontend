import React, {useContext} from 'react';
import logo from '../assets/logo_bits_please.svg'
import {useHistory, Link} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import './TopMenu.css'
import SystemButton from "./SystemButton";

function TopMenu() {
    const history = useHistory();
    const {isAuth, logout, admin} = useContext(AuthContext);



    return (

        <nav>
            <Link to="/">
                <span className="logo-container">
                    <img src={logo} alt="logo"/>
                </span>
            </Link>
            <div className="systemchoises">

                <SystemButton text="GAMEBOY/ADVANCE"/>
                <SystemButton text="NES"/>
                <SystemButton text="SNES"/>
                <SystemButton text="GAMECUBE"/>
                <SystemButton text="MEGA DRIVE"/>
                <SystemButton text="DREAMCAST"/>
                <SystemButton text="PSONE"/>

            </div>


            {admin ?
                <>
                    <button className="button"
                            type="button"
                            onClick={() => history.push("/adminpage")}
                    >
                        admin page
                    </button>
                </>
                : <>

                </>}
            {isAuth ?
                <div>
                    <button className="button"
                            type="button"
                            onClick={logout}>
                        Log uit
                    </button>

                    <button className="button"
                            type="button"
                            onClick={() => history.push("/gameslandingpage")}
                    >
                        Ga naar games
                    </button>
                    <button className="button"
                            type="button"
                            onClick={() => history.push("/profile")}
                    >
                        mijn profiel
                    </button>
                </div>
                :
                <div>
                    <button
                        type="button"
                        onClick={() => history.push("/signin")}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => history.push('/signup')}
                    >
                        Registreren
                    </button>
                </div>}
        </nav>
    );
}

export default TopMenu;