import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/row.css";
import Song from "./Song";

import { CircularProgress } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import useMoveLeftRight from "../hooks/useMoveLeftRight";
import { setNewReleases } from "../actions/newReleasesActions";
import { getNewReleases } from "../api/song";

// A row of latest  songs  displayed in Home Page
function NewReleases() {
  const dispatch = useDispatch();
  const newReleases = useSelector((state) => state.newReleases);
  const { leftBtn, rightBtn, scrollLeft, scrollRight, lastNodeRef, rowRef } =
    useMoveLeftRight();

  useEffect(() => {
    if (newReleases.length > 0) return;
    getNewReleases().then((snapshot) => {
      const songs = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      dispatch(setNewReleases(songs));
    });
  }, [dispatch, newReleases.length]);

  return (
    <div className="row user-select-none">
      {newReleases.length > 0 ? (
        <div className="row__headerText">
          <h2>New Releases </h2>
          <p>Try Out These New Tracks </p>
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
          {newReleases.map((song, index) =>
            newReleases.length === index + 1 ? (
              <div key={song.id} ref={lastNodeRef}>
                {" "}
                <Song key={song.id} data={song.data} />{" "}
              </div>
            ) : (
              <Song key={song.id} data={song.data} />
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

export default NewReleases;
