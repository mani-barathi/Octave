import React from 'react'
import "../css/Library.css"
import RecentlyListened from "./RecentlyListened"
import Favourites from "./Favourites"

function Library() {
    return (
        <div className="library">
            <div className="library__header">
                <h1 className="library__titleText">My Library</h1>
            </div>

            <div className="library__recentlyListened">
                <RecentlyListened />
            </div>


            <div className="library__recentlyListened">
                <Favourites />
            </div>

        </div>
    )
}

export default Library
