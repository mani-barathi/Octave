import React, { useState, useEffect } from "react";
import "../styles/ArtistPage.css";
import PlaylistSong from "../components/PlayListSong";
import Error404 from "../components/Error404";
import Spinner from "../components/Spinner";

import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { db } from "../firebase";

// Artist Page when user clicks on a Artist card presernt inside Home or Search Page
function ArtistPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .doc(id)
      .get()
      .then((snapshot) => {
        const fetchedArtist = snapshot.data();
        if (!fetchedArtist) {
          return setLoading(false);
        }
        setArtist(fetchedArtist);
        db.collection("songs")
          .where("artist", ">=", fetchedArtist.name)
          .where("artist", "<=", fetchedArtist.name + "\uf8ff")
          .get()
          .then((snapshot) => {
            setSongs(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
            setLoading(false);
          });
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (!artist) return <Error404 />;

  return (
    <div className="artistpage">
      <div className="artistpage__header">
        <div className="artistpage__headerInfo">
          <img src={artist?.imageUrl} alt="" className="artistpage__image" />

          <div className="artistpage__headerInfoText">
            <Typography variant="h4">{artist?.name}</Typography>

            <Typography variant="subtitle2">{artist?.description}</Typography>
          </div>
        </div>

        <br />
        <Typography variant="h6">
          {songs.length > 0 ? "Songs" : "No Songs"}
        </Typography>
      </div>

      <div className="artistpage__songlist">
        {songs.map((song) => (
          <PlaylistSong
            key={song.id}
            id={song.id}
            data={song.data}
            fromArtistPage
          />
        ))}
      </div>
    </div>
  );
}

export default ArtistPage;
