export function addSongtoList(state, queueSong) {
    const newSongList = [...state.songList, queueSong]

    console.log('this is addSongtoList() ', newSongList)

    return { ...state, songList: newSongList }
}

export function setNextSong(state, nextSong) {
    let newSongList
    if (state.songList.length <= 1)
        newSongList = [...state.songList, nextSong]
    else {
        let [firstSong, ...remainingSong] = state.songList
        newSongList = [firstSong, nextSong, ...remainingSong]
    }
    console.log('this is setNextSong() ', newSongList)

    return { ...state, nextSong: nextSong, songList: newSongList }
}

export function setNewSong(state, newSong) {
    if (newSong === state.songList[state.songList.length - 1]) {
        console.log('same song')
        return state
    }

    let newSongList
    if (state.songList.length <= 1)
        newSongList = [...state.songList, newSong]
    else {
        let [firstSong, ...remainingSong] = state.songList
        newSongList = [firstSong, newSong, ...remainingSong]
    }
    console.log('this is setNewSong() ', newSongList)

    return { ...state, newSong: newSong, songList: newSongList }
}