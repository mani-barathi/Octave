import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/row.css";
import Artist from "./Artist";

import { CircularProgress } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import useMoveLeftRight from "../hooks/useMoveLeftRight";
import { getRecentArtists } from "../api/artist";
import { setArtists } from "../actions/artistsActions";

// A Row of Artist present inside Home Page
function ArtistsList() {
  const artists = useSelector((state) => state.artists);
  const dispatch = useDispatch();
  const { leftBtn, rightBtn, scrollLeft, scrollRight, lastNodeRef, rowRef } =
    useMoveLeftRight();

  useEffect(() => {
    if (artists.length !== 0) return;

    getRecentArtists().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      dispatch(setArtists(data));
    });
    // eslint-disable-next-line
  }, [dispatch]);

  return (
    <div className="row user-select-none">
      {artists.length > 0 ? (
        <div className="row__headerText">
          <h2>Artist </h2>
          <p>Popular Artists </p>
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

      <div className="row__songsContainer">
        <div className="row__leftButtonDiv" onClick={scrollLeft}>
          {leftBtn && (
            <ChevronLeftIcon fontSize="large" className="row__icon" />
          )}
        </div>

        <div ref={rowRef} className="row__songs">
          {artists.map((artist, index) =>
            artists.length === index + 1 ? (
              <div key={artist.id} ref={lastNodeRef}>
                <Artist key={artist.id} id={artist.id} data={artist.data} />
              </div>
            ) : (
              <Artist key={artist.id} id={artist.id} data={artist.data} />
            )
          )}
        </div>

        <div className="row__rightButtonDiv" onClick={scrollRight}>
          {rightBtn && (
            <ChevronRightIcon fontSize="large" className="row__icon" />
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtistsList;
