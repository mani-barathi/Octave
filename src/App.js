import { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles/App.css";

// Components
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import SongList from "./components/SongList";
import Spinner from "./components/Spinner";
import Error404Page from "./components/Error404";

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
  const { isSongListOpen, playingSong } = useSelector(
    (state) => state.currentSession
  );

  const showPlayer = window.location.pathname !== "/admin" && playingSong;

  return (
    <div className="app">
      <div className="app__body">
        {user ? (
          <>
            <Navbar />
            <div className="app__window">
              <Suspense fallback={<Spinner />}>
                <Switch>
                  <Route exact path="/library" component={LibraryPage} />
                  <Route exact path="/playlists/:id" component={PlayListPage} />
                  <Route exact path="/search" component={SearchPage} />
                  <Route exact path="/artist/:id" component={ArtistPage} />
                  <Route exact path="/admin" component={AdminPage} />
                  <Route exact path="/" component={HomePage} />
                  <Route path="*" component={Error404Page} />
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
  );
}

export default App;
