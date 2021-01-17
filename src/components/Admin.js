import React, { useRef, useState } from 'react'
import "../css/Admin.css"

import firebase from "firebase"
import { Container, Typography, Button, Input } from '@material-ui/core';
import { db, storage } from "../firebase"

function Admin() {
    const formRef = useRef()
    const [file, setFile] = useState(null)

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const clearFormFields = () => {
        formRef.current.name.value = ''
        formRef.current.artist.value = ''
        formRef.current.imageUrl.value = ''
        formRef.current.url.value = ''
        setFile(null)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const data = {
            name: capitalize(formRef.current.name.value),
            artist: capitalize(formRef.current.artist.value),
            imageUrl: formRef.current.imageUrl.value,
            url: formRef.current.url.value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }
        console.log(data)

        if (file) {
            const uploadTask = storage.ref(`songs/${file.name}`).put(file)
            uploadTask.on('state_change',
                null,                       // Progress function
                (error) => {                // error function
                    alert(error.message)
                    console.log(error.message)
                },
                () => {                      // Success function
                    storage.ref('songs').child(file.name)
                        .getDownloadURL(url => {
                            data.url = url
                            db.collection('songs').add(data)
                            alert("Song Added!")
                            clearFormFields()
                        })
                }
            )                               // end of UploadTask
        } else if (data.url) {
            db.collection('songs').add(data)
            alert("Song Added!")
            clearFormFields()
        } else
            alert("No Url for song")
    }

    return (
        <div className="admin">
            <Container maxWidth="sm">
                <br />
                <Typography align="center" variant="h5">Add New Song to DB</Typography>
                <form ref={formRef} onSubmit={handleFormSubmit} className="admin__form" autoComplete="off" >
                    <label >Song Name</label>
                    <input name="name" placeholder="Enter Song Name" required className="admin__formInput" />

                    <label >Artist Name</label>
                    <input name="artist" placeholder="Enter Artist Name" required className="admin__formInput" />

                    <label >Image Url</label>
                    <input name="imageUrl" placeholder="Enter Image Url" required className="admin__formInput" />

                    <label >Audio Url</label>
                    <input name="url" placeholder="Enter Audio Url (or else upload music file in file Upload)" className="admin__formInput" />

                    <Input type="file" accept="audio/mp3,audio/*;" color="secondary"
                        onChange={e => setFile(e.target.files[0])}
                    />
                    <br /> <br />
                    <Button type="submit" variant="contained" color="secondary">
                        Add Song
                    </Button>
                </form>
            </Container>
        </div>
    )
}

export default Admin
