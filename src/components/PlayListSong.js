import React, { useState } from 'react'
import "../css/PlayListSong.css"
import SnackBar from "./SnackBar"

import { IconButton, Menu, MenuItem } from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import DeleteIcon from '@material-ui/icons/Delete'

import useSongFunctions from '../hooks/useSongFunctions'

function PlayListSong({ id, data, isFavourites, isPlayingSong, removeFromSongList }) {
    const [anchorEl, setAnchorEl] = useState(null)
    const [snackBar, setSnackBar] = useState(null)
    const { playSong, playNext, addToQueue, removeFromFavourites } = useSongFunctions(data, setAnchorEl, setSnackBar)

    const removeSongFunc = () => {
        if (isFavourites)
            removeFromFavourites(id)
        else
            removeFromSongList(data)
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

            {/* If this is the current playing Song then don't show the play Icon */}
            {!isPlayingSong &&
                <div >
                    <IconButton className="playlistsong__optionsIcon" onClick={playSong}>
                        <PlayArrowIcon />
                    </IconButton>
                </div>
            }

            {/* If this is the not the current playing Song then show the options */}
            {!isPlayingSong &&
                <div className="playlistsong__options" >
                    {/* If this song is from PlayList then show the options (playnext,add to queue,add to Favaourites) */}
                    {/* else this song is from SongList then show the remove Icon alone */}
                    {isFavourites ? (
                        <>
                            <IconButton className="playlistsong__optionsIcon" aria-controls="simple-menu" aria-haspopup="true"
                                onClick={openOptions} >
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={() => setAnchorEl(false)}>
                                <MenuItem className="playlistsong__optionsItem" onClick={playNext}>Play Next</MenuItem>
                                <MenuItem className="playlistsong__optionsItem" onClick={addToQueue}>Add to Queue</MenuItem>
                                <MenuItem className="playlistsong__optionsItem" onClick={removeSongFunc}>Remove</MenuItem>
                            </Menu>
                        </>
                    ) : (
                            <IconButton className="playlistsong__optionsIcon" onClick={removeSongFunc} >
                                <DeleteIcon />
                            </IconButton>
                        )}
                </div>
            }

            { isFavourites && snackBar &&
                <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />}     {/* To Show Pop Up messages */}

        </div >
    )
}

export default PlayListSong
