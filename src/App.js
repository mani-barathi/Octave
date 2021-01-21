import './css/App.css';
import Navbar from "./components/Navbar"
import Player from "./components/Player"
import Login from "./components/Login"
import Home from "./components/Home"
import Library from "./components/Library"
import SongList from "./components/SongList"
import Search from "./components/Search"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useStateValue } from "./context/StateProvider"

function App() {
  const [{ user, isSongListOpen }] = useStateValue()
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

                  <Route path="/search">
                    <Search />
                  </Route>
                </Switch>
              </div>

              {isSongListOpen && <SongList />}     {/* current Playing Song List */}
              <Player />
            </>
          ) : (
              <Login />
            )
          }

        </div>
      </div>
    </Router>
  );
}

export default App;
