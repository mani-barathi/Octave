import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "../css/SongList.css";
import PlayListSong from "./PlayListSong";

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {
  getSongSessionStorage,
  removeSongAndReturnSessionStorage,
} from "../utils/song-utils";
import { useStateValue } from "../context/StateProvider";
import { toggleIsSongListOpen } from "../actions/currentSessionActions";

// This is the current Playlist of songs which will be showed when user Toggles it.
function SongList() {
  const reduxDispatch = useDispatch();
  const songListContainerRef = useRef();
  const [{ playingSong, songIndex }, dispatch] = useStateValue();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    setSongs(getSongSessionStorage);
  }, [playingSong, songIndex]);

  const removeFromSongList = (data) => {
    const [songs, removedSongIndex] = removeSongAndReturnSessionStorage(data);
    console.log(`removeSongIndex:`, removedSongIndex);
    if (typeof removedSongIndex === "number" && removedSongIndex < songIndex)
      dispatch({ type: "DEC_SONG_INDEX" });

    sessionStorage.setItem("SONG_LIST", JSON.stringify(songs));
    setSongs(getSongSessionStorage);
  };

  const closeSongList = (event) => {
    if (event.target === songListContainerRef.current)
      reduxDispatch(toggleIsSongListOpen());
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
            onClick={() => reduxDispatch(toggleIsSongListOpen())}
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SongList;
