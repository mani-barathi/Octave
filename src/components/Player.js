import React, { useRef, useState } from 'react'
import "../css/Player.css"

import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import { IconButton } from '@material-ui/core';

function Player() {
    const [playing, setPlaying] = useState(false)
    const audioRef = useRef()

    const playPauseSong = () => {
        if (playing) {
            audioRef.current.pause()
            setPlaying(false)
        } else {
            audioRef.current.play()
            setPlaying(true)
        }
    }

    return (
        <div className="player">

            <div className="player__progress">
                <div className="player__progressInner"></div>
            </div>

            <div className="player__song">
                <img src="https://i1.sndcdn.com/artworks-000241607187-d5elh4-t500x500.jpg" alt="" className="song__infoImage" />
                <div className="song__info">
                    <p className="song__infoTrack">Paris</p>
                    <p className="song__infoArtist">Chainsmokers</p>
                </div>
            </div>

            <div className="player__controls">
                <IconButton className="player__iconButton">
                    <SkipPreviousRoundedIcon />
                </IconButton>

                <IconButton onClick={playPauseSong} className="player__iconButton">
                    {playing ?
                        <PauseCircleOutlineRoundedIcon /> :
                        <PlayCircleFilledWhiteOutlinedIcon />
                    }
                </IconButton>

                <IconButton className="player__iconButton">
                    <SkipNextRoundedIcon />
                </IconButton>
            </div>

            <div className="player__duration">
                <span className="duration__current">0:00</span>
                <span>/</span>
                <span className="duration__total">3:00</span>
            </div>

            <audio ref={audioRef} src='https://data.mymp3app.com/320/the-chainsmokers-paris-lyric.mp3'></audio>

        </div>
    )
}

export default Player
