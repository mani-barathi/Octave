import React, { useRef } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { createNewPlaylist } from "../api/playlist";

// Popup Modal where user can enter a new playlist name and create that, used in LIbrary Page
function CreatePlaylistModal({ isOpen, closeModal, uid }) {
  const inputRef = useRef();

  const createPlaylist = (e) => {
    e.preventDefault();
    if (!inputRef.current.value) return;

    createNewPlaylist(inputRef.current.value, uid)
      .then(() => {
        inputRef.current.value = "";
        closeModal();
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create New Playlist</DialogTitle>
      <DialogContent>
        <form onSubmit={createPlaylist}>
          <input
            ref={inputRef}
            type="text"
            className="library__addPlaylistInput"
            placeholder="Enter a New Playlist Name"
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} variant="contained" color="default">
          Cancel
        </Button>
        <Button
          type="submit"
          onClick={createPlaylist}
          variant="contained"
          color="secondary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePlaylistModal;
