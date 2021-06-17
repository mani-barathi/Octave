import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles/App.css";

// Components
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import SongList from "./components/SongList";
import Spinner from "./components/Spinner";

// Pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
const ArtistPage = lazy(() => import("./pages/ArtistPage"));
const PlayListPage = lazy(() => import("./pages/PlayListPage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

function App() {
  const user = useSelector((state) => state.user);
  const { isSongListOpen, playingSong, songIndex } = useSelector(
    (state) => state.currentSession
  );

  const showPlayer =
    window.location.pathname !== "/admin" && playingSong && songIndex !== -1;

  return (
    <Router>
      <div className="app">
        <div className="app__body">
          {user ? (
            <>
              <Navbar />
              <div className="app__window">
                <Suspense fallback={<Spinner />}>
                  <Switch>
                    <Route exact path="/library" component={LibraryPage} />
                    <Route
                      exact
                      path="/playlists/:id"
                      component={PlayListPage}
                    />
                    <Route exact path="/search" component={SearchPage} />
                    <Route exact path="/artist/:id" component={ArtistPage} />
                    <Route exact path="/admin" component={AdminPage} />
                    <Route exact path="/" component={HomePage} />
                  </Switch>
                </Suspense>
              </div>
              {isSongListOpen && <SongList />} {/* current Playing Song List */}
              <Player show={showPlayer} />
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
