import React, { useState, useEffect } from 'react'
import "../css/ArtistPage.css"
import PlaylistSong from "./PlayListSong"

import { useHistory } from "react-router-dom"
import { Typography } from "@material-ui/core"

import { db } from "../firebase"
import { useStateValue } from '../context/StateProvider'

function ArtistPage() {
    const history = useHistory()
    const [{ artist }] = useStateValue()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        if (!artist)
            history.replace('/')
    }, [history, artist])

    useEffect(() => {
        if (!artist) return
        db.collection('songs')
            .where('artist', ">=", artist.name)
            .where('artist', '<=', artist.name + '\uf8ff')
            .get()
            .then((snapshot) => {
                setSongs(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })
    }, [artist])

    return (
        <div className="artistpage">

            <div className="artistpage__header">
                <div className="artistpage__headerInfo">
                    <img src={artist.imageUrl} alt="" className="artistpage__image" />

                    <div className="artistpage__headerInfoText">
                        <Typography variant="h4">
                            {artist?.name}
                        </Typography>

                        <Typography variant="subtitle2">
                            {artist?.description}
                        </Typography>
                    </div>
                </div>

                <br />
                <Typography variant="h6">
                    {songs.length > 0 && 'Songs'}
                </Typography>
            </div>

            <div className="artistpage__songlist">
                {
                    songs.map(song =>
                        <PlaylistSong key={song.id} id={song.id} data={song.data}
                            isArtistPage />
                    )
                }
            </div>

        </div>
    )
}

export default ArtistPage
