// import  from 'react'
import { useStateValue } from "../context/StateProvider"
import { getRandomPlaylistImage } from "../utils/utils"
import { db } from "../firebase"
import firebase from "firebase"

function usePlayListFunctions() {
    const [{ user }] = useStateValue()

    const createNewPlaylist = (playlistName) => {
        return db.collection('playlists').add({
            uid: user.uid,
            name: playlistName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            imageUrl: getRandomPlaylistImage()
        })
    }

    const getAllPlaylists = () => {
        return db.collection('playlists')
            .where("uid", "==", user.uid)
            .orderBy('createdAt', 'desc')
    }

    const getFavouriteSongs = () => {
        return db.collection('favorites')
            .where('uid', "==", user.uid)
            .orderBy('addedAt', 'desc')
    }

    const getPlaylistSongs = (playlistId) => {
        return db.collection('playlistsongs')
            .where('playlistId', "==", playlistId)
            .orderBy('addedAt', 'desc')
    }

    return { createNewPlaylist, getAllPlaylists, getFavouriteSongs, getPlaylistSongs }
}

export default usePlayListFunctions
