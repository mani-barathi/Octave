import React from "react";
import "../styles/Error404Page.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

function Error404Page() {
  return (
    <div className="errorpage">
      <h1 className="errorpage__mainText"> 404 </h1>
      <h1> UH OH! You're lost. </h1>
      <br />
      <p style={{ maxWidth: "600px" }}>
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </p>
      <br />
      <Link to="/">
        <Button color="default" variant="contained">
          Go To Home
        </Button>
      </Link>
    </div>
  );
}

export default Error404Page;
