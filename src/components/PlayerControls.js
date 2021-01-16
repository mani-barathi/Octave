import React from 'react'

import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import { IconButton } from '@material-ui/core';

function PlayerControls({ playPauseSong, playing, playNextSong }) {
    return (
        <div className="playercontrols">
            <IconButton className="player__iconButton">
                <SkipPreviousRoundedIcon />
            </IconButton>

            <IconButton onClick={playPauseSong} className="player__iconButton player__mainBtn">
                {playing ?
                    <PauseCircleOutlineRoundedIcon /> :
                    <PlayCircleFilledWhiteOutlinedIcon />
                }
            </IconButton>

            <IconButton onClick={playNextSong} className="player__iconButton">
                <SkipNextRoundedIcon />
            </IconButton>
        </div>
    )
}

export default PlayerControls
