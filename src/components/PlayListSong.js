import React, { useState } from 'react'
import "../css/PlayListSong.css"

import { IconButton, Menu, MenuItem } from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import useSongFunctions from '../hooks/useSongFunctions';

function Song({ data }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [playSong, playNext, addToQueue] = useSongFunctions(data, setAnchorEl)

    const removeSong = () => {
        console.log("This is removeSong()")
        setAnchorEl(false)
    }

    const openOptions = (event) => {
        setAnchorEl(event.currentTarget)
    }

    return (
        <div className="playlistsong">
            <img src={data?.imageUrl} alt="" className="playlistsong__img" />
            <div className="playlistsong__info">
                <p className="playlistsong__infoName">{data?.name}</p>
                <p className="playlistsong__infoArtist">{data?.artist}</p>
            </div>

            <div className="">
                <IconButton className="playlistsong__optionsIcon" onClick={playSong}>
                    <PlayArrowIcon />
                </IconButton>
            </div>

            <div className="playlistsong__options" >
                <IconButton className="playlistsong__optionsIcon" aria-controls="simple-menu" aria-haspopup="true"
                    onClick={openOptions} >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(false)}
                >
                    <MenuItem className="playlistsong__optionsItem" onClick={playNext}>Play Next</MenuItem>
                    <MenuItem className="playlistsong__optionsItem" onClick={addToQueue}>Add to Queue</MenuItem>
                    <MenuItem className="playlistsong__optionsItem" onClick={removeSong}>Remove</MenuItem>
                </Menu>
            </div>

        </div >
    )
}

export default Song
