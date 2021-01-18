import { useStateValue } from "../context/StateProvider"

function useSongFunctions(data, setAnchorEl) {
    const [, dispatch] = useStateValue()

    const playSong = () => {
        dispatch({
            type: 'SET_NEW_SONG',
            newSong: data
        })
    }

    const playNext = () => {
        dispatch({
            type: 'SET_NEXT_SONG',
            nextSong: data
        })
        setAnchorEl(false)
    }

    const addToQueue = () => {
        console.log("This is addToQueue()")
        setAnchorEl(false)
    }

    return [playSong, playNext, addToQueue]
}

export default useSongFunctions
