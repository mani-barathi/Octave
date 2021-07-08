import { useDispatch, useSelector } from "react-redux";
import { decSongIndex, setNewSong } from "../actions/currentSessionActions";
import {
  playNewSong,
  removeSongAndReturnSessionStorage,
} from "../utils/song-utils";
import { addSongTofavorites, deleteSongFromPlaylist } from "../api/playlist";
import { handleError } from "../utils/common";

function useSongFunctions(data, setAnchorEl, setSnackBar) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { playingSong, songIndex } = useSelector(
    (state) => state.currentSession
  );

  const playSong = () => {
    if (playingSong && data.name === playingSong.name)
      return setAnchorEl(false);

    playNewSong(songIndex, data);
    dispatch(setNewSong(data));
  };

  const playNext = () => {
    // If the songlist is empty and user tries to add a song as a next song, then play the song immediately
    if (!playingSong || songIndex === -1) {
      playNewSong(songIndex, data);
      dispatch(setNewSong(data));
      return setAnchorEl(false);
    }

    // If user is trying to add the current playing song again to the songlist.. simply return
    if (playingSong && data.name === playingSong.name)
      return setAnchorEl(false);

    // removes the song and returns the songList without saving to sessionStorage
    const [songs, removedSongIndex] = removeSongAndReturnSessionStorage(data);
    const isRemovedSongIndexSmallerThanSongIndex =
      typeof removedSongIndex === "number" && removedSongIndex < songIndex;
    const currentSongIndex = songIndex;
    if (isRemovedSongIndexSmallerThanSongIndex) {
      dispatch(decSongIndex());
    }

    if (isRemovedSongIndexSmallerThanSongIndex) {
      songs.splice(currentSongIndex, 0, data);
    } else {
      songs.splice(currentSongIndex + 1, 0, data);
    }
    sessionStorage.setItem("SONG_LIST", JSON.stringify(songs));
    setAnchorEl(false);
    setSnackBar("Song will Play Next ");
  };

  const addToQueue = () => {
    // If the songlist is empty and user tries to add a song to the queue, then play the song immediately
    if (!playingSong || songIndex === -1) {
      playNewSong(songIndex, data);
      dispatch(setNewSong(data));
      return setAnchorEl(false);
    }

    // If user is trying to add the current playing song again to the songlist.. simply return
    if (playingSong && data.name === playingSong.name)
      return setAnchorEl(false);

    // removes the song and returns the songList without saving to sessionStorage
    const [songs, removedSongIndex] = removeSongAndReturnSessionStorage(data);
    if (typeof removedSongIndex === "number" && removedSongIndex < songIndex)
      dispatch(decSongIndex());

    songs.push(data);
    sessionStorage.setItem("SONG_LIST", JSON.stringify(songs));
    setAnchorEl(false);
    setSnackBar("Song added to Queue");
  };

  const addToFavourites = async () => {
    setAnchorEl(false);
    await addSongTofavorites(data, user.uid)
      .then(() => {
        setSnackBar("Song added to Favorites");
      })
      .catch(handleError);
  };

  const removeFromPlaylist = (collectionName, songId) => {
    setAnchorEl(false);
    deleteSongFromPlaylist(collectionName, songId).catch(handleError);
  };

  return {
    playSong,
    playNext,
    addToQueue,
    addToFavourites,
    removeFromPlaylist,
  };
}

export default useSongFunctions;
