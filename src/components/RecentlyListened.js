import React, { useEffect, useState } from 'react'
import "../css/row.css"

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
// import { IconButton } from "@material-ui/core"

import Song from "./Song"
import { songList } from "../utils/player-utils"

function RecentlyListened() {
    const [recentPlayedSongs, setRecentPlayedSongs] = useState([])
    useEffect(() => {
        setRecentPlayedSongs([...songList, ...songList, ...songList])
    }, [])

    return (
        <div className="row">
            <h2>Listen Again </h2>
            <p>Your evening music </p>

            <div className="row__songsContainer">
                <div className="row__leftButtonDiv">
                    <ChevronLeftIcon fontSize="large" className="row__icon" />
                </div>

                <div className="row__songs">
                    {recentPlayedSongs.map((song, index) =>
                        <Song key={index} data={song} />
                    )}
                </div>


                <div className="row__rightButtonDiv">
                    <ChevronRightIcon fontSize="large" className="row__icon" />
                </div>
            </div>
        </div>
    )
}

export default RecentlyListened
