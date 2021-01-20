import React from 'react'
import "../css/Home.css"
import RecentlyListened from "./RecentlyListened"
// import NewReleases from "./NewReleases"
// import Admin from "./Admin"

import { Typography } from "@material-ui/core"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { getRandomWelcomeText } from "../utils/utils"
import { useStateValue } from "../context/StateProvider"

function Home() {
    const [{ user }] = useStateValue()
    const welcomeText = getRandomWelcomeText(user)
    return (
        <div className="home">
            <div className="user-select-none">
                <Typography variant="h4" display="inline"> {welcomeText}</Typography>   &nbsp;
            <FavoriteBorderIcon className="home__welcomeTextIcon" />
            </div>

            <RecentlyListened />
            {/* <NewReleases /> */}
            {/* Randomiszed Suggestion  */}

            {/* <Admin /> */}

        </div>
    )
}

export default Home
