import React from 'react'
import { Snackbar, IconButton } from "@material-ui/core"
import CloseIcon from '@material-ui/icons/Close'

function SnackBar({ setSnackBar, snackBar }) {

    const closeSnackBar = () => {
        setSnackBar(null)
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={Boolean(snackBar)}
            onClose={closeSnackBar}
            autoHideDuration={3000}
            message={snackBar}
            action={
                <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackBar}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            }
        />
    )
}

export default SnackBar
