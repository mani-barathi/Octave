import React from 'react'
import "../css/Library.css"
import { useHistory } from "react-router-dom"

function Library() {
    const history = useHistory()

    const goToFavourities = () => {
        history.push(`playlist/favourites`)
    }

    return (
        <div className="library">
            <h1 className="library__titleText">My Library</h1>

            <div className="library__wrapper">

                <div className="library__playlist" onClick={goToFavourities}>
                    <img src="https://res.cloudinary.com/jerrick/image/upload/fl_progressive,q_auto,w_1024/rzhrgfghoxxdol4ywbod.jpg" alt="" className="library__playlistFavouritesImg" />
                    <p className="library__playlistName">favourites</p>

                </div>

            </div>
        </div>
    )
}

export default Library
