import './css/App.css';
import Navbar from "./components/Navbar"
import Player from "./components/Player"
import Login from "./components/Login"

function App() {
  const user = 'mani'
  return (
    <div className="app">
      <div className="app__body">

        {user ? (
          <>
            <Navbar />
            <div className="app__window">
              {/* Main */}
              {/* playlist */}
              {/* Explore */}
            </div>

            <Player />
          </>
        ) : (
            <Login />
          )
        }

      </div>
    </div>
  );
}

export default App;
