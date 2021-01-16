import React, { useRef, useState, useCallback } from 'react'
import "../css/Player.css"

import { Slider } from '@material-ui/core';

import { calculateDurationTime, calculateCurrentTime, getRandomSong } from "../utils/player-utils"
import PlayerControls from './PlayerControls';

function Player() {
    const [playing, setPlaying] = useState(false)
    const [continuousTime, setContinuousTime] = useState(0)
    const [displayCurrentTime, setDisplayCurrentTime] = useState('0:00')
    const [displayDurationTime, setDisplayDurationTime] = useState('0:00')
    const [currentSong, setCurrentSong] = useState(null)
    const audioRef = useRef(null)

    const setupMediaSessions = () => {
        if ("mediaSession" in navigator) {
            console.log("navigator setupped");

            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: currentSong?.name,
                artist: currentSong?.artist,
                artwork: [
                    {
                        src: currentSong?.imageUrl,
                        sizes: "100x100",
                        type: "image/png"
                    }
                ]
            });
            navigator.mediaSession.setActionHandler("play", () => {
                playSong()
            });
            navigator.mediaSession.setActionHandler("pause", () => {
                pauseSong()
            });
            navigator.mediaSession.setActionHandler("previoustrack", () => {
                // playPrevious();
            });
            navigator.mediaSession.setActionHandler("nexttrack", () => {
                playNextSong();
            });
        }
    };

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

    const playSong = async () => {
        console.log('This is playSong()')
        await audioRef.current.play()
        navigator.mediaSession.playbackState = "playing"
        setPlaying(true)
    }

    const pauseSong = async () => {
        console.log('This is pauseSong()')
        await audioRef.current.pause()
        navigator.mediaSession.playbackState = "paused";
        setPlaying(false)
    }

    const playNextSong = useCallback(() => {
        console.log('next song function')
        const newSong = getRandomSong()
        setCurrentSong(newSong)
    }, [])

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

        audioRef.current.onloadeddata = () => {
            audioRef.current.play()
            setPlaying(true)
            setupMediaSessions()
            const durationTime = calculateDurationTime(audioRef.current.duration)
            setDisplayDurationTime(durationTime)
        }

    }, [audioRef, playNextSong, setupMediaSessions])

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
