import { db, getServerTimeStamp, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  orderBy,
  startAfter,
  limit,
  query,
  getDocs,
  where,
} from "firebase/firestore";

export const uploadSongToStorage = (file) => {
  const { name } = file;
  const storageRef = ref(storage, `songs/${name}`);
  return uploadBytesResumable(storageRef, file);
};

export const getSongURL = (fileRef) => {
  return getDownloadURL(fileRef);
};

export const addSong = (data) => {
  data.createdAt = getServerTimeStamp();
  return addDoc(collection(db, "songs"), data);
};

export const searchSong = (name) => {
  const q = query(
    collection(db, "songs"),
    where("names", "array-contains", name)
  );
  return getDocs(q);
};

// changing the limit(l) value here from 8 to some other values,
// requries change in AllSongs useEffect
export const getNewReleases = (l = 8) => {
  const q = query(
    collection(db, "songs"),
    orderBy("createdAt", "desc"),
    limit(l)
  );
  return getDocs(q);
};

export const getPaginatedSongs = (lastSongCreateAt, l) => {
  const q = query(
    collection(db, "songs"),
    orderBy("createdAt", "desc"),
    startAfter(lastSongCreateAt),
    limit(l)
  );
  return getDocs(q);
};
