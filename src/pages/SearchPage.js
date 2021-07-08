import React, { useState, useEffect } from "react";
import "../styles/Search.css";
import PlayListSong from "../components/PlayListSong";
import Artist from "../components/Artist";
import {
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { capitalize, capitalizeAllWords } from "../utils/common";
import { searchArtist } from "../api/artist";
import { searchSong } from "../api/song";

// Search Page
function Search() {
  const [input, setInput] = useState("");
  const [infoText, setInfoText] = useState("");
  const [songs, setSongs] = useState(null);
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    setInfoText("");
  }, [input]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!input) return;

    let searchText = capitalize(input);
    await searchSong(searchText).then((snapshot) => {
      setSongs(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    searchText = capitalizeAllWords(input);
    await searchArtist(searchText).then((snapshot) => {
      setArtists(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    setInfoText(`Search Result for ${input}`);
  };

  return (
    <div className="search">
      <div className="search__bar">
        <form className="search__barForm" onSubmit={handleSearch}>
          <TextField
            onChange={(e) => setInput(e.target.value)}
            value={input}
            variant="filled"
            label="Search for Songs or Artists"
            fullWidth
            margin="dense"
            size="medium"
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    className="search__barSearchIcon"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </div>

      {/*  Results Info Text ------------------------*/}
      <Typography variant="h6" align="center">
        {infoText}
      </Typography>

      <Typography variant="subtitle1" align="center">
        {songs?.length === 0 &&
          artists?.length === 0 &&
          infoText &&
          `No Results`}
      </Typography>

      {/* Songs Results ------------------------*/}
      <Typography variant="h6">{songs?.length > 0 && `Songs`}</Typography>

      <div className="search__grid">
        {songs?.length > 0 &&
          songs.map((song) => (
            <PlayListSong key={song.id} data={song.data} fromSearchPage />
          ))}
      </div>

      <br />

      {/* Artists Results----------------------------------- */}
      <Typography variant="h6">{artists?.length > 0 && `Artists`}</Typography>

      <div className="search__results">
        {artists?.length > 0 &&
          artists.map((artist) => (
            <Artist key={artist.id} id={artist.id} data={artist.data} />
          ))}
      </div>
    </div>
  );
}

export default Search;
