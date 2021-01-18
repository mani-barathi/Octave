
export function getRandomWelcomeText(usename) {
    const welcomeTexts = [
        `Hey ${usename}, continue listening to your Music`,
        `Hey ${usename}, welcome back`,

    ]
    const randomIndex = Math.floor(Math.random() * welcomeTexts.length)
    return welcomeTexts[randomIndex]
}