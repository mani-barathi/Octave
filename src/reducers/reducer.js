import { addSongtoList } from "../utils/reducer-utils"

export const intialState = {
    user: 'john',
    newSong: null,
    nextSong: null,
    songList: []
}

export const reducer = (state, action) => {
    // console.log('Reducer state', state)
    console.log('Reducer action', action)
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'SET_NEW_SONG':
            return {
                ...state,
                newSong: action.newSong
            }

        case 'SET_NEXT_SONG':
            return {
                ...state,
                nextSong: action.nextSong
            }

        case 'RESET_NEXT_SONG':
            return { ...state, nextSong: null }


        case 'ADD_SONG_TO_SONGLIST':
            return addSongtoList(state, action.song)

        case 'ADD_SONG_TO_QUEUE':
            return addSongtoList(state, action.queueSong)

        default:
            return state
    }
}