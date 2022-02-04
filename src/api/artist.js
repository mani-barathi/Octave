import { db, storage, getServerTimeStamp } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const getArtists = () => {
  return db.collection("artists").orderBy("name");
};

export const addArtist = (data) => {
  data.createdAt = getServerTimeStamp();
  return db.collection("artists").add(data);
};

export const uploadArtistToStorage = (file) => {
  const { name } = file;
  const storageRef = ref(storage, `artists-images/${name}`);
  return uploadBytesResumable(storageRef, file);
};

export const getArtistImageURL = (fileRef) => {
  return getDownloadURL(fileRef);
};

export const searchArtist = (name) => {
  return db.collection("artists").where("names", "array-contains", name).get();
};

export const getRecentArtists = (limit = 8) => {
  return db
    .collection("artists")
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
};
