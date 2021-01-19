export const intialState = {
    user: 'john',
    newSong: null,
    playingSong: null,
    isSongListOpen: false
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

        case 'SET_PLAYING_SONG':
            return {
                ...state,
                playingSong: action.playingSong
            }

        case 'TOGGLE_IS_SONGLIST_OPEN':
            return {
                ...state,
                isSongListOpen: !state.isSongListOpen
            }

        default:
            return state
    }
}