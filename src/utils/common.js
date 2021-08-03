export const handleError = (error) => {
  console.log(error);
  // alert(error);
};

export function isValidURL(string) {
  try {
    return Boolean(new URL(string));
  } catch (e) {
    return false;
  }
}

export function getRandomWelcomeText(usename) {
  const welcomeTexts = [
    `Hey ${usename}, continue listening to your Music`,
    `Hey ${usename}, welcome back`,
  ];
  const randomIndex = Math.floor(Math.random() * welcomeTexts.length);
  return welcomeTexts[randomIndex];
}

export function capitalize(string) {
  let word = string.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function createNamesArray(name) {
  let names = [];
  let previous = "";

  for (let char of name) {
    names.push(`${previous}${char}`);
    previous += char;
  }
  return names;
}

export function capitalizeAllWords(name) {
  let words = name.split(" ");
  let capitalizedword = "";

  for (let word of words) {
    let capWord = capitalize(word);
    capitalizedword += ` ${capWord}`;
  }

  capitalizedword = capitalizedword.trim();
  return capitalizedword;
}

export function createNamesArrayWithCaptitalizedWords(name) {
  let capitalizedword = capitalizeAllWords(name);
  let names = createNamesArray(capitalizedword);
  return names;
}

const playlistImages = [
  "https://firebasestorage.googleapis.com/v0/b/music-streaming-app-4a392.appspot.com/o/images%2Fno-music-cover.png?alt=media&token=c331e7e9-fbb6-41bd-8b63-706bd70429c7",
  "https://www.soundlaunch.com/cover_photos/default_cover.jpg",
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/abstract-music-cd-cover-art-design-template-e43d2f90de58fd720f97f7e8068bb4f8_screen.jpg?ts=1570368591",
  "https://upload.wikimedia.org/wikipedia/en/c/c9/Zedd-True-Colors.png",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnJL-5T0rDIVexjW4ndJko_z_YnBtFmTRauQ&usqp=CAU",
];

export function getRandomPlaylistImage() {
  const randomIndex = Math.floor(Math.random() * playlistImages.length);
  return playlistImages[randomIndex];
}
