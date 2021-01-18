import React, { useState } from 'react'
import "../css/Song.css"

import { IconButton, Menu, MenuItem } from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'

import { useStateValue } from "../context/StateProvider"

function Song({ data }) {
    const [, dispatch] = useStateValue()
    const [anchorEl, setAnchorEl] = useState(null);

    const playSong = () => {
        dispatch({
            type: 'SET_NEW_SONG',
            newSong: data
        })
    }

    const playNext = () => {
        dispatch({
            type: 'SET_NEXT_SONG',
            nextSong: data
        })
        setAnchorEl(false)
    }

    const addToQueue = () => {

        setAnchorEl(false)
    }

    const addToFavourites = () => {

        setAnchorEl(false)
    }

    const openOptions = (event) => {
        setAnchorEl(event.currentTarget)
    }

    return (
        <div className="song" >
            <img src={data?.imageUrl} alt="" className="song__image" />
            <p className="song__name">{data?.name}</p>
            <p className="song__artist" >{data?.artist}</p>

            <div className="song__playButton">
                <IconButton className="song__playIcon" onClick={playSong}>
                    <PlayCircleFilledWhiteIcon style={{ fill: "#F22C89" }} />
                </IconButton>
            </div>

            <div className="song__option" >
                <IconButton className="song__optionIcon" aria-controls="simple-menu" aria-haspopup="true"
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
                    <MenuItem className="song__optionItem" onClick={playNext}>Play Next</MenuItem>
                    <MenuItem className="song__optionItem" onClick={addToQueue}>Add to Queue</MenuItem>
                    <MenuItem className="song__optionItem" onClick={addToFavourites}>Add To Favourites</MenuItem>
                </Menu>
            </div>

        </div >
    )
}

export default Song
