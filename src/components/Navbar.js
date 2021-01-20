import React, { useState } from 'react'
import "../css/Navbar.css"
import { Link } from "react-router-dom"
import { Menu, MenuItem, IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useStateValue } from "../context/StateProvider"

function Navbar() {
    const [anchorEl, setAnchorEl] = useState(null)
    const [, dispatch] = useStateValue()

    const logoutUser = () => {
        dispatch({ type: 'SET_USER', user: null })
    }

    const openOptions = (event) => {
        setAnchorEl(event.currentTarget)
    }

    return (
        <div className="navbar">
            <img className="navbar__logo" src="https://raw.githubusercontent.com/mani-barathi/mani-barathi.github.io/master/assets/favicon.ico" alt="" />

            <div className="navbar__center">
                <Link to="/" className="navbar__link navbar__link--active">
                    <span className="navbar__linkSpan">
                        Home
                    </span>
                    <span className="navbar__linkIcon">
                        <HomeIcon />
                    </span>
                </Link>
                <Link to="/library" className="navbar__link">
                    <span className="navbar__linkSpan">
                        Library
                    </span>
                    <span className="navbar__linkIcon">
                        <LibraryMusicIcon />
                    </span>
                </Link>
                <Link to="/search" className="navbar__link">
                    <span className="navbar__linkIcon">
                        <SearchIcon />
                    </span>
                    <span className="navbar__linkSpan">
                        Search
                    </span>
                </Link>
            </div>

            <div className="navbar__right">
                <IconButton className="song__optionIcon" aria-controls="simple-menu" aria-haspopup="true"
                    onClick={openOptions} >
                    <img src="https://avatars2.githubusercontent.com/u/49336839?s=460&u=fbbc21b3ee2066b82cf7ddf1205524757ac5f3f4&v=4" alt="" className="navbar__avatar" />
                </IconButton>
                <Menu
                    elevation={0}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(false)}
                >
                    <MenuItem onClick={logoutUser}>
                        <ExitToAppIcon fontSize="small" />
                        <span className="navbar__rightMenuItem">Logout </span>
                    </MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Navbar
