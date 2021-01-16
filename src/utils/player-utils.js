
// calculate Total Duration of a Song and returns in a string format mm:ss 
export function calculateDurationTime(duration) {
    let durationMinute = Math.floor(duration / 60);            // minutes
    let durationSeconds = Math.floor((duration % 60));         // Seconds
    if (durationSeconds < 10)
        durationSeconds = `0${durationSeconds}`;               // to make 1 as 01
    return `${durationMinute}:${durationSeconds}`
}


// calculate Current Time of a Song and returns in a string format mm:ss 
export function calculateCurrentTime(currentTime) {
    let currentMinute = Math.floor(currentTime / 60);          // minutes
    let currentSeconds = Math.floor((currentTime % 60));       // seconds
    if (currentSeconds < 10)                                   // to make 1 as 01
        currentSeconds = `0${currentSeconds}`;
    return `${currentMinute}:${currentSeconds}`
}

const songList = [{
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
