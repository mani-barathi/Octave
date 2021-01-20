import React, { useRef, useEffect, useState } from 'react'
import "../css/SongList.css"
import PlayListSong from "./PlayListSong"

import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { getSongSessionStorage, removeSongSessionStorage } from "../utils/song-utils"
import { useStateValue } from "../context/StateProvider"

function SongList() {
    const songListContainerRef = useRef()
    const [{ playingSong }, dispatch] = useStateValue()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        setSongs(getSongSessionStorage)
    }, [playingSong])

    const removeSong = (data) => {
        removeSongSessionStorage(data)
        setSongs(getSongSessionStorage)
    }

    const closeSongList = (event) => {
        if (event.target === songListContainerRef.current)
            dispatch({ type: "TOGGLE_IS_SONGLIST_OPEN" })
    }

    return (
        <div className="songlist__overlay" ref={songListContainerRef} onClick={closeSongList}>
            <div className="songlist">

                <div className="songlist__header">
                    <h3>SongList</h3>
                    <IconButton className="songlist__headerCloseBtn" onClick={() => dispatch({ type: "TOGGLE_IS_SONGLIST_OPEN" })}>
                        <CloseIcon />
                    </IconButton>
                </div>

                {(playingSong) &&
                    <>
                        <h4>Playing Now</h4>
                        <div className="songlist__songs">
                            <PlayListSong key={playingSong.name} data={playingSong} isPlayingSong />
                        </div >
                    </>
                }

                <h4>List</h4>
                <div className="songlist__songs">
                    {
                        songs.map(song => <PlayListSong
                            key={song.name}
                            data={song}
                            removeSong={removeSong}
                        />)
                    }
                </div>

            </div>
        </div>
    )
}

export default SongList
