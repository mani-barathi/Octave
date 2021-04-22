import firebase from "firebase";
import { useSelector } from "react-redux";

import { useStateValue } from "../context/StateProvider";
import { getRandomPlaylistImage } from "../utils/utils";
import { db } from "../firebase";

function usePlayListFunctions() {
  const user = useSelector((state) => state.user);
  const [, dispatch] = useStateValue();

  const createNewPlaylist = (playlistName) => {
    return db.collection("playlists").add({
      uid: user.uid,
      name: playlistName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      imageUrl: getRandomPlaylistImage(),
    });
  };

  const deletePlaylist = (playlistId) => {
    return db.collection("playlists").doc(playlistId).delete();
  };

  const getAllPlaylists = () => {
    return db
      .collection("playlists")
      .where("uid", "==", user.uid)
      .orderBy("createdAt", "desc");
  };

  const addSongToPlaylist = (playlistId, song) => {
    const { name, url, imageUrl, artist } = song;
    const data = {
      playlistId,
      name,
      url,
      imageUrl,
      artist,
      addedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return db.collection("playlistsongs").add(data);
  };

  const deleteSongFromPlaylist = (playlistSongId) => {
    console.log(playlistSongId);
    return db.collection("playlistsongs").doc(playlistSongId).delete();
  };

  const getFavouriteSongs = () => {
    return db
      .collection("favorites")
      .where("uid", "==", user.uid)
      .orderBy("addedAt", "desc");
  };

  const getPlaylistSongs = (playlistId) => {
    return db
      .collection("playlistsongs")
      .where("playlistId", "==", playlistId)
      .orderBy("addedAt", "desc");
  };

  const playSelectedPlaylist = (songs) => {
    const [firstSong, ...remainingSongs] = songs;
    // set the remainingSongs to sessionStorage
    sessionStorage.setItem("SONG_LIST", JSON.stringify(remainingSongs));
    // to reset the songIndex as a new Plyslist is being played
    dispatch({ type: "SET_SONG_INDEX", songIndex: 0 });
    // dispathcing a newsong will add firstSong to the begining of the songlist
    dispatch({
      type: "SET_NEW_SONG",
      newSong: firstSong,
    });
  };

  return {
    createNewPlaylist,
    deletePlaylist,
    getAllPlaylists,
    getFavouriteSongs,
    getPlaylistSongs,
    addSongToPlaylist,
    deleteSongFromPlaylist,
    playSelectedPlaylist,
  };
}

export default usePlayListFunctions;
