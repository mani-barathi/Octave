import React from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// This is the small Notification popup that appear on the Bottom of the page
function SnackBar({ setSnackBar, snackBar }) {
  const closeSnackBar = () => {
    setSnackBar(null);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(snackBar)} // snackBar will be a message so ,its being converted into a Boolean
      onClose={closeSnackBar}
      autoHideDuration={3000}
      message={snackBar} // Actual Message
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={closeSnackBar}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
}

export default SnackBar;
