import './css/App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Player from "./components/Player"
import Login from "./components/Login"
import Home from "./components/Home"
import Library from "./components/Library"
import PlayList from "./components/PlayList"
import { useStateValue } from "./context/StateProvider"


function App() {
  const [{ user }] = useStateValue()
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

                  <Route path="/playlist/:name">
                    <PlayList />
                  </Route>

                  {/* <Route path="/search">
              <Search />
                </Route> */}
                </Switch>
              </div>

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
