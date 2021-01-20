import { useStateValue } from "../context/StateProvider"
import {
    setNextSongSessionStorage,
    queueSongSessionStorage,
    removeSongSessionStorage
} from "../utils/song-utils"

function useSongFunctions(data, setAnchorEl) {
    const [{ playingSong }, dispatch] = useStateValue()

    const playSong = () => {
        removeSongSessionStorage(data)
        dispatch({
            type: 'SET_NEW_SONG',
            newSong: data
        })
    }

    const playNext = () => {
        if (playingSong && data.name !== playingSong.name)
            setNextSongSessionStorage(data)
        setAnchorEl(false)
    }

    const addToQueue = () => {
        if (playingSong && data.name !== playingSong.name)
            queueSongSessionStorage(data)
        setAnchorEl(false)
    }

    return [playSong, playNext, addToQueue]
}

export default useSongFunctions
