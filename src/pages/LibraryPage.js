import React, { useState, useEffect } from "react";
import "../css/Library.css";
import RecentlyListened from "../components/RecentlyListened";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import SnackBar from "../components/SnackBar";

import { useHistory } from "react-router-dom";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

import usePlayListFunctions from "../hooks/usePlayListFunctions";

function Library() {
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [snackBar, setSnackBar] = useState(null);
  const { getAllPlaylists } = usePlayListFunctions();
  const {
    getFavouriteSongs,
    getPlaylistSongs,
    playSelectedPlaylist,
  } = usePlayListFunctions();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = getAllPlaylists().onSnapshot((snapshot) => {
      setPlaylists(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
    //eslint-disable-next-line
  }, []);

  const goToFavourities = () => {
    history.push("/playlists/favorites");
  };

  const goToPlaylistPage = (id) => {
    history.push(`/playlists/${id}`);
  };

  const playThisPlaylist = (e, id) => {
    e.stopPropagation();

    const getSongs = id === "favorites" ? getFavouriteSongs : getPlaylistSongs;
    getSongs(id)
      .get()
      .then((snapshot) => {
        const songs = snapshot.docs.map((doc) => doc.data());
        if (songs.length > 0) {
          playSelectedPlaylist(songs);
          setSnackBar("Playlist is playing!");
        } else {
          setSnackBar("Playlist Empty!");
        }
      })
      .catch((error) => alert(error.message));
  };

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
            src="https://prexoo.com/images/no-music-cover.png"
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
        {playlists.map((playlist) => (
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
      {snackBar && <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />}{" "}
      {/* To Show Pop Up messages */}
      <CreatePlaylistModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Library;