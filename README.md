# Music Streaming App
Developing a Web based Music Streaming App using ReactJs and Firebase

**Click [Here](https://music-streaming-app-4a392.web.app/) to view the Demo!**

### Currenly Working on 👇 
- [ ] Creating and Editing custom Playlists
- [x] ~Admin Page, where users can add New Songs to DB~
- [x] ~Search based on Song and Artist~
- [x] ~Listing Songs based on Artist~
- [x] ~Adding and Removing song from Favourites~

### Design Preview
<img src="https://github.com/mani-barathi/Music-Streaming-App/blob/master/public/preview.JPG" />

## Technology Used
* **React** (FrontEnd)
    * **Material-UI** - For Icons and prebuilt Components (**package**)
    * **react-router-dom** - To manage routing between different pages(Home, Library, Search). (**package**)
    * **Context-Api** - To manage Global states across all Components (**Hook present in React**)
* **Firebase** - Baas (Backend as a Service)
    * **Firestore** - NoSQL database
    * **Authentication** 
        * SignIn & SignUp functionality using Email and Password verification
        * Sign In With Google Account
    * **Storage** - Cloud Storage for uploading and serving Songs
    * **Hosting** - To Host the Web Page

## Functionalities
### SongList (Current Playlist)
User can add and remove Songs to the SongList. SongList is Implemented using Browser's **Session Storage** for saving the Songlist temporarily for the Current Session.
### Favourites 
User can add a song to their Favourites List, which is saved to Firestore Database.
### Recently Played Songs
The Recently Played Songs are stored in Local Storage.
### Media Session API
Media Session allows the user to Control the playing song using Keyboard buttons. Essentially allowing user to know what song is playing and to control it, without needing to open the Webpage. Check `src/Player.js` Component for the code Implementation. (Click [Here](https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API) to see the Docs)

## Components
This Project has a quite a lot of Components.
<details>
  <summary>:zap: Click to see full List of Components along with short Summary</summary>

* **App** - Main component which Hold all the other Components, this is where all the **Routing** has been done.
* **Page/Layout Components (Holds other Components)**
    * **Login** - Login Page where Login, Sign Up and Sign In with Google Account functionalities are implemented
    * **Home** - Home Page where User can view all Snaps. (**Route - '/'**)
    * **Library** - Library Page which displays the Recently Played Songs and Favourite Songs of the User. (**Route - '/library'**)
    * **Search** - Search Page where user can search for Songs and Artists. (**Route - '/search'**)
    * **AritstPage** -This Page Describes about an Artist and lists all of his/her Songs. (**Route -'/artist/artistID'**)
    * **Admin** - Admin Page where new Songs and Artists can be added. (**Route -'/admin'**)

* **Holder/Container Components**
    * **Navbar** - (Inside App Component)
    * **NewReleases** - NewReleases displays all the latest Songs. (Inside Home Component)
    * **AritstList** - AritstList displays all the latest Songs. (Inside Home Component)
    * **RecentlyListened** - This one holds the Recently Listened Songs of the user. (Inside Library Component)
    * **Favourites** - This one displays the Favourite Songs of the user. (Inside Library Component)
    * **SongList** - This shows the Current Playlist. (Inside App Component)
    * **Player** - Player Component placed to the bottom of the page. (Inside App Component)

* **Functionality Specific Components (Present inside Container/Layout Components)**
    * **Artist** - Artist. (Used Inside AritstList, Search Components)
    * **Song** - Song. (This is the Square One used Inside Home Component)
    * **PlayListSong** - This is the Song (Rectangular One) used Inside Library,Favourites,SongList Components. (Reusing single Component for Multiple Things)
    * **PlayerControls** - This holds the Control Buttons of the Player (play, pause, next, previous). (Inside Player Component)
    * **ForgotPassword** - Forgot Password Dialog Box. (Inside Login Component)
    * **SnackBar** - Notification Popup which appears on bottom of the page. (Used Inside Song and PlaylistSong Component)

</details>

## Custom Hooks 
Created a few Custom Hooks to keep the Complex functionality outside the Components. (check `src/hooks/` folder)
* **useAuth** - This provides all the Functions related to Authentication (SignUp, Login, SignOut ,Update Profile, Reset Password, Sign in with Google).
* **useSongFunctions** - This provides all the Functions related to Songs (Playing a Song, Play a Particular Song as the Next song, Adding a Song to Queue, Adding a Song to Favourites, Removing a Song from Favourities).

## Helper Functions 
Files which has Helper Functions are kept in `src/utils/`. 
These files include 
* functions which calculates current Time, durations.
* functions to fetch and save data to Local Storage and Session Storage.

## To run this on Local machine
* Clone the repo, and cd into it
* Install all the dependcies from package.json
* Create a firebase project place project Keys inside **src/firebase.js**
* Enable Email & Password and Google Authentication as Sign-In methods in firebase Console
* Run app by typing `npm start`in command line

### Note
You will have to create an **Index** in firestore, as **Favourites** Component uses Nested Queries to fetch data from Firestore. While Developing the Favourites Component there will be an error in console stating you to create an Index in Firestore. That Error will provide a link to create an Index in Firestore , you can click on the link and create an Index. (This Error will be solved after that particular Index is created)