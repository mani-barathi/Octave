import React from "react";
import "../css/Home.css";
import NewReleases from "../components/NewReleases";
import ArtistsList from "../components/ArtistsList";

import { Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { getRandomWelcomeText } from "../utils/utils";
import { useStateValue } from "../context/StateProvider";

function Home() {
  const [{ user }] = useStateValue();
  const welcomeText = user.displayName
    ? getRandomWelcomeText(user.displayName)
    : `Hey there, thanks for Choosing Octave`;
  return (
    <div className="home">
      <div className="user-select-none">
        <Typography variant="h4" display="inline">
          {" "}
          {welcomeText}
        </Typography>{" "}
        &nbsp;
        <FavoriteBorderIcon className="home__welcomeTextIcon" />
      </div>

      <NewReleases />

      <ArtistsList />
    </div>
  );
}

export default Home;
