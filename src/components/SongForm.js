import { useState } from "react";
import {
  Button,
  Input,
  LinearProgress,
  Typography,
  TextField,
  InputLabel,
  Select,
  FormControl,
} from "@material-ui/core";
import { addSong, getSongURL, uploadSongToStorage } from "../api/song";
import useForm from "../hooks/useForm";
import { capitalize, createNamesArray } from "../utils/utils";

const handleError = (e) => {
  console.log(e);
  alert(e);
};

function SongForm({ artists }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, handleChange, formRef, clearForm] = useForm({
    name: "",
    artist: "",
    imageUrl: "",
    url: "",
    file: null,
  });

  const handleAddSongForm = async (event) => {
    setLoading(true);
    setMessage({ type: "intial", text: "" });
    event.preventDefault();
    const name = capitalize(formData.name);
    const names = createNamesArray(formData.name);
    const { imageUrl, url, artist } = formData;
    const data = {
      imageUrl,
      artist,
      url,
      name,
      names,
    };

    if (formData.file) {
      const uploadTask = uploadSongToStorage(formData.file);

      uploadTask.on(
        "state_change",
        (snapshot) => {
          // Progress function
          const { bytesTransferred, totalBytes } = snapshot;
          setProgress(Math.round((bytesTransferred / totalBytes) * 100));
        },
        handleError,
        () => {
          getSongURL(formData.file.name)
            .then(async (url) => {
              console.log(url);
              data.url = url; // adding the recived Url
              await addSong(data).catch(handleError);
              setMessage({
                type: "textPrimary",
                text: "Song added",
              });
              clearForm();
            })
            .catch(handleError);
        }
      ); // end of UploadTask
    } else if (data.url) {
      await addSong(data).catch(handleError);
      setMessage({
        type: "textPrimary",
        text: "Song added",
      });
      clearForm();
    } else
      setMessage({
        type: "error",
        text: "Either Audio URL should be provided or ",
      });

    setLoading(false);
    setProgress(0);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleAddSongForm}
      className="admin__form"
      autoComplete="off"
    >
      <Typography align="center" variant="h5">
        Add New Song to DB
      </Typography>
      <div className="admin__fromGroup">
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Song Name"
          required
          fullWidth
          color="secondary"
        />
      </div>
      <div className="admin__fromGroup" style={{ paddingTop: "0.5rem" }}>
        <FormControl>
          <InputLabel htmlFor="age-native-simple">Artist</InputLabel>
          <Select
            native
            name="artist"
            onChange={handleChange}
            value={formData.artist}
            color="secondary"
            fullWidth
            required
          >
            <option key="lasdf" value="" disabled />
            {artists.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="admin__formGroup">
        <TextField
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          label="Image Url"
          required
          fullWidth
          color="secondary"
        />
      </div>
      <div className="admin__formGroup">
        <TextField
          name="url"
          value={formData.url}
          onChange={handleChange}
          label="Audio Url(Not needed if uploading Song)"
          fullWidth
          color="secondary"
        />
      </div>
      <div className="admin__formGroup">
        <Input
          name="file"
          type="file"
          accept="audio/mp3,audio/*;"
          color="secondary"
          onChange={handleChange}
        />
      </div>
      <div className="admin__formGroup">
        <LinearProgress
          value={progress}
          variant="determinate"
          color="secondary"
        />
      </div>
      {message.text && (
        <div
          className="admin__formGroup admin__formMessage"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <Typography color={message.type} variant="subtitle1">
            <strong>{message.text}</strong>
          </Typography>
        </div>
      )}
      <Button
        onClick={() => {
          setMessage({ type: "", message: "" });
          clearForm();
          setProgress(0);
        }}
        type="button"
        variant="contained"
        color="default"
      >
        Clear
      </Button>
      &nbsp; &nbsp;
      <Button
        disabled={loading}
        type="submit"
        variant="contained"
        color="secondary"
      >
        Add
      </Button>
    </form>
  );
}

export default SongForm;
