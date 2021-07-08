import React, { useEffect, useState } from "react";
import "../styles/PlayList.css";
import PlayListSong from "../components/PlayListSong";
import Error404 from "../components/Error404";
import Spinner from "../components/Spinner";
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
import { handleError } from "../utils/common";

function PlayListPage() {
  const dispatch = useDispatch();
  const history = useHistory();
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

  // 1. check whether there is playlist exist with the id ,if not return to library page
  useEffect(() => {
    if (id === "favorites") return;
    getPlaylist(id)
      .get()
      .then((snapshot) => {
        const result = snapshot.data();
        if (!result) {
          return setLoading(false);
        }
        setPlaylist(result);
      });
  }, [id]);

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
      deleteSongFromPlaylist("playlistsongs", song.id).catch(handleError);
    }
    deletePlaylist(id)
      .then(() => history.push("/library"))
      .catch(handleError);
  };

  if (loading) return <Spinner />;
  if (!playlist.name) return <Error404 />;

  return (
    <div className="playlist">
      <div className="playlist__header">
        <img src={playlist.imageUrl} alt="" className="playlist__image" />
        <h1 className="playlist__titleText"> {playlist.name} </h1>
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
              fromPlaylistPage
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
