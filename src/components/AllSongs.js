import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";

import PlayListSong from "./PlayListSong";
import { getPaginatedSongs } from "../api/song";

const LIMIT = 10;

const AllSongs = () => {
  const newReleases = useSelector((state) => state.newReleases);
  const [songs, setSongs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // don't fetch songs if no of songs in new releaes
    if (newReleases.length < 8) return;
    setLoading(true);
    // fetch songs after 7th song in NewReleases
    const lastSongCreateAt = newReleases[7].data.createdAt;
    getPaginatedSongs(lastSongCreateAt, LIMIT).then((snapshot) => {
      const resSongs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      if (resSongs.length < LIMIT) setHasMore(false);
      setSongs(resSongs);
      setLoading(false);
    }); // end of getPaginatedSongs
  }, [newReleases]);

  const handleLoadMore = () => {
    const lastSongCreateAt = songs[songs.length - 1].data.createdAt;
    getPaginatedSongs(lastSongCreateAt, LIMIT).then((snapshot) => {
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

  if (newReleases.length < 8) return null;

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "8rem 0",
        }}
      >
        <CircularProgress color="secondary" />
      </div>
    );
  }

  if (songs.length === 0) return null;

  return (
    <div className="row user-select-none">
      <div className="row__headerText">
        <h2>Songs</h2>
      </div>

      <div className="allsongs__container">
        {songs.length > 0 &&
          songs.map((song) => (
            <PlayListSong
              key={song.id}
              id={song.id}
              data={song.data}
              fromSearchPage
            />
          ))}
      </div>

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
    </div>
  );
};

export default AllSongs;
