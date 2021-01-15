import React from 'react'
import "../css/Navbar.css"

function Navbar() {
    return (
        <div className="navbar">
            <img className="navbar__logo" src="https://raw.githubusercontent.com/mani-barathi/mani-barathi.github.io/master/assets/favicon.ico" alt="" />
            <div className="navbar__center">
                <a href="/" className="navbar__link navbar__link--active">Home</a>
                <a href="/" className="navbar__link">Playlist</a>
                <a href="/" className="navbar__link">Explore</a>
            </div>
            <img src="https://avatars2.githubusercontent.com/u/49336839?s=460&u=fbbc21b3ee2066b82cf7ddf1205524757ac5f3f4&v=4" alt="" className="navbar__avatar" />
        </div>
    )
}

export default Navbar
