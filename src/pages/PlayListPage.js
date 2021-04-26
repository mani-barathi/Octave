import React, { useEffect, useState } from "react";
import "../css/PlayList.css";
import PlayListSong from "../components/PlayListSong";
import { useParams, useHistory } from "react-router-dom";

import { IconButton, Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

import usePlayListFunctions from "../hooks/usePlayListFunctions";

// PlayListPage, which displays all the songs of the playlist, this includes the Favorites Page also
function PlayListPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(() => {
    if (id === "favorites")
      return {
        name: "favorites",
        imageUrl: "https://prexoo.com/images/no-music-cover.png",
      };
    return { name: "", imageUrl: "" };
  });
  const [songs, setSongs] = useState([]);
  const history = useHistory();
  const {
    getFavouriteSongs,
    getPlaylistSongs,
    deleteSongFromPlaylist,
    deletePlaylist,
    playSelectedPlaylist,
    getPlaylist,
  } = usePlayListFunctions();

  useEffect(() => {
    if (id === "favorites") return;
    getPlaylist(id)
      .get()
      .then((snapshot) => {
        const result = snapshot.data();
        if (!result) return history.push("/library");
        setPlaylist(snapshot.data());
      });
  }, [getPlaylist, history, id]);

  useEffect(() => {
    const getSongs = id === "favorites" ? getFavouriteSongs : getPlaylistSongs;

    let unsubscribe = getSongs(id).onSnapshot((snapshot) => {
      setSongs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
    // eslint-disable-next-line
  }, [id]);

  const playPlayList = () => {
    const playlistSongs = songs.map((song) => song.data);
    playSelectedPlaylist(playlistSongs);
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
    // eslint-disable-next-line
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
        {songs.length > 0 ? (
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