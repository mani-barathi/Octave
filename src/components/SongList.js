import React, { useRef } from 'react'
import "../css/SongList.css"
import PlayListSong from "./PlayListSong"

import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function SongList({ songs, setIsSongListOpen }) {
    const songListContainerRef = useRef()

    const closeSongList = (event) => {
        console.log('This is closeSongList()')
        if (event.target === songListContainerRef.current)
            setIsSongListOpen(false)
    }

    return (
        <div className="songlist__overlay" ref={songListContainerRef} onClick={closeSongList}>
            <div className="songlist">

                <div className="songlist__header">
                    <h3>Currnet SongList</h3>
                    <IconButton className="songlist__headerCloseBtn" onClick={() => setIsSongListOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </div>

                <div className="songlist__songs">
                    {
                        songs.map(song => <PlayListSong key={song.name} data={song} />)
                    }
                </div>

            </div>
        </div>
    )
}

export default SongList
