import React, { useState, useEffect } from 'react'
import "../css/Library.css"
import RecentlyListened from "./RecentlyListened"
import CreatePlaylistModal from "./CreatePlaylistModal"

import { useHistory } from "react-router-dom"

import { useStateValue } from "../context/StateProvider"
import usePlayListFunctions from "../hooks/usePlayListFunctions"

function Library() {
    const [isOpen, setIsOpen] = useState(false)
    const [playlists, setPlaylists] = useState([])
    const [, dispatch] = useStateValue()
    const { getAllPlaylists } = usePlayListFunctions()
    const history = useHistory()

    useEffect(() => {
        const unsubscribe = getAllPlaylists()
            .onSnapshot(snapshot => {
                setPlaylists(
                    snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))
                )
            })
        return unsubscribe
        //eslint-disable-next-line
    }, [])

    const goToFavourities = () => {
        const fav = { name: "favorites", imageUrl: "https://prexoo.com/images/no-music-cover.png" }
        dispatch({ type: 'SET_ARTIST', artist: fav })
        history.push('/playlists/favorites')
    }

    const goToPlaylistPage = (id, { name, imageUrl }) => {
        const playlistData = { name, imageUrl }
        dispatch({ type: 'SET_ARTIST', artist: playlistData })
        history.push(`/playlists/${id}`)
    }

    return (
        <div className="library">
            <div className="library__header">
                <h1 className="library__titleText">My Library</h1>
            </div>

            <div className="library__recentlyListened">
                <RecentlyListened />
            </div>

            <h2 className="library__playlistTitleText"> Playlists</h2>
            <h4 className="library__playlistSubText"> Your Customized Playlists</h4>
            <div className="library__playlists">

                <div key="createIcon" className="library__playlist library__playlistCreate" onClick={() => setIsOpen(true)}>
                    <img src="https://www.gstatic.com/youtube/media/ytm/images/pbg/create-playlist-@210.png" alt="" className="library__playlistFavouritesImg" />
                    <p className="library__playlistName">Create Playlist</p>
                </div>

                <div key="fav" className="library__playlist" onClick={goToFavourities}>
                    <img src="https://prexoo.com/images/no-music-cover.png" alt="" className="library__playlistFavouritesImg" />
                    <p className="library__playlistName">Favourites</p>
                </div>

                {playlists.map(playlist =>
                    <div key={playlist.id} onClick={() => goToPlaylistPage(playlist.id, playlist.data)} className="library__playlist">
                        <img src={playlist.data.imageUrl} alt="" className="library__playlistFavouritesImg" />
                        <p className="library__playlistName">{playlist.data.name}</p>
                    </div>
                )}
            </div>

            <CreatePlaylistModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
    )
}

export default Library
