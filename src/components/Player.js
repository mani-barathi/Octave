import React, { useRef, useState, useCallback, useEffect } from 'react'
import "../css/Player.css"

import { Slider } from '@material-ui/core';

import { calculateDurationTime, calculateCurrentTime, getRandomSong } from "../utils/player-utils"
import { setRecentSongsLocalStorage } from "../utils/home-utils"
import PlayerControls from './PlayerControls';

function Player() {
    const [playing, setPlaying] = useState(false)
    const [continuousTime, setContinuousTime] = useState(0)
    const [displayCurrentTime, setDisplayCurrentTime] = useState('0:00')
    const [displayDurationTime, setDisplayDurationTime] = useState('0:00')
    const [currentSong, setCurrentSong] = useState(null)
    const audioRef = useRef(null)

    useEffect(() => {
        if (currentSong)
            setRecentSongsLocalStorage(currentSong)
    }, [currentSong])

    const playPauseSong = () => {
        if (!currentSong)
            playNextSong()

        if (playing) {
            audioRef.current.pause()
            setPlaying(false)
        } else {
            audioRef.current.play()
            setPlaying(true)
        }
    }

    const playSongByMediaSession = async () => {
        console.log('This is playSongByMediaSession()')
        await audioRef.current.play()
        navigator.mediaSession.playbackState = "playing"
        setPlaying(true)
    }

    const pauseSongByMediaSession = async () => {
        console.log('This is pauseSongByMediaSession()')
        await audioRef.current.pause()
        navigator.mediaSession.playbackState = "paused";
        setPlaying(false)
    }

    const playNextSong = useCallback(() => {
        console.log('This is playNextSong()')
        const newSong = getRandomSong()
        setCurrentSong(newSong)
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
            setPlaying(false)
            playNextSong()
            setPlaying(true)
        }
        // can also use oncanplay
        audioRef.current.onloadeddata = async () => {
            await audioRef.current.play()
            setPlaying(true)
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
