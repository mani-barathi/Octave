import { db, getServerTimeStamp } from "../firebase";
import { getRandomPlaylistImage } from "../utils/common";

export const createNewPlaylist = (name, uid) => {
  return db.collection("playlists").add({
    uid,
    name,
    createdAt: getServerTimeStamp(),
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
    addedAt: getServerTimeStamp(),
  };
  return db.collection("playlistsongs").add(data);
};

export const addSongTofavorites = (song, uid) => {
  const { name, url, imageUrl, artist } = song;
  const data = {
    uid,
    name,
    url,
    imageUrl,
    artist,
    addedAt: getServerTimeStamp(),
  };
  return db.collection("favorites").add(data);
};

export const deleteSongFromPlaylist = (collectionName, songId) => {
  return db.collection(collectionName).doc(songId).delete();
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
