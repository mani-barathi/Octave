export const intialState = {
    user: 'john',
    newSong: null,
}

export const reducer = (state, action) => {
    console.log('state', state)
    console.log('action', action)
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
        default:
            return state
    }
}