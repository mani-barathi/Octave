import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Library.css";
import RecentlyListened from "../components/RecentlyListened";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import SnackBar from "../components/SnackBar";

import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

import { setPlaylists as setPlaylistsToStore } from "../actions/playlistActions";
import {
  getFavouriteSongs,
  getPlaylistSongs,
  getAllPlaylists,
} from "../api/playlist";
import { setNewSong, setSongIndex } from "../actions/currentSessionActions";

function Library() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const playlists = useSelector((state) => state.playlists);
  const [isOpen, setIsOpen] = useState(false);
  const [snackBar, setSnackBar] = useState(null);

  useEffect(() => {
    const unsubscribe = getAllPlaylists(user.uid).onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      dispatch(setPlaylistsToStore(data));
    });
    return unsubscribe;
    //eslint-disable-next-line
  }, []);

  const playThisPlaylist = (e, id) => {
    e.stopPropagation();

    const isFavorites = id === "favorites";
    const payloadId = isFavorites ? user.uid : id;
    const getSongs = isFavorites ? getFavouriteSongs : getPlaylistSongs;
    getSongs(payloadId)
      .get()
      .then((snapshot) => {
        const songs = snapshot.docs.map((doc) => doc.data());
        if (songs.length > 0) {
          const [firstSong] = songs;
          // set the remainingSongs to sessionStorage
          sessionStorage.setItem("SONG_LIST", JSON.stringify(songs));
          // reset the songIndex and dispatch the first song as the new song
          dispatch(setSongIndex(0));
          dispatch(setNewSong(firstSong));
          setSnackBar("Playlist is playing!");
        } else {
          setSnackBar("Playlist Empty!");
        }
      })
      .catch((error) => alert(error.message));
  };

  const goToFavourities = () => history.push("/playlists/favorites");
  const goToPlaylistPage = (id) => history.push(`/playlists/${id}`);

  return (
    <div className="library">
      <div className="library__header">
        <h1 className="library__titleText">My Library</h1>
      </div>
      <div className="library__recentlyListened">
        <RecentlyListened />
      </div>
      <h2 className="library__playlistTitleText"> Playlists</h2>
      <h4 className="library__playlistSubText"> Your Customized Playlists</h4>
      <div className="library__playlists">
        {/*  create newPlaylist Card */}
        <div
          key="createIcon"
          className="library__playlist library__playlistCreate"
          onClick={() => setIsOpen(true)}
        >
          <img
            src="https://www.gstatic.com/youtube/media/ytm/images/pbg/create-playlist-@210.png"
            alt=""
            className="library__playlistFavouritesImg"
          />
          <p className="library__playlistName">Create Playlist</p>
        </div>

        {/*  Favorities Card */}
        <div key="fav" className="library__playlist" onClick={goToFavourities}>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/music-streaming-app-4a392.appspot.com/o/images%2Fno-music-cover-04.png?alt=media&token=cd64ad9f-4b8c-47bd-a4d7-611f192b9311"
            alt=""
            className="library__playlistFavouritesImg"
          />
          <p className="library__playlistName">Favourites</p>
          <div className="library__playlistPlayIcon">
            <PlayCircleFilledWhiteIcon
              style={{ fill: "#F22C89" }}
              onClick={(e) => playThisPlaylist(e, "favorites")}
            />
          </div>
        </div>

        {/*  Remaining Playlists Cards */}
        {playlists?.map((playlist) => (
          <div
            key={playlist.id}
            onClick={() => goToPlaylistPage(playlist.id)}
            className="library__playlist"
          >
            <img
              src={playlist.data.imageUrl}
              alt=""
              className="library__playlistFavouritesImg"
            />
            <p className="library__playlistName">{playlist.data.name}</p>
            <div className="library__playlistPlayIcon">
              <PlayCircleFilledWhiteIcon
                style={{ fill: "#F22C89" }}
                onClick={(e) => playThisPlaylist(e, playlist.id)}
              />
            </div>
          </div>
        ))}
      </div>
      {snackBar && <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />}
      {/* To Show Pop Up messages */}
      <CreatePlaylistModal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        uid={user.uid}
      />
    </div>
  );
}

export default Library;
