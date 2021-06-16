import React from "react";

import PlayCircleFilledWhiteOutlinedIcon from "@material-ui/icons/PlayCircleFilledWhiteOutlined";
import PauseCircleOutlineRoundedIcon from "@material-ui/icons/PauseCircleOutlineRounded";
import SkipPreviousRoundedIcon from "@material-ui/icons/SkipPreviousRounded";
import SkipNextRoundedIcon from "@material-ui/icons/SkipNextRounded";
import { IconButton, CircularProgress } from "@material-ui/core";

// Play/Pause, previous , next Buttons
function PlayerControls({
  playPreviousSong,
  playPauseSong,
  playing,
  playNextSong,
}) {
  return (
    <div className="playercontrols">
      <IconButton
        onClick={playPreviousSong}
        className="player__iconButton player__iconPrevBtn"
      >
        <SkipPreviousRoundedIcon />
      </IconButton>

      <IconButton
        onClick={() => {
          if (playing !== -1) playPauseSong();
        }}
        className="player__iconButton player__mainBtn"
      >
        {playing === 1 ? (
          <PauseCircleOutlineRoundedIcon />
        ) : playing === 0 ? (
          <PlayCircleFilledWhiteOutlinedIcon />
        ) : (
          <CircularProgress size={20} color="inherit" />
        )}
      </IconButton>

      <IconButton onClick={playNextSong} className="player__iconButton">
        <SkipNextRoundedIcon />
      </IconButton>
    </div>
  );
}

export default PlayerControls;
