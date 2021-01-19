import React from 'react'
import "../css/Home.css"
import RecentlyListened from "./RecentlyListened"
import NewReleases from "./NewReleases"
// import Admin from "./Admin"

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { getRandomWelcomeText } from "../utils/utils"
import { useStateValue } from "../context/StateProvider"

function Home() {
    const [{ user }] = useStateValue()
    const welcomeText = getRandomWelcomeText(user)
    return (
        <div className="home">
            <h1 className="home__welcomeText">
                <span>{welcomeText}</span> &nbsp;
                <FavoriteBorderIcon className="home__welcomeTextIcon" />
            </h1>

            <RecentlyListened />
            <RecentlyListened />
            <NewReleases />
            {/* Randomiszed Suggestion  */}

            {/* <Admin /> */}

        </div>
    )
}

export default Home
