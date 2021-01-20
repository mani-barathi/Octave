import React, { useEffect, useState } from 'react'
import "../css/PlayList.css"
import PlayListSong from "./PlayListSong"

import { useParams } from "react-router-dom"

function PlayList() {
    const { name } = useParams()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        if (name === 'favourites') {
            let favourites = JSON.parse(localStorage.getItem('FAVOURITES'))
            favourites = favourites ? favourites : []
            setSongs(favourites)
        }
    }, [name])

    const removeSong = () => {
        console.log("this is the passed on removeSong()")
    }

    return (
        <div className="playlist">
            <h1 className="playlist__titleText"> {name} </h1>
            <div className="playlist__container">
                {
                    songs.map(song => <PlayListSong key={song.name} data={song}
                        isPlayListSong removeSong={removeSong}
                    />)
                }
            </div>
        </div>
    )
}

export default PlayList
