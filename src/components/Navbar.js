import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Menu, MenuItem, IconButton, Avatar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { logoutUser } from "../actions/authActions";
import { signOut } from "../api/auth";

function Navbar() {
  const dispatch = useDispatch();
  const router = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("/");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let unlisten = router.listen((location, action) => {
      setCurrentLocation(location.pathname);
    });
    return unlisten;
  }, [router]);

  const openOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = async () => {
    try {
      await signOut();
      dispatch(logoutUser());
      router.replace("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="navbar">
      <img
        className="navbar__logo"
        src="https://raw.githubusercontent.com/mani-barathi/mani-barathi.github.io/master/assets/favicon.ico"
        alt=""
        onDoubleClick={() => router.push("/admin")}
      />

      <div className="navbar__center">
        <Link
          to="/"
          className={
            currentLocation === "/"
              ? `navbar__link navbar__link--active`
              : "navbar__link"
          }
        >
          <span className="navbar__linkSpan">Home</span>
          <span className="navbar__linkIcon">
            <HomeIcon />
          </span>
        </Link>
        <Link
          to="/library"
          className={
            currentLocation === "/library"
              ? `navbar__link navbar__link--active`
              : "navbar__link"
          }
        >
          <span className="navbar__linkSpan">Library</span>
          <span className="navbar__linkIcon">
            <LibraryMusicIcon />
          </span>
        </Link>
        <Link
          to="/search"
          className={
            currentLocation === "/search"
              ? `navbar__link navbar__link--active`
              : "navbar__link"
          }
        >
          <span className="navbar__linkIcon">
            <SearchIcon />
          </span>
          <span className="navbar__linkSpan">Search</span>
        </Link>
      </div>

      <div className="navbar__right">
        <IconButton
          className="song__optionIcon"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openOptions}
        >
          <Avatar src={user.photoURL} className="navbar__avatar">
            {" "}
          </Avatar>
        </IconButton>
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(false)}
        >
          <MenuItem onClick={logout}>
            <ExitToAppIcon fontSize="small" />
            <span className="navbar__rightMenuItem">Logout</span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
