import { Typography, CircularProgress } from "@material-ui/core";

function Spinner({ showText = false }) {
  return (
    <div className="login user-select-none">
      {showText && (
        <Typography variant="h1" color="secondary" align="center">
          Octave
        </Typography>
      )}
      <CircularProgress color="secondary" />
    </div>
  );
}

export default Spinner;
