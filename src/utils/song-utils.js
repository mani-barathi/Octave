export const songList = [{
    name: 'paris',
    artist: 'Chainsmokers',
    url: 'https://data.mymp3app.com/320/the-chainsmokers-paris-lyric.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000241607187-d5elh4-t500x500.jpg',
},
{
    name: 'Bujji',
    artist: 'Anirudh',
    url: 'https://dslink.xyz/Masstamilan.In/Jagame%20Thanthiram/Bujji-Masstamilan.In.mp3',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcgqVN3Iy5Y4XJeXK10n0o4_GZ_YfGE35JtQ&usqp=CAU',
},
{
    name: 'This Feeling',
    artist: 'Chainsmokers',
    url: 'https://data.mymp3app.com/320/the-chainsmokers-this-feeling-ft.-kelsea-ballerini-lyric.mp3',
    imageUrl: 'https://i1.sndcdn.com/artworks-000241607187-d5elh4-t500x500.jpg',
}
]

export function getRandomSong() {
    const randomIndex = Math.floor(Math.random() * songList.length)
    return songList[randomIndex]
}


// Retrive Recently Listned Songs from localStorage
export function getRecentSongsLocalStorage() {
    const songs = JSON.parse(localStorage.getItem("RECENT_SONGS"))
    return (songs) ? songs : []
}

// save currentSong details to localStorage
export function setRecentSongsLocalStorage(currentSong) {
    let songs = getRecentSongsLocalStorage()
    if (songs.length === 5)
        songs.pop()
    // To remove if the current song already exists in localStorage
    songs = songs.filter((song) => song.name !== currentSong.name)
    localStorage.setItem('RECENT_SONGS', JSON.stringify([currentSong, ...songs]))
}


export function getSongSessionStorage() {
    const songs = JSON.parse(sessionStorage.getItem('SONG_LIST'))
    return (songs) ? songs : []
}

export function setSongessionStorage(currentSong) {
    let songs = getSongSessionStorage()
    songs = songs.filter((song) => song.name !== currentSong.name)
    songs.push(currentSong)
    sessionStorage.setItem('SONG_LIST', JSON.stringify(songs))
}