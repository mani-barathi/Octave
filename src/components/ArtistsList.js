import React, { useEffect, useState, useRef, useCallback } from 'react'
import "../css/row.css"
import Artist from "./Artist"

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import useMoveLeftRight from '../hooks/useMoveLeftRight'
import { db } from "../firebase"

function ArtistsList() {
    const [isLeftBtn, setIsLeftBtn] = useState(false)
    const [isRightBtn, setIsRightBtn] = useState(false)
    const [artists, setArtists] = useState([])
    const rowRef = useRef()
    const [scrollLeft, scrollRight] = useMoveLeftRight(rowRef, setIsLeftBtn, setIsRightBtn)

    useEffect(() => {
        window.addEventListener('resize', toggleButtonOnWindowResize)
        return () => window.removeEventListener('resize', toggleButtonOnWindowResize)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        db.collection('artists').orderBy('createdAt', 'desc').limit(10).get()
            .then(snapshot => {
                setArtists(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))                 // end of map()
                )                       // end of setArtists()
            })
    }, [])


    const toggleButtonOnWindowResize = useCallback(() => {
        if (!rowRef.current) return
        if (rowRef.current.scrollWidth - rowRef.current.offsetWidth > 0) setIsRightBtn(true)
        else setIsRightBtn(false)

        if (rowRef.current.scrollLeft > 300) setIsLeftBtn(true)
        else setIsLeftBtn(false)
    }, [])

    const lastArtistRef = useCallback(() => {
        toggleButtonOnWindowResize()
    }, [toggleButtonOnWindowResize])


    return (
        <div className="row user-select-none">
            { artists.length > 0 &&
                <div className="row__headerText">
                    <h2>Artist </h2>
                    <p>Popular Artists </p>
                </div>
            }

            <div className="row__songsContainer">
                <div className="row__leftButtonDiv" onClick={scrollLeft}>
                    {isLeftBtn &&
                        <ChevronLeftIcon fontSize="large" className="row__icon" />}
                </div>

                <div ref={rowRef} className="row__songs">
                    {artists.map((artist, index) => (
                        (artists.length === index + 1) ? (
                            <div key={artist.id} ref={lastArtistRef}>
                                <Artist key={artist.id} id={artist.id} data={artist.data} />
                            </div>
                        ) : (
                                <Artist key={artist.id} id={artist.id} data={artist.data} />
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

export default ArtistsList

