import React, { useRef, useState, useEffect } from 'react'
import "../css/Admin.css"

import firebase from "firebase"
import { Typography, Button, Input, LinearProgress } from '@material-ui/core';
import { capitalize, createNamesArray, createNamesArrayWithCaptitalizedWords, capitalizeAllWords } from "../utils/utils"
import { db, storage } from "../firebase"

function Admin() {
    const formRef = useRef(null)
    const [isAddSong, setIsAddSong] = useState(true)
    const [artists, setArtists] = useState([])
    const [file, setFile] = useState(null)
    const [progress, setProgress] = useState(null)

    useEffect(() => {
        const unsubscribe = db.collection('artists').orderBy('name')
            .onSnapshot(snapshot => {
                setArtists(
                    snapshot.docs.map(doc => doc.data().name)
                )
            })
        return unsubscribe
    }, [])

    const clearFormFields = () => {
        setFile(null)
        if (isAddSong) {
            formRef.current.songName.value = ''
            formRef.current.artist.value = ''
            formRef.current.imageUrl.value = ''
            formRef.current.url.value = ''
        } else {
            formRef.current.artistName.value = ''
            formRef.current.artistImageUrl.value = ''
            formRef.current.artistDescription.value = ''
        }
    }

    useEffect(() => {
        if (formRef.current)
            clearFormFields()
        // eslint-disable-next-line
    }, [isAddSong])

    const handleAddSongForm = (event) => {
        event.preventDefault()
        const name = capitalize(formRef.current.songName.value)
        const names = createNamesArray(name)
        const data = {
            name, names,
            artist: capitalize(formRef.current.artist.value),
            imageUrl: formRef.current.imageUrl.value,
            url: formRef.current.url.value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }


        if (file) {
            const uploadTask = storage.ref(`songs/${file.name}`).put(file)
            uploadTask.on('state_change',
                (snapshot) => {             // Progress function
                    const progress = Math.round(((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
                    setProgress(progress)
                },
                (error) => {                // error function
                    alert(error.message)
                    console.log(error.message)
                },
                () => {
                    storage.ref('songs').child(file.name)
                        .getDownloadURL().then((url) => {
                            data.url = url             // adding the recived Url
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

    const handleAddArtistForm = (event) => {
        event.preventDefault()
        const name = capitalizeAllWords(formRef.current.artistName.value)
        const names = createNamesArrayWithCaptitalizedWords(formRef.current.artistName.value)
        const data = {
            name, names,
            description: formRef.current.artistDescription.value,
            imageUrl: formRef.current.artistImageUrl.value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }
        console.log(data)
        if (artists.includes(name))
            alert(`${name} already exists in DB`)
        else {
            db.collection('artists').add(data)
            alert("Artist added to DB")
            clearFormFields()
        }
    }

    return (
        <div className="admin">
            <div className="admin__wrapper">
                <div className="admim__header">
                    <Button color={isAddSong ? 'secondary' : 'default'}
                        variant={isAddSong ? 'contained' : 'text'}
                        onClick={() => setIsAddSong(true)}>
                        <Typography align="center" variant="h6">Add New Song </Typography>
                    </Button>
                    <Button color={!isAddSong ? 'secondary' : 'default'}
                        variant={!isAddSong ? 'contained' : 'text'}
                        onClick={() => setIsAddSong(false)} >
                        <Typography align="center" variant="h6">Add New Artist</Typography>
                    </Button>
                </div>

                {isAddSong ? (
                    <form ref={formRef} onSubmit={handleAddSongForm} className="admin__form" autoComplete="off" >
                        <Typography align="center" variant="h5">Add New Song to DB</Typography>
                        <label >Song Name</label>
                        <input name="songName" placeholder="Enter Song Name" required className="admin__formInput" />

                        <label >Artist Name</label>
                        <select name="artist" className="select">
                            {artists.map(artist =>
                                <option key={artist} value={artist}>{artist}</option>
                            )}
                        </select>

                        <br />
                        <label >Image Url</label>
                        <input name="imageUrl" placeholder="Enter Image Url" required className="admin__formInput" />

                        <label >Audio Url</label>
                        <input name="url" placeholder="Enter Audio Url (or else upload music file in file Upload)" className="admin__formInput" />

                        <Input type="file" accept="audio/mp3,audio/*;" color="secondary"
                            onChange={e => setFile(e.target.files[0])}
                        />

                        <br /><br />
                        <LinearProgress value={progress} variant="determinate" color='secondary' />
                        <br />
                        <Button type="submit" variant="contained" color="secondary">
                            Add
                    </Button>
                    </form>
                ) : (
                        <form ref={formRef} onSubmit={handleAddArtistForm} className="admin__form" autoComplete="off" >
                            <Typography align="center" variant="h5">Add Artist to DB</Typography>

                            <label >Artist Name</label>
                            <input name="artistName" placeholder="Enter Artist Name" required className="admin__formInput" />

                            <label >Description</label>
                            <input name="artistDescription" placeholder="Enter a small Description" required className="admin__formInput" />

                            <label >Image Url</label>
                            <input name="artistImageUrl" placeholder="Enter Image Url" required className="admin__formInput" />

                            <Button type="submit" variant="contained" color="secondary">
                                Add
                            </Button>
                        </form>
                    )}
            </div>
        </div >
    )
}

export default Admin
