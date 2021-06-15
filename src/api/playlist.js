import firebase from "firebase";
import { db } from "../firebase";
import { getRandomPlaylistImage } from "../utils/common";

export const createNewPlaylist = (name, uid) => {
  return db.collection("playlists").add({
    uid,
    name,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    imageUrl: getRandomPlaylistImage(),
  });
};

export const deletePlaylist = (playlistId) => {
  return db.collection("playlists").doc(playlistId).delete();
};

export const getPlaylist = (id) => {
  return db.collection("playlists").doc(id);
};

export const getAllPlaylists = (uid) => {
  return db
    .collection("playlists")
    .where("uid", "==", uid)
    .orderBy("createdAt", "desc");
};

export const addSongToPlaylist = (playlistId, song) => {
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

export const deleteSongFromPlaylist = (playlistSongId) => {
  return db.collection("playlistsongs").doc(playlistSongId).delete();
};

export const getFavouriteSongs = (uid) => {
  return db
    .collection("favorites")
    .where("uid", "==", uid)
    .orderBy("addedAt", "desc");
};

export const getPlaylistSongs = (playlistId) => {
  return db
    .collection("playlistsongs")
    .where("playlistId", "==", playlistId)
    .orderBy("addedAt", "desc");
};
