import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./css/App.css";
// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import SearchPage from "./pages/SearchPage";
import AdminPage from "./pages/AdminPage";
import ArtistPage from "./pages/ArtistPage";
import PlayListPage from "./pages/PlayListPage";

// Components
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import SongList from "./components/SongList";

function App() {
  const user = useSelector((state) => state.user);
  const { isSongListOpen } = useSelector((state) => state.currentSession);

  return (
    <Router>
      <div className="app">
        <div className="app__body">
          {user ? (
            <>
              <Navbar />
              <div className="app__window">
                <Switch>
                  <Route exact path="/library" component={LibraryPage} />
                  <Route exact path="/playlists/:id" component={PlayListPage} />
                  <Route exact path="/search" component={SearchPage} />
                  <Route exact path="/artist/:id" component={ArtistPage} />
                  <Route exact path="/admin" component={AdminPage} />
                  <Route exact path="/" component={HomePage} />
                </Switch>
              </div>
              {isSongListOpen && <SongList />} {/* current Playing Song List */}
              {window.location.pathname !== "/admin" && <Player />}
            </>
          ) : (
            <LoginPage />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
