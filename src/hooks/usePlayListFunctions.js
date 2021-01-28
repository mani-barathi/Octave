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

    const deletePlaylist = (playlistId) => {
        return db.collection('playlists').doc(playlistId).delete()
    }

    const getAllPlaylists = () => {
        return db.collection('playlists')
            .where("uid", "==", user.uid)
            .orderBy('createdAt', 'desc')
    }

    const addSongToPlaylist = (playlistId, song) => {
        const { name, url, imageUrl, artist } = song
        const data = {
            playlistId,
            name, url, imageUrl, artist,
            addedAt: firebase.firestore.FieldValue.serverTimestamp(),
        }
        return db.collection('playlistsongs').add(data)
    }

    const deleteSongFromPlaylist = (playlistSongId) => {
        console.log(playlistSongId)
        return db.collection('playlistsongs').doc(playlistSongId).delete()
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

    return {
        createNewPlaylist, deletePlaylist,
        getAllPlaylists,
        getFavouriteSongs, getPlaylistSongs,
        addSongToPlaylist, deleteSongFromPlaylist
    }
}

export default usePlayListFunctions
