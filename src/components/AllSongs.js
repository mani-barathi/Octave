import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";

import PlayListSong from "./PlayListSong";
import { db } from "../firebase";
import { getPaginatedSongs } from "../api/song";

const LIMIT = 10;

const AllSongs = () => {
  const newReleases = useSelector((state) => state.newReleases);
  const [songs, setSongs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (newReleases.length === 0) return;
    const lastSongCreateAt = newReleases[newReleases.length - 1].data.createdAt;
    getPaginatedSongs(lastSongCreateAt).then((snapshot) => {
      const resSongs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      if (resSongs.length < LIMIT) setHasMore(false);
      setSongs(resSongs);
    });
  }, [newReleases]);

  const handleLoadMore = () => {
    const lastSongCreateAt = songs[songs.length - 1].data.createdAt;
    getPaginatedSongs(lastSongCreateAt).then((snapshot) => {
      const resSongs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      if (resSongs.length < LIMIT) setHasMore(false);
      if (resSongs.length > 0) {
        setSongs((prev) => [...prev, ...resSongs]);
      }
    });
  };

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
            margin: "8rem 0",
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

      {songs.length > 0 && (
        <div style={{ margin: "1rem" }}>
          <Button
            color="inherit"
            variant="outlined"
            disabled={!hasMore}
            onClick={handleLoadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default AllSongs;
