# Octave
A Music Streaming Web App developed with ReactJs🚀 and Firebase🔥
<br /><br />
**Click [Here](https://octave-music.web.app/) to view the Live Website**

## Technology Used
[<img title="React" align="left" alt="React" width="42px" height="42px" src="https://sujanbyanjankar.com.np/wp-content/uploads/2019/01/React.js_logo-512.png" />](https://reactjs.org/)
[<img title="Redux" align="left" alt="Redux" width="38px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/redux/redux.png" />](https://redux.js.org/)
[<img title="Firebase" align="left" alt="Firebase" width="45px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/firebase/firebase.png" />](https://firebase.google.com/)
[<img title="Material-UI" align="left" alt="Material-UI" width="45px" src="https://avatars.githubusercontent.com/u/33663932?s=200&v=4" />](https://material-ui.com/)
[<img title="React-Router-Dom" align="left" alt="React-Router-Dom" width="45px" src="https://camo.githubusercontent.com/bf32d0a71c170dbdb203c201579564f2cd7fc54a24720faad61af12c9605c6b5/68747470733a2f2f7265616374747261696e696e672e636f6d2f72656163742d726f757465722f616e64726f69642d6368726f6d652d313434783134342e706e67" />](https://reactrouter.com/web/guides/quick-start)

<br /><br />

## 📸 Design Preview
<img src="./public/preview.gif" />

## Functionalities

- **SongList (Current Playlist)** <br/>
  User can add and remove Songs to the SongList. SongList is Implemented using Browser's **Session Storage** for saving the Songlist temporarily for the Current Session.

- **Favourites and Playlist** <br/>
  User can add songs to their Favourites List or can create their own Playlist.

- **Recently Played Songs** <br/>
  The Recently Played Songs are stored in Local Storage.

- **Media Session API** <br/>
  Media Session allows the user to Control the playing song using Keyboard buttons. Essentially allowing user to know what song is playing and to control it, without needing to open the Webpage. Check `src/Player.js` Component for the code Implementation. (Click [Here](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) to see the Docs)

## 🛠 Setup (development)

- Clone the repo, and cd into it
- Install all the dependencies from package.json
- Create a firebase project and enable **Firestore** database, **Google login** and **Email-Password** for Authentication
- Create a file **src/firebase.js** and place firebase project Keys inside as shown in [src/firebase.example.js](https://github.com/mani-barathi/Octave/blob/master/src/firebase.example.js)
- Run app by typing `npm start` in command line
- Make sure to read the **Note** section below to know about setting up **Indexes in firestore**

## 📝 Note

You will have to create an **Index** in firestore, as **PlayListPage**, **LibraryPage** uses Nested Queries to fetch data from Firestore. While Developing in localhost there will be an error in Browser console stating you to create an Index in Firestore. That Error will provide a link to create an Index in Firestore , you can click on the link and create an Index. (This Error will be solved after that particular Index is created)
