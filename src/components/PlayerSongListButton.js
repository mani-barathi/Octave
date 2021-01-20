import React from 'react'

import { IconButton, Tooltip } from '@material-ui/core'
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

import { useStateValue } from "../context/StateProvider"

function ToggleSongListBtn() {
    const [, dispatch] = useStateValue()

    return (
        <Tooltip title="Show SongList" arrow placement="left">
            <IconButton className="player__iconButton player__mainBtn"
                onClick={() => dispatch({ type: 'TOGGLE_IS_SONGLIST_OPEN' })}>
                <QueueMusicIcon />
            </IconButton>
        </Tooltip>
    )
}

export default ToggleSongListBtn
