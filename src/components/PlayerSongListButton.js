import React from "react";
import { useDispatch } from "react-redux";
import { IconButton, Tooltip } from "@material-ui/core";
import QueueMusicIcon from "@material-ui/icons/QueueMusic";

import { toggleIsSongListOpen } from "../actions/currentSessionActions";

// Toggle SongLIst Button, present inside Player
function ToggleSongListBtn() {
  const dispatch = useDispatch();

  return (
    <Tooltip title="Show SongList" arrow placement="left">
      <IconButton
        className="player__iconButton player__mainBtn"
        onClick={() => {
          dispatch(toggleIsSongListOpen());
        }}
      >
        <QueueMusicIcon />
      </IconButton>
    </Tooltip>
  );
}

export default ToggleSongListBtn;
