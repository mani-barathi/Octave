import { db, storage, getServerTimeStamp } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  query,
  orderBy,
  addDoc,
  where,
  getDocs,
  onSnapshot,
  limit,
} from "firebase/firestore";

export const getArtists = (cb) => {
  const q = query(collection(db, "artists"), orderBy("name"));
  return onSnapshot(q, cb);
};

export const addArtist = (data) => {
  data.createdAt = getServerTimeStamp();
  return addDoc(collection(db, "artists"), data);
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
  const q = query(
    collection(db, "artists"),
    where("names", "array-contains", name)
  );
  return getDocs(q);
};

export const getRecentArtists = (l = 8) => {
  const q = query(
    collection(db, "artists"),
    orderBy("createdAt", "desc"),
    limit(l)
  );
  return getDocs(q);
};
