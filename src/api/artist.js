import { db, getServerTimeStamp } from "../firebase";

export const getArtists = () => {
  return db.collection("artists").orderBy("name");
};

export const addArtist = (data) => {
  data.createdAt = getServerTimeStamp();
  return db.collection("artists").add(data);
};
