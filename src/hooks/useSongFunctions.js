import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { decSongIndex, setNewSong } from "../actions/currentSessionActions";
import {
  playNewSong,
  removeSongAndReturnSessionStorage,
} from "../utils/song-utils";
import { db } from "../firebase";

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

    if (songs.length === 0) {
      // songlist is Empty
      sessionStorage.setItem("SONG_LIST", JSON.stringify([data]));
    } else if (songs.length >= 1) {
      // songlist is not Empty
      if (isRemovedSongIndexSmallerThanSongIndex) {
        songs.splice(currentSongIndex, 0, data);
      } else {
        songs.splice(currentSongIndex + 1, 0, data);
      }
      // newSongList = [songs[0], data, ...songs.slice(1)];
      sessionStorage.setItem("SONG_LIST", JSON.stringify(songs));
    }
    setAnchorEl(false);
    setSnackBar("Song will Play Next ");
  };

  const addToQueue = () => {
    // If user is trying to add the current playing song again to the songlist.. simply return
    if (playingSong && data.name === playingSong.name)
      return setAnchorEl(false);

    // removes the song and returns the songList without saving to sessionStorage
    const [songs, removedSongIndex] = removeSongAndReturnSessionStorage(data);
    console.log(`removeSongIndex:`, removedSongIndex);
    if (typeof removedSongIndex === "number" && removedSongIndex < songIndex)
      dispatch(decSongIndex());

    songs.push(data);
    sessionStorage.setItem("SONG_LIST", JSON.stringify(songs));
    setAnchorEl(false);
    setSnackBar("Song added to Queue");
  };

  const addToFavourites = () => {
    setAnchorEl(false);
    const { name, url, imageUrl, artist } = data; // destructuring to exclude the createdAt Timestamp from Song obj
    db.collection("favorites").add({
      uid: user.uid,
      addedAt: firebase.firestore.FieldValue.serverTimestamp(),
      name,
      url,
      imageUrl,
      artist,
    });
    setSnackBar("Song added to Favorites");
  };

  const removeFromPlaylist = (collectionName, id) => {
    setAnchorEl(false);
    db.collection(collectionName).doc(id).delete();
    console.log(`deleted ${id} from ${collectionName}`);
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
