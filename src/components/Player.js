import React, { useRef, useState, useCallback, useEffect } from 'react'
import "../css/Player.css"
import PlayerControls from './PlayerControls';

import { Slider } from '@material-ui/core';

import { calculateDurationTime, calculateCurrentTime, getRandomSong } from "../utils/player-utils"
import { setRecentSongsLocalStorage } from "../utils/home-utils"
import { useStateValue } from "../context/StateProvider"

function Player() {
    const [playing, setPlaying] = useState(0)
    const [continuousTime, setContinuousTime] = useState(0)
    const [displayCurrentTime, setDisplayCurrentTime] = useState('0:00')
    const [displayDurationTime, setDisplayDurationTime] = useState('0:00')
    const [currentSong, setCurrentSong] = useState(null)
    const audioRef = useRef(null)
    const [{ newSong }] = useStateValue()

    useEffect(() => {
        if (currentSong)
            setRecentSongsLocalStorage(currentSong)
    }, [currentSong])

    useEffect(() => {
        if (newSong) {
            console.log(newSong)
            setCurrentSong(newSong)
        }
    }, [newSong])

    // playing  0 -> paused  | 1 -> playing  | -1 -> loading
    const playPauseSong = () => {
        if (!currentSong) {
            playNextSong()
            return
        }

        if (playing === 1) {
            audioRef.current.pause()
            setPlaying(0)
        } else {
            audioRef.current.play()
            setPlaying(1)
        }
    }

    const playSongByMediaSession = async () => {
        console.log('This is playSongByMediaSession()')
        await audioRef.current.play()
        navigator.mediaSession.playbackState = "playing"
        setPlaying(1)
    }

    const pauseSongByMediaSession = async () => {
        console.log('This is pauseSongByMediaSession()')
        await audioRef.current.pause()
        navigator.mediaSession.playbackState = "paused";
        setPlaying(0)
    }

    const playNextSong = useCallback(() => {
        console.log('This is playNextSong()')
        const newSong = getRandomSong()
        setCurrentSong(newSong)
        setPlaying(-1)
    }, [])

    // MediaSession docs -> https://developer.mozilla.org/en-US/docs/Web/API/MediaSession
    const setupMediaSession = useCallback(() => {
        if ("mediaSession" in navigator) {
            console.log("Navigator is setup")

            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: currentSong.name,
                artist: currentSong.artist,
                artwork: [
                    {
                        src: currentSong.imageUrl,
                        type: "image/png"
                    }
                ]
            })
            navigator.mediaSession.setActionHandler("play", () => {
                playSongByMediaSession()
            })
            navigator.mediaSession.setActionHandler("pause", () => {
                pauseSongByMediaSession()
            })
            navigator.mediaSession.setActionHandler("previoustrack", () => {
                // playPrevious()
            })
            navigator.mediaSession.setActionHandler("nexttrack", () => {
                playNextSong()
            })
        }
    }, [currentSong, playNextSong])

    // When the audio element is rendered on the screen, this function gets executed
    const audioElementCallbackRef = useCallback((node) => {
        if (!node) return
        audioRef.current = node
        audioRef.current.ontimeupdate = (event) => {
            const { duration, currentTime } = event.srcElement;
            let progressPercent = (currentTime / duration) * 100;
            // calculate current time of a song
            const currentRunningTime = calculateCurrentTime(currentTime)

            setContinuousTime(progressPercent)
            setDisplayCurrentTime(currentRunningTime)
        }

        audioRef.current.onended = () => {
            setPlaying(0)
            playNextSong()
            // setPlaying(1)
        }
        // can also use oncanplay
        audioRef.current.onloadeddata = async () => {
            await audioRef.current.play()
            setPlaying(1)
            setupMediaSession()
            const durationTime = calculateDurationTime(audioRef.current.duration)
            setDisplayDurationTime(durationTime)
        }

    }, [audioRef, playNextSong, setupMediaSession])

    const songProgressChanged = useCallback((event, value) => {
        if (!currentSong) return
        const newProgressSeconds = (value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newProgressSeconds
        setContinuousTime(newProgressSeconds)
    }, [audioRef, currentSong])

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
                    {currentSong?.imageUrl && <img src={currentSong.imageUrl} alt="" className="song__infoImage" />}
                    <div className="song__info">
                        <p className="song__infoTrack">{currentSong?.name}</p>
                        <p className="song__infoArtist">{currentSong?.artist}</p>
                    </div>
                </div>

                <PlayerControls
                    playPauseSong={playPauseSong}
                    playing={playing}
                    playNextSong={playNextSong}
                />

                <div className="player__duration">
                    <span className="duration__current">{displayCurrentTime}</span>
                    <span>/</span>
                    <span className="duration__total">{displayDurationTime}</span>
                </div>
            </div>

            <audio ref={audioElementCallbackRef} src={currentSong?.url}></audio>

        </div>
    )
}

export default Player
