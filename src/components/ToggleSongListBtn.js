import React from 'react'

import { IconButton } from '@material-ui/core'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'

function ToggleSongListBtn({ setIsSongListOpen }) {

    return (
        <IconButton className="player__iconButton player__mainBtn"
            onClick={() => setIsSongListOpen(true)}>
            <ArrowDropUpIcon />
        </IconButton>
    )
}

export default ToggleSongListBtn
