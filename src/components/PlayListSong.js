import React, { useState } from "react";
import "../styles/PlayListSong.css";
import SnackBar from "./SnackBar";
import AddPlayListSongModal from "./AddPlayListSongModal";

import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";

import useSongFunctions from "../hooks/useSongFunctions";

// Rectangular Song component used in ArtistPage, SearchPage, PlaylistPage, SongList, AllSongs
function PlayListSong({
  id,
  data,
  fromPlaylistPage,
  fromArtistPage,
  fromSearchPage,
  fromSongList,
  isPlayingSong, // is it currentPlaying Song ?
  collectionName, // what collection is this song from (favourites or playlistsong)
  removeFromSongList,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackBar, setSnackBar] = useState(null);
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const {
    playSong,
    playNext,
    addToQueue,
    removeFromPlaylist,
    addToFavourites,
  } = useSongFunctions(data, setAnchorEl, setSnackBar);

  const removeSongFunc = () => {
    if (fromPlaylistPage) removeFromPlaylist(collectionName, id);
    else removeFromSongList(data);
    setAnchorEl(false);
  };

  const openOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openAddSongPlaylistModal = () => {
    SetIsModalOpen(true);
    setAnchorEl(false);
  };

  return (
    <div
      className={isPlayingSong ? "playlistsong playing-song" : "playlistsong"}
    >
      <img src={data.imageUrl} alt="" className="playlistsong__img" />
      <div className="playlistsong__info">
        <p className="playlistsong__infoName" title={data.name}>
          {data.name}
        </p>
        <p className="playlistsong__infoArtist" title={data.artist}>
          {data.artist}
        </p>
      </div>
      {/* If this is not the current playing */}
      {!isPlayingSong && (
        <div>
          <IconButton className="playlistsong__optionsIcon" onClick={playSong}>
            <PlayArrowIcon />
          </IconButton>
          {/* if it is from SongList, show remove the button */}
          {fromSongList && (
            <IconButton
              className="playlistsong__optionsIcon"
              onClick={removeSongFunc}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </div>
      )}

      <div className="playlistsong__options">
        {/* If this song is not from SongList Component then it is from PlaylistPage or ArtistPage or SearchPage so show the options (playnext,add to queue,add to Favaourites) */}
        {!fromSongList && (
          <>
            <IconButton
              className="playlistsong__optionsIcon"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={openOptions}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(false)}
            >
              <MenuItem
                className="playlistsong__optionsItem"
                onClick={playNext}
              >
                Play Next
              </MenuItem>
              <MenuItem
                className="playlistsong__optionsItem"
                onClick={addToQueue}
              >
                Add to Queue
              </MenuItem>
              {/* If this is from PlaylistPage then show the remove button */}
              {fromPlaylistPage ? (
                <MenuItem
                  className="playlistsong__optionsItem"
                  onClick={removeSongFunc}
                >
                  Remove
                </MenuItem>
              ) : (
                // if this is from SearchPage or ArtistPage then show these below
                <div>
                  <MenuItem
                    className="playlistsong__optionsItem"
                    onClick={addToFavourites}
                  >
                    add To Favourites
                  </MenuItem>
                  <MenuItem
                    className="song__optionItem"
                    onClick={openAddSongPlaylistModal}
                  >
                    Add To Playlist
                  </MenuItem>
                </div>
              )}
            </Menu>
          </>
        )}
      </div>

      {/* If this song is from Playlist or Favourites or ArtistPage then show SnackBar Notifications */}
      {(fromSearchPage || fromPlaylistPage || fromArtistPage) && snackBar && (
        <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />
      )}
      {/* To Show Pop Up messages */}
      {/* If this song is from PlaylistPage or ArtistPage or SearchPage then show SnackBar Notifications */}
      {isModalOpen && (
        <AddPlayListSongModal
          song={data}
          closeModal={() => SetIsModalOpen(false)}
          setSnackBar={setSnackBar}
        />
      )}
    </div>
  );
}

export default PlayListSong;
