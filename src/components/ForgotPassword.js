import React, { useRef, useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { resetPassword } from "../api/auth";

function ForgotPassword({ open, setOpen }) {
  const inputRef = useRef();
  const [message, setMessage] = useState(
    `Please Enter Your Email, we'll send you a Password Reset Email`
  );
  const [error, setError] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setError("");
  }, [open]);

  const handleResetEmail = async () => {
    const email = inputRef.current.value;
    if (!email) return setError(`Please Enter a valid Email`);

    try {
      await resetPassword(inputRef.current.value);
      setError(null);
      setMessage(
        `An Email is sent to ${email}, which contains further Intructions for Password Reset.!`
      );
      setIsDone(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle align="center" variant="subtitle1">
          Reset Password
        </DialogTitle>

        <DialogContent>
          <Typography align="center" color="textPrimary">
            {message}
          </Typography>

          {error && (
            <Typography align="center" color="error">
              {error}
            </Typography>
          )}

          {!isDone && (
            <center>
              <input
                type="email"
                className="forgotpassword__input login__formInput"
                placeholder="Enter your Email"
                ref={inputRef}
              />
            </center>
          )}
        </DialogContent>

        <DialogActions>
          {!isDone && (
            <Button
              onClick={handleResetEmail}
              color="primary"
              variant="contained"
            >
              Send
            </Button>
          )}

          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            variant="contained"
          >
            {isDone ? `Okie` : "Cancel"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ForgotPassword;
