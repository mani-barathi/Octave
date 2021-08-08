import React, { useState } from "react";
import "../styles/row.css";
import Song from "./Song";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import useMoveLeftRight from "../hooks/useMoveLeftRight";
import { getRecentSongsLocalStorage } from "../utils/song-utils";

function RecentlyListened() {
  const [recentPlayedSongs] = useState(getRecentSongsLocalStorage);
  const { leftBtn, rightBtn, scrollLeft, scrollRight, lastNodeRef, rowRef } =
    useMoveLeftRight();

  if (recentPlayedSongs.length <= 0) return null;

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
                <Song key={index} data={song} />
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
}
export default RecentlyListened;
