import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
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
                <Routes>
                  <Route exact path="/library" element={<LibraryPage />} />
                  <Route
                    exact
                    path="/playlists/:id"
                    element={<PlayListPage />}
                  />
                  <Route exact path="/search" element={<SearchPage />} />
                  <Route exact path="/artist/:id" element={<ArtistPage />} />
                  <Route exact path="/admin" element={<AdminPage />} />
                  <Route exact path="/" element={<HomePage />} />
                  <Route path="*" element={<Error404Page />} />
                </Routes>
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
