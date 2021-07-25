import React, { useState } from "react";
import "../styles/Song.css";
import SnackBar from "./SnackBar";
import AddPlayListSongModal from "./AddPlayListSongModal";

import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";

import useSongFunctions from "../hooks/useSongFunctions";

function Song({ data }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackBar, setSnackBar] = useState(null);
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const { playSong, playNext, addToQueue, addToFavourites } = useSongFunctions(
    data,
    setAnchorEl,
    setSnackBar
  );

  const openOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const openAddSongPlaylistModal = () => {
    SetIsModalOpen(true);
    setAnchorEl(false);
  };

  return (
    <div className="song">
      <img src={data.imageUrl} alt="" className="song__image" />
      <p className="song__name" title={data.name}>
        {data.name}
      </p>
      <p className="song__artist" title={data.artist}>
        {data.artist}
      </p>
      <div className="song__playButton">
        <IconButton className="song__playIcon" onClick={playSong}>
          <PlayCircleFilledWhiteIcon style={{ fill: "#F22C89" }} />
        </IconButton>
      </div>
      <div className="song__option">
        <IconButton
          className="song__optionIcon"
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
          <MenuItem className="song__optionItem" onClick={playNext}>
            Play Next
          </MenuItem>
          <MenuItem className="song__optionItem" onClick={addToQueue}>
            Add to Queue
          </MenuItem>
          <MenuItem className="song__optionItem" onClick={addToFavourites}>
            Add To Favourites
          </MenuItem>
          <MenuItem
            className="song__optionItem"
            onClick={openAddSongPlaylistModal}
          >
            Add To Playlist
          </MenuItem>
        </Menu>
      </div>
      {snackBar && <SnackBar snackBar={snackBar} setSnackBar={setSnackBar} />}{" "}
      {/* To Show Pop Up messages */}
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

export default Song;
