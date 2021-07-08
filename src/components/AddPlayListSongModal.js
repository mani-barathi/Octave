import React, { useEffect } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";

import { getAllPlaylists, addSongToPlaylist } from "../api/playlist";
import { setPlaylists } from "../actions/playlistActions";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";

// add a song to playlist modal, used inside Song and PlaylistSong
function AddPlayListSongModal({ song, closeModal, setSnackBar }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const playlists = useSelector((state) => state.playlists);

  useEffect(() => {
    if (playlists) return;
    getAllPlaylists(user.uid)
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        dispatch(setPlaylists(data));
      });
  }, [dispatch, playlists, user.uid]);

  const addSong = (playlistId) => {
    addSongToPlaylist(playlistId, song)
      .then(() => setSnackBar("Song added to Playlist"))
      .then(() => closeModal())
      .catch((error) => alert(error.message));
  };

  return (
    <Dialog
      onClose={closeModal}
      aria-labelledby="simple-dialog-title"
      open={true}
    >
      <DialogTitle id="simple-dialog-title">Add song to playlist</DialogTitle>
      <List>
        {playlists?.map((playlist) => (
          <ListItem
            key={playlist.id}
            button
            onClick={() => addSong(playlist.id)}
          >
            <ListItemText align="center" primary={playlist.data.name} />
          </ListItem>
        ))}

        {playlists?.length === 0 && (
          <ListItem>
            <Typography variant="subtitle1" align="center">
              No Playlist... Create a Playlist in Library Page
            </Typography>
          </ListItem>
        )}
        <center>{!playlists && <CircularProgress color="secondary" />}</center>
      </List>
    </Dialog>
  );
}

export default AddPlayListSongModal;
