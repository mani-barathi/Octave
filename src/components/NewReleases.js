import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/row.css";
import Song from "./Song";

import { CircularProgress } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import useMoveLeftRight from "../hooks/useMoveLeftRight";
import { db } from "../firebase";
import { setNewReleases } from "../actions/newReleasesActions";

// A row of latest  songs  displayed in Home Page
function NewReleases() {
  const newReleases = useSelector((state) => state.newReleases);
  const dispatch = useDispatch();
  const [isLeftBtn, setIsLeftBtn] = useState(false);
  const [isRightBtn, setIsRightBtn] = useState(false);
  const rowRef = useRef();
  const [scrollLeft, scrollRight] = useMoveLeftRight(
    rowRef,
    setIsLeftBtn,
    setIsRightBtn
  );

  useEffect(() => {
    window.addEventListener("resize", toggleButtonOnWindowResize);
    return () =>
      window.removeEventListener("resize", toggleButtonOnWindowResize);
  }, []);

  useEffect(() => {
    if (newReleases.length > 0) return;
    db.collection("songs")
      .orderBy("createdAt", "desc")
      .limit(8)
      .get()
      .then((snapshot) => {
        const songs = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        dispatch(setNewReleases(songs));
      });
  }, [dispatch, newReleases.length]);

  const toggleButtonOnWindowResize = () => {
    if (!rowRef.current) return;
    if (rowRef.current.scrollWidth - rowRef.current.offsetWidth > 0) {
      setIsRightBtn(true);
    } else {
      setIsRightBtn(false);
    }

    if (rowRef.current.scrollLeft > 300) {
      setIsLeftBtn(true);
    } else {
      setIsLeftBtn(false);
    }
  };

  const lastSongRef = useCallback(() => {
    toggleButtonOnWindowResize();
  }, []);

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
          {isLeftBtn && (
            <ChevronLeftIcon fontSize="large" className="row__icon" />
          )}
        </div>

        <div ref={rowRef} className="row__songs">
          {newReleases.map((song, index) =>
            newReleases.length === index + 1 ? (
              <div key={song.id} ref={lastSongRef}>
                {" "}
                <Song key={song.id} data={song.data} />{" "}
              </div>
            ) : (
              <Song key={song.id} data={song.data} />
            )
          )}
        </div>

        <div className="row__rightButtonDiv" onClick={scrollRight}>
          {isRightBtn && (
            <ChevronRightIcon fontSize="large" className="row__icon" />
          )}
        </div>
      </div>
    </div>
  );
}

export default NewReleases;
