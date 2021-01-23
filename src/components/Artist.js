import React from 'react'
import "../css/Artist.css"
import { useHistory } from "react-router-dom"

import { useStateValue } from "../context/StateProvider"

function Artist({ id, data }) {
    const history = useHistory()
    const [, dispatch] = useStateValue()

    const goToArtistPage = () => {
        dispatch({
            type: 'SET_ARTIST',
            artist: data
        })
        history.push(`/artist/${id}`)
    }

    return (
        <div className="artist" onClick={goToArtistPage}>
            <img src={data.imageUrl} alt="" className="artist__image" />
            <p className="artist__name"> {data.name} </p>
        </div>
    )
}

export default Artist
