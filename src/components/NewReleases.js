import React, { useEffect, useState, useRef, useCallback } from 'react'
import "../css/row.css"
import Song from "./Song"

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import { db } from "../firebase"

function NewReleases() {
    const [isLeftBtn, setIsLeftBtn] = useState(false)
    const [isRightBtn, setIsRightBtn] = useState(false)
    const [newReleases, setNewReleases] = useState([])
    const rowRef = useRef()

    useEffect(() => {
        db.collection('songs').orderBy('createdAt', 'desc').limit(10).get()
            .then(snapshot => {
                setNewReleases(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))                 // end of map()
                )                       // end of setNewReleases()
            })
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
        <div className="row">
            <h2>New Releases </h2>
            <p>Try Out These New Tracks </p>

            <div className="row__songsContainer">
                <div className="row__leftButtonDiv" onClick={scrollLeft}>
                    {isLeftBtn &&
                        <ChevronLeftIcon fontSize="large" className="row__icon" />}
                </div>

                <div ref={rowRef} className="row__songs">
                    {newReleases.map((song, index) => (
                        (newReleases.length === index + 1) ? (
                            <div key={song.id} ref={lastSongRef}> <Song key={song.id} data={song.data} /> </div>
                        ) : (
                                <Song key={song.id} data={song.data} />
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
    )
}

export default NewReleases
