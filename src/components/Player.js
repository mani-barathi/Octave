import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  setNewSong,
  setPlayingSong,
  setSongIndex,
  incSongIndex,
  decSongIndex,
} from "../actions/currentSessionActions";
import "../css/Player.css";
import PlayerControls from "./PlayerControls";
import PlayerSongListButton from "./PlayerSongListButton";

import { Slider } from "@material-ui/core";

import {
  calculateDurationTime,
  calculateCurrentTime,
} from "../utils/player-utils";
import {
  setRecentSongsLocalStorage,
  getNextSong,
  playNewSong,
  getPreviousSong,
} from "../utils/song-utils";
import { useDispatch, useSelector } from "react-redux";

// The Entire Bottom part where all the song controls are available
function Player() {
  const [playing, setPlaying] = useState(0);
  const [continuousTime, setContinuousTime] = useState(0);
  const [displayCurrentTime, setDisplayCurrentTime] = useState("0:00");
  const [displayDurationTime, setDisplayDurationTime] = useState("0:00");
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef(null);
  const { newSong, songIndex } = useSelector((state) => state.currentSession);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSong) {
      document.title = `${currentSong.name} (${currentSong.artist}) | Octave`;
      dispatch(setPlayingSong(currentSong));
      setRecentSongsLocalStorage(currentSong);
    }
  }, [currentSong, dispatch]);

  useEffect(() => {
    if (newSong) {
      playNewSong(songIndex, newSong);
      dispatch(setSongIndex(0));
      setCurrentSong(newSong);
      dispatch(setNewSong(null));
    }
    // eslint-disable-next-line
  }, [dispatch, newSong]);

  useEffect(() => console.log("songIndex: ", songIndex), [songIndex]);

  // playing  0 -> paused  | 1 -> playing  | -1 -> loading
  const playPauseSong = () => {
    if (!currentSong) {
      playNextSong();
      return;
    }

    if (playing === 1) {
      audioRef.current.pause();
      setPlaying(0);
      document.title = `Octave`;
    } else {
      audioRef.current.play();
      setPlaying(1);
      document.title = `${currentSong?.name} (${currentSong?.artist}) | Octave`;
    }
  };

  const playNextSong = useCallback(() => {
    console.log("This is playNextSong()");
    const nextSong = getNextSong(songIndex);
    if (nextSong) {
      setCurrentSong(nextSong);
      dispatch(incSongIndex());
      console.log("There is a next Song", nextSong.name);
    } else {
      console.log("No next song");
    }
  }, [songIndex, dispatch]);

  const playPreviousSong = useCallback(() => {
    console.log("This is playPreviousSong()");
    const prevSong = getPreviousSong(songIndex);
    if (prevSong) {
      setCurrentSong(prevSong);
      dispatch(decSongIndex());
    } else console.log("No prev song!");
  }, [songIndex, dispatch]);

  const playSongByMediaSession = useCallback(async () => {
    await audioRef.current.play();
    navigator.mediaSession.playbackState = "playing";
    setPlaying(1);
    document.title = `${currentSong?.name} (${currentSong?.artist}) | Octave`;
  }, [currentSong]);

  const pauseSongByMediaSession = async () => {
    await audioRef.current.pause();
    navigator.mediaSession.playbackState = "paused";
    setPlaying(0);
    document.title = `Octave`;
  };

  // MediaSession docs -> https://developer.mozilla.org/en-US/docs/Web/API/MediaSession
  const setupMediaSession = useCallback(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: currentSong.name,
        artist: currentSong.artist,
      });
      navigator.mediaSession.setActionHandler("play", () => {
        playSongByMediaSession();
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        pauseSongByMediaSession();
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        playPreviousSong();
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        playNextSong();
      });
    }
  }, [currentSong, playNextSong, playPreviousSong, playSongByMediaSession]);

  // When the audio element is rendered on the screen, this function gets executed
  const audioElementCallbackRef = useCallback(
    (node) => {
      if (!node) return;
      audioRef.current = node;
      audioRef.current.ontimeupdate = (event) => {
        const { duration, currentTime } = event.srcElement;
        let progressPercent = (currentTime / duration) * 100;
        // calculate current time of a song
        const currentRunningTime = calculateCurrentTime(currentTime);
        setContinuousTime(progressPercent);
        setDisplayCurrentTime(currentRunningTime);
      };

      audioRef.current.onended = () => {
        setPlaying(0);
        document.title = `Octave`;
        playNextSong();
        // setPlaying(1)
      };

      // can also use oncanplay
      audioRef.current.onloadeddata = async () => {
        await audioRef.current.play();
        setPlaying(1);
        setupMediaSession();
        const durationTime = calculateDurationTime(audioRef.current.duration);
        setDisplayDurationTime(durationTime);
      };
    },
    [audioRef, playNextSong, setupMediaSession]
  );

  const songProgressChanged = useCallback(
    (event, value) => {
      if (!currentSong) return;
      const newProgressSeconds = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newProgressSeconds;
      setContinuousTime(newProgressSeconds);
    },
    [audioRef, currentSong]
  );

  return (
    <div className="player">
      <div className="player__progress">
        <Slider
          color="secondary"
          value={continuousTime}
          onChangeCommitted={songProgressChanged}
        />
      </div>

      <div className="player__main">
        <div className="player__song">
          {currentSong?.imageUrl && (
            <img
              src={currentSong.imageUrl}
              alt=""
              className="song__infoImage"
            />
          )}
          <div className="song__info">
            <p className="song__infoTrack">{currentSong?.name}</p>
            <p className="song__infoArtist">{currentSong?.artist}</p>
          </div>
        </div>

        <PlayerControls
          playPauseSong={playPauseSong}
          playing={playing}
          playNextSong={playNextSong}
          playPreviousSong={playPreviousSong}
        />

        <div className="player__left">
          <PlayerSongListButton />

          <div className="player__duration">
            <span className="duration__current">{displayCurrentTime}</span>
            <span>/</span>
            <span className="duration__total">{displayDurationTime}</span>
          </div>
        </div>
      </div>

      <audio ref={audioElementCallbackRef} src={currentSong?.url}></audio>
    </div>
  );
}

export default Player;
