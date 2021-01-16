import React from 'react'
import "../css/Song.css"

function Song({ data }) {
    return (
        <div className="song">
            <img src={data?.imageUrl} alt="" className="song__image" />
            <p className="song__name">{data?.name}</p>
            <p className="song__artist">{data?.artist}</p>
        </div>
    )
}

export default Song
