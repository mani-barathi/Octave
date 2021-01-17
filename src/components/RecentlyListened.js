import React, { useEffect, useState, useRef, useCallback } from 'react'
import "../css/row.css"

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import Song from "./Song"
import { getRecentSongsLocalStorage } from "../utils/home-utils"



function RecentlyListened() {
    const [isLeftBtn, setIsLeftBtn] = useState(false)
    const [isRightBtn, setIsRightBtn] = useState(false)
    const [recentPlayedSongs, setRecentPlayedSongs] = useState([])
    const rowRef = useRef()

    useEffect(() => {
        const recentSongs = getRecentSongsLocalStorage()
        setRecentPlayedSongs(recentSongs)
    }, [])

    useEffect(() => {
        window.addEventListener('resize', toggleButtonOnWindowResize)
        return () => window.removeEventListener('resize', toggleButtonOnWindowResize)
    }, [])

    const toggleButtonOnWindowResize = () => {
        if (!rowRef.current) return
        if (rowRef.current.scrollWidth - rowRef.current.offsetWidth > 0) setIsRightBtn(true)
        else setIsRightBtn(false)

        if (rowRef.current.scrollLeft > 300) setIsLeftBtn(true)
        else setIsLeftBtn(false)
    }

    const lastSongRef = useCallback(() => {
        toggleButtonOnWindowResize()
    }, [])

    const scrollLeft = () => {
        rowRef.current.scrollLeft -= 300
        const hasMoreLeft = rowRef.current.scrollLeft > 300
        if (!hasMoreLeft)
            setIsLeftBtn(false)
        setIsRightBtn(true)
    }
    const scrollRight = () => {
        const offsetWidth = rowRef.current.offsetWidth
        rowRef.current.scrollLeft += 300
        const hasMoreRight = (rowRef.current.scrollWidth - (offsetWidth + rowRef.current.scrollLeft)) > 300
        if (!hasMoreRight)
            setIsRightBtn(false)
        setIsLeftBtn(true)
    }
    return (
        (recentPlayedSongs.length > 0) ? (
            <div className="row">
                <h2>Listen Again </h2>
                <p>Your evening music </p>

                <div className="row__songsContainer">
                    <div className="row__leftButtonDiv" onClick={scrollLeft}>
                        {isLeftBtn &&
                            <ChevronLeftIcon fontSize="large" className="row__icon" />}
                    </div>

                    <div ref={rowRef} className="row__songs">
                        {recentPlayedSongs.map((song, index) => (
                            (recentPlayedSongs.length === index + 1) ? (
                                <div key={index} ref={lastSongRef}> <Song key={index} data={song} /> </div>
                            ) : (
                                    <Song key={index} data={song} />
                                )
                        )
                        )}
                    </div>

                    <div className="row__rightButtonDiv" onClick={scrollRight}>
                        {isRightBtn &&
                            <ChevronRightIcon fontSize="large" className="row__icon" />}
                    </div>
                </div>
            </div>
        ) : (
                <> </>
            )
    )


}

export default RecentlyListened
