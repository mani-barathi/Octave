# Music Streaming App
Developing a Web based Music Streaming App using ReactJs and Firebase

**Click [Here](https://music-streaming-app-4a392.web.app/) to view the Demo!**

### Currenly Working on 👇 
- [ ] Admin Page, where users can add New Songs to DB
- [x] ~Search based on Song and Artist~
- [x] ~Listing Songs based on Artist~
- [x] ~Adding and Removing song from Favourites~
- [x] ~Sign Up and Sign In Functionality using Firebase~

### Design Preview
<img src="https://github.com/mani-barathi/Music-Streaming-App/blob/master/public/preview.JPG" />

### Technology Used
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

### Components
* **App** - Main component which Hold all the other Components, this is where all the **Routing** has been done.
* **Layout Components (Holds other Components)**
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
    * **PlayerControls** - This is Controls of Player (play, pause, next, previous). (Inside Player Component)
    * **ForgotPassword** - Forgot Password Dialog Box. (Inside Login Component)
    * **SnackBar** - Notification Popup which appears on bottom of the page. (Used Inside Song and PlaylistSong Component)

### To run this on Local machine
* Clone the repo, and cd into it
* Install all the dependcies from package.json
* Create a firebase project place project Keys inside **src/firebase.js**
* Run app by typing `npm start`in command line

