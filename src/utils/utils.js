
export function getRandomWelcomeText(usename) {
    const welcomeTexts = [
        `Hey ${usename}, continue listening to your Music`,
        `Hey ${usename}, welcome back`,

    ]
    const randomIndex = Math.floor(Math.random() * welcomeTexts.length)
    return welcomeTexts[randomIndex]
}

export function capitalize(string) {
    let word = string.toLowerCase()
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export function createNamesArray(name) {
    let names = []
    let previous = ''

    for (let char of name) {
        names.push(`${previous}${char}`)
        previous += char
    }
    return names
}

export function capitalizeAllWords(name) {
    let words = name.split(' ')
    let capitalizedword = ''

    for (let word of words) {
        let capWord = capitalize(word)
        capitalizedword += ` ${capWord}`
    }

    capitalizedword = capitalizedword.trim()
    return capitalizedword
}

export function createNamesArrayWithCaptitalizedWords(name) {
    let capitalizedword = capitalizeAllWords(name)
    let names = createNamesArray(capitalizedword)
    return names
}