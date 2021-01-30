import React, { useRef } from 'react'
import {
    Button, Dialog, DialogContent,
    DialogActions, DialogTitle
} from "@material-ui/core"
import usePlayListFunctions from '../hooks/usePlayListFunctions'

// Popup Modal where user can enter a new playlist name and create that, used in LIbrary Page
function CreatePlaylistModal({ isOpen, setIsOpen }) {
    const inputRef = useRef()
    const { createNewPlaylist } = usePlayListFunctions()

    const createPlaylist = (e) => {
        e.preventDefault()
        if (!inputRef.current.value) return

        createNewPlaylist(inputRef.current.value)
            .then(() => {
                console.log('Playlist Created!')
                inputRef.current.value = ''
                handleClose()
            })
            .catch((error) => alert(error.message))
    }

    const handleClose = () => setIsOpen(false)
    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create New Playlist</DialogTitle>
            <DialogContent>
                <form onSubmit={createPlaylist} >
                    <input ref={inputRef} type="text"
                        className="library__addPlaylistInput" placeholder="Enter a New Playlist Name" required />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="default">
                    Cancel
                </Button>
                <Button type="submit" onClick={createPlaylist} variant="contained" color="secondary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreatePlaylistModal
