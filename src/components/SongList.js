import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/SongList.css";
import PlayListSong from "./PlayListSong";

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  getSongSessionStorage,
  removeSongAndReturnSessionStorage,
} from "../utils/song-utils";
import {
  toggleIsSongListOpen,
  decSongIndex,
} from "../actions/currentSessionActions";

// This is the current Playlist of songs which will be showed when user Toggles it.
function SongList() {
  const dispatch = useDispatch();
  const { playingSong, songIndex } = useSelector(
    (state) => state.currentSession
  );
  const songListContainerRef = useRef();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(getSongSessionStorage);
  }, [playingSong, songIndex]);

  const removeFromSongList = (data) => {
    const [songs, removedSongIndex] = removeSongAndReturnSessionStorage(data);
    if (typeof removedSongIndex === "number" && removedSongIndex < songIndex)
      dispatch(decSongIndex());

    sessionStorage.setItem("SONG_LIST", JSON.stringify(songs));
    setSongs(getSongSessionStorage);
  };

  const closeSongList = (event) => {
    if (event.target === songListContainerRef.current)
      dispatch(toggleIsSongListOpen());
  };

  return (
    <div
      className="songlist__overlay"
      ref={songListContainerRef}
      onClick={closeSongList}
    >
      <div className="songlist">
        <div className="songlist__header">
          <h3>SongList</h3>
          <IconButton
            className="songlist__headerCloseBtn"
            onClick={() => dispatch(toggleIsSongListOpen())}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {songs.length > 0 /* List  */ && (
          <div className="songlist__songs">
            {songs.map((song) => (
              <PlayListSong
                key={song?.name}
                data={song}
                isPlayingSong={song?.name === playingSong?.name ? true : false}
                removeFromSongList={removeFromSongList}
                fromSongList
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SongList;
