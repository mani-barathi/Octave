import React, { useRef, useState, useCallback } from 'react'
import "../css/Player.css"

import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import { IconButton, Slider } from '@material-ui/core';

import { calculateDurationTime, calculateCurrentTime } from "../utils/player-utils"

function Player() {
    const [playing, setPlaying] = useState(false)
    const [continuousTime, setContinuousTime] = useState(0)
    const [displayCurrentTime, setDisplayCurrentTime] = useState('0:00')
    const [displayDurationTime, setDisplayDurationTime] = useState('0:00')
    const audioRef = useRef(null)

    const playPauseSong = () => {
        if (playing) {
            audioRef.current.pause()
            setPlaying(false)
        } else {
            audioRef.current.play()
            setPlaying(true)
        }
    }

    // When the audio element is rendered on the screen, this function gets executed
    const audioElementCallbackRef = useCallback((node) => {
        if (!node) return
        audioRef.current = node

        audioRef.current.ontimeupdate = (event) => {
            const { duration, currentTime } = event.srcElement;
            let progressPercent = (currentTime / duration) * 100;
            // calculate Total Duration of a Song
            const durationTime = calculateDurationTime(duration)
            // calculate current time of a song
            const currentRunningTime = calculateCurrentTime(currentTime)

            setContinuousTime(progressPercent)
            setDisplayCurrentTime(currentRunningTime)
            setDisplayDurationTime(durationTime)
        }
    }, [audioRef])

    const songProgressChanged = (event, value) => {
        const newProgressSeconds = (value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newProgressSeconds
        setContinuousTime(newProgressSeconds)
    }

    return (
        <div className="player">

            <div className="player__progress">
                <Slider color="secondary"
                    value={continuousTime}
                    onChangeCommitted={songProgressChanged}
                />
            </div>

            <div className="player__main">
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

                    <IconButton onClick={playPauseSong} className="player__iconButton player__mainBtn">
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
                    <span className="duration__current">{displayCurrentTime}</span>
                    <span>/</span>
                    <span className="duration__total">{displayDurationTime}</span>
                </div>
            </div>

            <audio ref={audioElementCallbackRef} src='https://data.mymp3app.com/320/the-chainsmokers-paris-lyric.mp3'></audio>

        </div>
    )
}

export default Player
