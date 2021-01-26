import React, { useState } from 'react'
import "../css/PlayListSong.css"
import SnackBar from "./SnackBar"

import { IconButton, Menu, MenuItem } from "@material-ui/core"
import MoreVertIcon from '@material-ui/icons/MoreVert'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import DeleteIcon from '@material-ui/icons/Delete'

import useSongFunctions from '../hooks/useSongFunctions'

function PlayListSong({ id, data,
    isFavourites,        // is it created from Favourites Component ?
    isArtistPage,        // is it created from ArtistPage Component ?
    isPlayingSong,       // is it currentPlaying Song ?
    removeFromSongList,
    isSearchSong }) {    // is it created from Search Component ?

    const [anchorEl, setAnchorEl] = useState(null)
    const [snackBar, setSnackBar] = useState(null)
    const { playSong, playNext, addToQueue,
        removeFromFavourites, addToFavourites } = useSongFunctions(data, setAnchorEl, setSnackBar)

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
        <div className={isPlayingSong ? 'playlistsong playing-song' : 'playlistsong'}>
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
                    {/* If this song is from Favourites or ArtistPage then show the options (playnext,add to queue,add to Favaourites) */}
                    {/* else this song is from SongList then show the remove Icon alone */}
                    {isFavourites || isArtistPage ? (
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
                                {/* If this is not from search and ArtistPage then show the removebutton */}
                                {!isSearchSong && !isArtistPage &&
                                    <MenuItem className="playlistsong__optionsItem" onClick={removeSongFunc}>Remove</MenuItem>
                                }
                                {(isSearchSong || isArtistPage) &&
                                    <MenuItem className="playlistsong__optionsItem" onClick={addToFavourites}>add To Favourites</MenuItem>
                                }
                            </Menu>
                        </>
                    ) : (
                            <IconButton className="playlistsong__optionsIcon" onClick={removeSongFunc} >
                                <DeleteIcon />
                            </IconButton>
                        )}
                </div>
            }

            {/* If this song is from Favourites or ArtistPage then show SnackBar Notifications */}
            { (isFavourites || isArtistPage) && snackBar &&
                <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />}     {/* To Show Pop Up messages */}

        </div >
    )
}

export default PlayListSong
