import firebase from "firebase"
import { useStateValue } from "../context/StateProvider"
import {
    removeSongAndReturnSessionStorage,
    removeSongSessionStorage
} from "../utils/song-utils"
import { db } from "../firebase"

function useSongFunctions(data, setAnchorEl) {
    const [{ user, playingSong }, dispatch] = useStateValue()

    const playSong = () => {
        removeSongSessionStorage(data)     // removes the song and saves the resultant list to the sessionStorage
        dispatch({
            type: 'SET_NEW_SONG',
            newSong: data
        })
    }

    const playNext = () => {
        // If user is trying to add the current playing song again to the songlist.. simply return
        if (playingSong && data.name === playingSong.name)
            return setAnchorEl(false)

        // removes the song and returns the songList without saving to sessionStorage
        const songs = removeSongAndReturnSessionStorage(data)
        let newSongList
        if (songs.length === 0) {           // songlist is Empty
            sessionStorage.setItem('SONG_LIST', JSON.stringify([data]))
        }
        else if (songs.length >= 1) {       // songlist is not Empty
            newSongList = [data, ...songs]
            sessionStorage.setItem('SONG_LIST', JSON.stringify(newSongList))
        }
        setAnchorEl(false)
    }


    const addToQueue = () => {
        // If user is trying to add the current playing song again to the songlist.. simply return
        if (playingSong && data.name === playingSong.name)
            return setAnchorEl(false)

        // removes the song and returns the songList without saving to sessionStorage
        let songs = removeSongAndReturnSessionStorage(data)
        songs.push(data)
        sessionStorage.setItem('SONG_LIST', JSON.stringify(songs))
        setAnchorEl(false)
    }

    const addToFavourites = () => {
        setAnchorEl(false)
        const { name, url, imageUrl, artist } = data   // destructuring to exclude the createdAt Timestamp from Song obj
        db.collection('favourites').add({
            uid: user.uid,
            addedAt: firebase.firestore.FieldValue.serverTimestamp(),
            name, url, imageUrl, artist
        })
        console.log(`added ${name} to Favorites`)
    }

    const removeFromFavourites = (id) => {
        setAnchorEl(false)
        db.collection('favourites').doc(id).delete()
        console.log('deleted from Favorites')
    }

    return { playSong, playNext, addToQueue, addToFavourites, removeFromFavourites }
}

export default useSongFunctions
