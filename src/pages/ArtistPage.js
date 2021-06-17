import React, { useState, useEffect } from "react";
import "../styles/ArtistPage.css";
import PlaylistSong from "../components/PlayListSong";

import { useHistory, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";

import { db } from "../firebase";

// Artist Page when user clicks on a Artist card presernt inside Home or Search Page
function ArtistPage() {
  const history = useHistory();
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    db.collection("artists")
      .doc(id)
      .get()
      .then((snapshot) => {
        const fetchedArtist = snapshot.data();
        if (!fetchedArtist) {
          return history.replace("/");
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
          });
      });
  }, [history, id]);

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
          {songs.length > 0
            ? "Songs"
            : !artist && songs.length === 0
            ? "Loading..."
            : "No Songs"}
        </Typography>
      </div>

      <div className="artistpage__songlist">
        {songs.map((song) => (
          <PlaylistSong
            key={song.id}
            id={song.id}
            data={song.data}
            isArtistPage
          />
        ))}
      </div>
    </div>
  );
}

export default ArtistPage;
