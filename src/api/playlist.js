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
  return db.collection("playlists").doc(id).get();
};

export const getAllPlaylists = (uid, cb) => {
  return db
    .collection("playlists")
    .where("uid", "==", uid)
    .orderBy("createdAt", "desc")
    .onSnapshot(cb);
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

export const getFavouriteSongs = (uid, cb) => {
  const query = db
    .collection("favorites")
    .where("uid", "==", uid)
    .orderBy("addedAt", "desc");
  return !cb ? query.get() : query.onSnapshot(cb);
};

export const getPlaylistSongs = (playlistId, cb) => {
  const query = db
    .collection("playlistsongs")
    .where("playlistId", "==", playlistId)
    .orderBy("addedAt", "desc");
  return !cb ? query.get() : query.onSnapshot(cb);
};
