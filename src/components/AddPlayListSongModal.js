import React, { useEffect, useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

import usePlayListFunctions from "../hooks/usePlayListFunctions";

// add a song to playlist modal, used inside Song and PlaylistSong
function AddPlayListSongModal({ song, SetIsModalOpen, setSnackBar }) {
  const [playlists, setPlaylists] = useState([]);
  const { getAllPlaylists, addSongToPlaylist } = usePlayListFunctions();

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
    // eslint-disable-next-line
  }, []);

  const addSong = (playlistId) => {
    addSongToPlaylist(playlistId, song)
      .then(() => setSnackBar("Song added to Playlist"))
      .then(() => handleClose())
      .catch((error) => alert(error.message));
  };

  const handleClose = () => SetIsModalOpen(false);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={true}
    >
      <DialogTitle id="simple-dialog-title">Add song to playlist</DialogTitle>
      <List>
        {playlists.map((playlist) => (
          <ListItem
            key={playlist.id}
            button
            onClick={() => addSong(playlist.id)}
          >
            <ListItemText align="center" primary={playlist.data.name} />
          </ListItem>
        ))}

        {playlists.length === 0 && (
          <ListItem>
            <Typography variant="subtitle1" align="center">
              No Playlist... Create a Playlist in Library Page
            </Typography>
          </ListItem>
        )}
      </List>
    </Dialog>
  );
}

export default AddPlayListSongModal;
