import React, { useEffect, useState } from "react";
import "../styles/PlayList.css";
import PlayListSong from "../components/PlayListSong";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Button, CircularProgress } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import {
  deletePlaylist,
  deleteSongFromPlaylist,
  getFavouriteSongs,
  getPlaylist,
  getPlaylistSongs,
} from "../api/playlist";
import { setNewSong, setSongIndex } from "../actions/currentSessionActions";

function PlayListPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState(() => {
    if (id === "favorites")
      return {
        name: "favorites",
        imageUrl: "https://prexoo.com/images/no-music-cover.png",
      };
    return { name: null, imageUrl: null };
  });
  const [songs, setSongs] = useState([]);
  const history = useHistory();

  // 1. check whether there is playlist exist with the id ,if not return to library page
  useEffect(() => {
    if (id === "favorites") return;
    getPlaylist(id)
      .get()
      .then((snapshot) => {
        const result = snapshot.data();
        if (!result) return history.replace("/library");
        setPlaylist(result);
      });
  }, [history, id]);

  // 2. if playlist exists then grab all the songs from it
  useEffect(() => {
    if (!playlist.name) return;
    const isFavorites = id === "favorites";
    const payloadId = isFavorites ? user.uid : id;
    const getSongs = isFavorites ? getFavouriteSongs : getPlaylistSongs;
    const unsubscribe = getSongs(payloadId).onSnapshot((snapshot) => {
      setSongs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
      setLoading(false);
    });

    return unsubscribe;
  }, [id, playlist, user.uid]);

  const playPlayList = () => {
    const songsData = songs.map((song) => song.data);
    const [firstSong] = songsData;
    // set the remainingSongs to sessionStorage
    sessionStorage.setItem("SONG_LIST", JSON.stringify(songsData));
    // reset the songIndex and dispatch the first song as the new song
    dispatch(setSongIndex(0));
    dispatch(setNewSong(firstSong));
  };

  const handleDeletePlayList = () => {
    let confirmDelete = window.confirm("Do You Want to delete this Playlist ?");
    if (!confirmDelete) return;

    for (let song of songs) {
      console.log(song);
      deleteSongFromPlaylist(song.id)
        .then(() => console.log("deleted a song from the playlist"))
        .catch((error) => alert(error.message));
    }
    deletePlaylist(id)
      .then(() => history.push("/library"))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="playlist">
      <div className="playlist__header">
        <img src={playlist?.imageUrl} alt="" className="playlist__image" />
        <h1 className="playlist__titleText"> {playlist?.name} </h1>
        {id !== "favorites" && (
          <IconButton
            className="playlist__deleteBtn"
            onClick={handleDeletePlayList}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </div>
      <div className="playlist__header">
        {songs.length > 0 && (
          <Button
            variant="text"
            size="large"
            color="inherit"
            startIcon={<PlayArrowIcon />}
            onClick={playPlayList}
          >
            Play
          </Button>
        )}
      </div>
      <div className="playlist__container">
        {loading ? (
          <CircularProgress color="secondary" />
        ) : songs.length > 0 ? (
          songs.map((song) => (
            <PlayListSong
              key={song.id}
              id={song.id}
              data={song.data}
              isPlaylistSong
              collectionName={
                id === "favorites" ? "favorites" : "playlistsongs"
              }
            />
          ))
        ) : (
          <p style={{ marginLeft: "1rem" }}>
            You haven't added any songs this Playlist...Try Adding a song!
          </p>
        )}
      </div>
    </div>
  );
}

export default PlayListPage;
