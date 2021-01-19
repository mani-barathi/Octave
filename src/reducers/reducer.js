export const intialState = {
    user: 'john',
    newSong: null,
    nextSong: null,
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

        case 'SET_NEXT_SONG':
            return {
                ...state,
                nextSong: action.nextSong
            }

        default:
            return state
    }
}