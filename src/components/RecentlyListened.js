import React, { useEffect, useState } from "react";
import "../css/row.css";
import Song from "./Song";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import useMoveLeftRight from "../hooks/useMoveLeftRight";
import { getRecentSongsLocalStorage } from "../utils/song-utils";

// Row of songs present inside Library
function RecentlyListened() {
  const [recentPlayedSongs, setRecentPlayedSongs] = useState([]);
  const { leftBtn, rightBtn, scrollLeft, scrollRight, lastNodeRef, rowRef } =
    useMoveLeftRight();

  useEffect(() => {
    const recentSongs = getRecentSongsLocalStorage();
    setRecentPlayedSongs(recentSongs);
  }, []);

  if (recentPlayedSongs.length > 0) {
    return (
      <div className="row user-select-none">
        <div className="row__headerText">
          <h2>Recently Activity</h2>
          <h4 style={{ fontWeight: "500" }}>Your Daily Music </h4>
        </div>

        <div className="row__songsContainer">
          <div className="row__leftButtonDiv" onClick={scrollLeft}>
            {leftBtn && (
              <ChevronLeftIcon fontSize="large" className="row__icon" />
            )}
          </div>

          <div ref={rowRef} className="row__songs">
            {recentPlayedSongs.map((song, index) =>
              recentPlayedSongs.length === index + 1 ? (
                <div key={index} ref={lastNodeRef}>
                  {" "}
                  <Song key={index} data={song} />{" "}
                </div>
              ) : (
                <Song key={index} data={song} />
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
  } else {
    return null;
  }
}
export default RecentlyListened;
