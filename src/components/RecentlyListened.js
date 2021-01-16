import React, { useEffect, useState, useRef } from 'react'
import "../css/row.css"

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
// import { IconButton } from "@material-ui/core"

import Song from "./Song"
import { songList } from "../utils/player-utils"

function RecentlyListened() {
    const [isLeftBtn, setIsLeftBtn] = useState(false)
    const [isRightBtn, setIsRightBtn] = useState(true)
    const [recentPlayedSongs, setRecentPlayedSongs] = useState([])
    const rowRef = useRef()

    useEffect(() => {
        setRecentPlayedSongs([...songList, ...songList, ...songList])
    }, [])

    const scrollLeft = () => {
        const offsetWidth = rowRef.current.offsetWidth
        const scrollableWidth = rowRef.current.scrollWidth - rowRef.current.scrollLeft
        if (scrollableWidth > 0) {
            rowRef.current.scrollLeft -= 300
            const isAvailable = offsetWidth < (rowRef.current.scrollWidth + rowRef.current.scrollLeft)
            if (!isAvailable)
                setIsLeftBtn(false)
            setIsRightBtn(true)
        } else
            console.log('no')
    }
    const scrollRight = () => {
        const offsetWidth = rowRef.current.offsetWidth
        const scrollableWidth = rowRef.current.scrollWidth - rowRef.current.scrollLeft
        if (scrollableWidth > 0) {
            rowRef.current.scrollLeft += 300
            const isAvailable = (offsetWidth + rowRef.current.scrollLeft) < rowRef.current.scrollWidth
            if (!isAvailable)
                setIsRightBtn(false)
            setIsLeftBtn(true)
        } else
            console.log('no')
        // document.createElement('div').scrollLeft 
    }

    return (
        <div className="row">
            <h2>Listen Again </h2>
            <p>Your evening music </p>

            <div className="row__songsContainer">
                <div className="row__leftButtonDiv" onClick={scrollLeft}>
                    {isLeftBtn &&
                        <ChevronLeftIcon fontSize="large" className="row__icon" />}
                </div>

                <div ref={rowRef} className="row__songs">
                    {recentPlayedSongs.map((song, index) =>
                        <Song key={index} data={song} />
                    )}
                </div>


                <div className="row__rightButtonDiv" onClick={scrollRight}>
                    {isRightBtn &&
                        <ChevronRightIcon fontSize="large" className="row__icon" />}
                </div>
            </div>
        </div>
    )
}

export default RecentlyListened
