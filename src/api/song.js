import { db, getServerTimeStamp, storage } from "../firebase";

export const uploadSongToStorage = (file) => {
  const { name } = file;
  return storage.ref(`songs/${name}`).put(file);
};

export const getSongURL = (fileName) => {
  return storage.ref("songs").child(fileName).getDownloadURL();
};

export const addSong = (data) => {
  data.createdAt = getServerTimeStamp();
  return db.collection("songs").add(data);
};

export const searchSong = (name) => {
  return db.collection("songs").where("names", "array-contains", name).get();
};

export const getNewReleases = (limit = 8) => {
  return db.collection("songs").orderBy("createdAt", "desc").limit(limit).get();
};

export const getPaginatedSongs = (lastSongCreateAt, limit = 10) => {
  return db
    .collection("songs")
    .orderBy("createdAt", "desc")
    .startAfter(lastSongCreateAt)
    .limit(limit)
    .get();
};
