
export function getRandomWelcomeText(usename) {
    const welcomeTexts = [
        `Hey ${usename}, continue listening to your Music`,
        `Hey ${usename}, welcome back`,

    ]
    const randomIndex = Math.floor(Math.random() * welcomeTexts.length)
    return welcomeTexts[randomIndex]
}

// Retrive Recently Listned Songs from localStorage
export function getRecentSongsLocalStorage() {
    const data = JSON.parse(localStorage.getItem("RECENT_SONGS"))
    if (data)
        return data
    else
        return []
}

// save currentSong details to localStorage
export function setRecentSongsLocalStorage(currentSong) {
    let data = getRecentSongsLocalStorage()
    if (data.length === 5)
        data.pop()
    // To remove if the current song already exists in localStorage
    data = data.filter((song) => song.name !== currentSong.name)
    localStorage.setItem('RECENT_SONGS', JSON.stringify([currentSong, ...data]))
}