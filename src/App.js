import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./css/App.css";
// Pages
import Login from "./pages/LoginPage";
import Home from "./pages/HomePage";
import Library from "./pages/LibraryPage";
import Search from "./pages/SearchPage";
import Admin from "./pages/AdminPage";
import ArtistPage from "./pages/ArtistPage";
import PlayListPage from "./pages/PlayListPage";

// Components
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import SongList from "./components/SongList";

import { useStateValue } from "./context/StateProvider";

function App() {
  const [{ isSongListOpen }] = useStateValue();
  const user = useSelector((state) => state.user);

  return (
    <Router>
      <div className="app">
        <div className="app__body">
          {user ? (
            <>
              <Navbar />
              <div className="app__window">
                <Switch>
                  <Route path="/" exact>
                    <Home />
                  </Route>

                  <Route path="/library">
                    <Library />
                  </Route>

                  <Route path="/playlists/:id">
                    <PlayListPage />
                  </Route>

                  <Route path="/search">
                    <Search />
                  </Route>

                  <Route path="/artist/:id">
                    <ArtistPage />
                  </Route>

                  <Route path="/admin" exact>
                    <Admin />
                  </Route>
                </Switch>
              </div>
              {isSongListOpen && <SongList />} {/* current Playing Song List */}
              <Player />
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
