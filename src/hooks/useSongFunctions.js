import { useStateValue } from "../context/StateProvider"
import {
    setNextSongSessionStorage,
    queueSongSessionStorage,
    removeSongSessionStorage
} from "../utils/song-utils"

function useSongFunctions(data, setAnchorEl) {
    const [, dispatch] = useStateValue()

    const playSong = () => {
        removeSongSessionStorage(data)
        dispatch({
            type: 'SET_NEW_SONG',
            newSong: data
        })
    }

    const playNext = () => {
        setNextSongSessionStorage(data)
        setAnchorEl(false)
    }

    const addToQueue = () => {
        queueSongSessionStorage(data)
        setAnchorEl(false)
    }

    return [playSong, playNext, addToQueue]
}

export default useSongFunctions
