# Music Streaming App

A Web based Music Streaming App developed using ReactJs and Firebase

**Click [Here](https://music-streaming-app-4a392.web.app/) to view the Live Website**

### Design Preview

<img src="./public/preview.gif" />

## Technology Used

- **React** (FrontEnd)
  - **Material-UI** - UI Library
  - **react-router-dom** - Routing System
  - **Redux** - State management
- **Firebase** - Baas (Backend as a Service)
  - **Firestore** - NoSQL database
  - **Authentication**
    - SignIn & SignUp functionality using Email and Password verification
    - Sign In With Google Account
  - **Storage** - Cloud Storage for uploading and serving Songs
  - **Hosting**

## Functionalities

### SongList (Current Playlist)

User can add and remove Songs to the SongList. SongList is Implemented using Browser's **Session Storage** for saving the Songlist temporarily for the Current Session.

### Favourites

User can add a song to their Favourites List, which is saved to Firestore Database.

### Recently Played Songs

The Recently Played Songs are stored in Local Storage.

### Media Session API

Media Session allows the user to Control the playing song using Keyboard buttons. Essentially allowing user to know what song is playing and to control it, without needing to open the Webpage. Check `src/Player.js` Component for the code Implementation. (Click [Here](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) to see the Docs)

## Custom Hooks

Created a few Custom Hooks to keep the Complex functionality outside the Components. (check `src/hooks/` folder)

- **useAuth** - This provides all the Functions related to Authentication (SignUp, Login, SignOut ,Update Profile, Reset Password, Sign in with Google).
- **useSongFunctions** - This provides all the Functions related to Songs (Playing a Song, Play a Particular Song as the Next song, Adding a Song to Queue, Adding a Song to Favourites, Removing a Song from Favourities).
- **userPlaylistFunction** - This holds function which creates, deletes playlists, also add and remove songs ,get all songs from a playlist.

## Helper Functions

Files which has Helper Functions are kept in `src/utils/`.
These files include

- functions which calculates current Time, durations.
- functions to fetch and save data to Local Storage and Session Storage.

## To run this on Local machine

- Clone the repo, and cd into it
- Install all the dependcies from package.json
- Create a firebase project place project Keys inside **src/firebase.js**
- Enable Email & Password and Google Authentication as Sign-In methods in firebase Console
- Run app by typing `npm start`in command line

### Note

You will have to create an **Index** in firestore, as **PlayListPage**, **Library** Component uses Nested Queries to fetch data from Firestore. While Developing the Favourites Component there will be an error in console stating you to create an Index in Firestore. That Error will provide a link to create an Index in Firestore , you can click on the link and create an Index. (This Error will be solved after that particular Index is created)
