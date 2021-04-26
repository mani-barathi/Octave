import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import PlayListSong from "./PlayListSong";

const AllSongs = () => {
  const songs = useSelector((state) => state.newReleases);
  const dispatch = useDispatch();

  useEffect(() => {
    // db.collection("songs")
    //   .orderBy("createdAt", "desc")
    //   .limit(10)
    //   .get()
    //   .then((snapshot) => {
    //     const songs = snapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       data: doc.data(),
    //     }));
    //     dispatch(setNewReleases(songs));
    //   });
  }, [dispatch]);

  return (
    <div className="row user-select-none">
      {songs.length > 0 ? (
        <div className="row__headerText">
          <h2>Songs</h2>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "2rem 0",
          }}
        >
          <CircularProgress color="secondary" />
        </div>
      )}
      <div className="playlist__container">
        {songs.length > 0 &&
          songs.map((song) => (
            <PlayListSong
              key={song.id}
              id={song.id}
              data={song.data}
              isSearchSong
            />
          ))}
      </div>
    </div>
  );
};

export default AllSongs;
