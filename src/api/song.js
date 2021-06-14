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
