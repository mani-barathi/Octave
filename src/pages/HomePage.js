import React, { useState } from "react";
import "../styles/Home.css";
import { useSelector } from "react-redux";
import NewReleases from "../components/NewReleases";
import ArtistsList from "../components/ArtistsList";
import AllSongs from "../components/AllSongs";

import { Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { getRandomWelcomeText } from "../utils/common";

function Home() {
  const user = useSelector((state) => state.user);
  const [welcomeText] = useState(
    () =>
      user.displayName
        ? getRandomWelcomeText(user.displayName)
        : `Hey there, thanks for Choosing Octave`,
    [user.displayName]
  );

  return (
    <div className="home">
      <div className="user-select-none">
        <Typography variant="h4" display="inline">
          {welcomeText}{" "}
        </Typography>
        &nbsp;
        <FavoriteBorderIcon className="home__welcomeTextIcon" />
      </div>

      <NewReleases />

      <ArtistsList />

      <AllSongs />
    </div>
  );
}

export default Home;
