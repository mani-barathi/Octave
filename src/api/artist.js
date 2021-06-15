import { db, storage, getServerTimeStamp } from "../firebase";

export const getArtists = () => {
  return db.collection("artists").orderBy("name");
};

export const addArtist = (data) => {
  data.createdAt = getServerTimeStamp();
  return db.collection("artists").add(data);
};

export const uploadArtistToStorage = (file) => {
  const { name } = file;
  return storage.ref(`artists-images/${name}`).put(file);
};

export const getArtistImageURL = (fileName) => {
  return storage.ref("artists-images").child(fileName).getDownloadURL();
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
