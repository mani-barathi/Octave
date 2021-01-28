import React, { useEffect, useState } from 'react'
import "../css/PlayList.css"
import PlayListSong from "./PlayListSong"
import { useParams, useHistory } from "react-router-dom"
import { useStateValue } from "../context/StateProvider"

import usePlayListFunctions from "../hooks/usePlayListFunctions"

function PlayListPage() {
    const [songs, setSongs] = useState([])
    const { id } = useParams()
    const history = useHistory()
    const [{ artist }] = useStateValue()
    const { getFavouriteSongs, getPlaylistSongs } = usePlayListFunctions()

    useEffect(() => {
        if (!artist) history.replace('/')

        const getSongs = (id === 'favorites') ? getFavouriteSongs : getPlaylistSongs

        let unsubscribe = getSongs(id)
            .onSnapshot(snapshot => {
                setSongs(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })

        return unsubscribe
        // eslint-disable-next-line
    }, [id])


    return (
        <div className="playlist">
            <div className="playlist__header">
                <img src={artist?.imageUrl} alt="" className="playlist__image" />
                <h1 className="playlist__titleText"> {artist?.name} </h1>
            </div>
            <div className="playlist__container">
                {songs.length > 0 ? (
                    songs.map((song) => <PlayListSong key={song.id} id={song.id} data={song.data}
                        isPlaylistSong collectionName={id} />
                    )
                ) : (
                        <p style={{ marginLeft: "1rem" }}>
                            You haven't added any songs this Playlist...Try Adding a song!
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default PlayListPage
