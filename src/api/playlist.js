import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db, getServerTimeStamp } from "../firebase";
import { getRandomPlaylistImage } from "../utils/common";

export const createNewPlaylist = (name, uid) => {
  return addDoc(collection(db, "playlists"), {
    uid,
    name,
    createdAt: getServerTimeStamp(),
    imageUrl: getRandomPlaylistImage(),
  });
};

export const deletePlaylist = (playlistId) => {
  return deleteDoc(doc(db, "playlists", playlistId));
};

export const getPlaylist = (id) => {
  return getDoc(doc(db, "playlists", id));
};

export const getAllPlaylists = (uid, cb) => {
  const q = query(
    collection(db, "playlists"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  return !cb ? getDocs(q) : onSnapshot(q, cb);
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
  return addDoc(collection(db, "playlistsongs"), data);
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
  return addDoc(collection(db, "favorites"), data);
};

export const deleteSongFromPlaylist = (collectionName, songId) => {
  return deleteDoc(doc(db, collectionName, songId));
};

export const getFavouriteSongs = (uid, cb) => {
  const q = query(
    collection(db, "favorites"),
    where("uid", "==", uid),
    orderBy("addedAt", "desc")
  );
  return !cb ? getDocs(q) : onSnapshot(q, cb);
};

export const getPlaylistSongs = (playlistId, cb) => {
  const q = query(
    collection(db, "playlistsongs"),
    where("playlistId", "==", playlistId),
    orderBy("addedAt", "desc")
  );
  return !cb ? getDocs(q) : onSnapshot(q, cb);
};
