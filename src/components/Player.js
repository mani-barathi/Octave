import React, { useRef, useState, useCallback } from 'react'
import "../css/Player.css"

import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded';
import SkipPreviousRoundedIcon from '@material-ui/icons/SkipPreviousRounded';
import SkipNextRoundedIcon from '@material-ui/icons/SkipNextRounded';
import { IconButton, Slider } from '@material-ui/core';


function Player() {
    const [playing, setPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [displayCurrentTime, setDisplayCurrentTime] = useState('0:00')
    const [displayDurationTime, setdisplayDurationTime] = useState('0:00')
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
        console.log(node)
        if (!node) return
        audioRef.current = node
        audioRef.current.ontimeupdate = (event) => {
            const { duration, currentTime } = event.srcElement;
            let progressPercent = (currentTime / duration) * 100;

            // calculate Total Duration of a Song
            const durationMinute = Math.floor(duration / 60);            // minutes
            let durationSeconds = Math.floor((duration % 60));           // Seconds
            if (durationSeconds < 10)
                durationSeconds = `0${durationSeconds}`;                 // to make 1 as 01

            // calculate current time of a song
            const currentMinute = Math.floor(currentTime / 60);          // minutes
            let currentSeconds = Math.floor((currentTime % 60));         // minutes
            if (currentSeconds < 10)
                currentSeconds = `0${currentSeconds}`;

            setCurrentTime(progressPercent)
            setDisplayCurrentTime(`${currentMinute}:${currentSeconds}`)
            setdisplayDurationTime(`${durationMinute}:${durationSeconds}`)
        }

    }, [])

    const songProgressChanged = (event, value) => {
        const newProgressSeconds = (value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newProgressSeconds
        setCurrentTime(newProgressSeconds)
    }

    return (
        <div className="player">

            <div className="player__progress">
                <Slider color="secondary"
                    value={currentTime}
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
