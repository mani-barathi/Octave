import React, { useState } from 'react'
import "../css/Search.css"
import { TextField, IconButton, InputAdornment } from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search"

function Search() {
    const [input, setInput] = useState('')

    const handleSearch = (event) => {
        event.preventDefault()
        console.log(input)
    }

    return (
        <div className="search">
            <div className="search__bar">
                <form className="search__barForm" onSubmit={handleSearch}>
                    <TextField onChange={e => setInput(e.target.value)} value={input}
                        variant="filled" label="search" fullWidth margin="dense" size="medium"
                        color="secondary"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton className="search__barSearchIcon">
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </form>
            </div>

            <div className="search__results">
                <h1 className="search__resultsTitle">Results </h1>
            </div>

        </div>
    )
}

export default Search
