import React from 'react'
import "../css/Song.css"
import { useStateValue } from "../context/StateProvider"

function Song({ data }) {
    const [, dispatch] = useStateValue()

    const playSong = () => {
        dispatch({
            type: 'SET_NEW_SONG',
            newSong: data
        })
    }
    return (
        <div className="song" onClick={playSong}>
            <img src={data?.imageUrl} alt="" className="song__image" />
            <p className="song__name">{data?.name}</p>
            <p className="song__artist">{data?.artist}</p>
        </div>
    )
}

export default Song
