import React, { useEffect, useState } from 'react'
import "../css/PlayList.css"
import PlayListSong from "./PlayListSong"
import { useStateValue } from "../context/StateProvider"
import { db } from "../firebase"

function Favourites() {
    const [songs, setSongs] = useState([])
    const [{ user }] = useStateValue()

    useEffect(() => {
        const unsubscribe = db.collection('favourites')
            .where('uid', "==", user.uid)
            .orderBy('addedAt', 'desc')
            .onSnapshot(snapshot => {
                setSongs(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })
        return unsubscribe
    }, [user.uid])

    const removeSong = () => {
        console.log("this is the passed on removeSong()")
    }

    return (
        <div className="playlist">
            <h1 className="playlist__titleText"> Favourites </h1>
            <div className="playlist__container">
                {songs.length > 0 ? (
                    songs.map((song) => <PlayListSong key={song.id} id={song.id} data={song.data}
                        isFavourites removeSong={removeSong} />
                    )
                ) : (
                        <p style={{ marginLeft: "1rem" }}>
                            You haven't added any songs to your Favourites List...Try Adding a song!
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default Favourites
