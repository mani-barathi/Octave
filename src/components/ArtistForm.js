import { Input } from "@material-ui/core";
import {
  Button,
  Typography,
  TextField,
  LinearProgress,
} from "@material-ui/core";
import { useState } from "react";
import {
  addArtist,
  getArtistImageURL,
  uploadArtistToStorage,
} from "../api/artist";
import useForm from "../hooks/useForm";
import {
  capitalizeAllWords,
  createNamesArrayWithCaptitalizedWords,
  handleError,
  isValidURL,
} from "../utils/common";

function ArtistForm({ artists }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, handleChange, formRef, clearForm] = useForm({
    name: "",
    description: "",
    imageUrl: "",
    image: null,
  });

  const handleAddArtistForm = async (e) => {
    e.preventDefault();
    setMessage({ type: "", message: "" });
    const name = capitalizeAllWords(formData.name);
    const names = createNamesArrayWithCaptitalizedWords(formData.name);
    const { description, imageUrl } = formData;
    const data = { description, name, names, imageUrl };

    // validations
    if (artists.includes(name)) {
      return setMessage({
        type: "error",
        text: `${name} already exists in DB`,
      });
    } else if (!data.imageUrl && !formData.image) {
      return setMessage({
        type: "error",
        text: "Either image URL should be provided or Image should be uploaded",
      });
    } else if (data.imageUrl && !isValidURL(data.imageUrl)) {
      return setMessage({
        type: "error",
        text: "Invliad image URL",
      });
    } else if (formData.image && !formData.image?.type.startsWith("image")) {
      return setMessage({
        type: "error",
        text: "File must be of type image",
      });
    }

    setLoading(true);
    if (formData.image) {
      const uploadTask = uploadArtistToStorage(formData.image);

      uploadTask.on(
        "state_change",
        ({ bytesTransferred, totalBytes }) => {
          setProgress(Math.round((bytesTransferred / totalBytes) * 100));
        },
        handleError,
        () => {
          getArtistImageURL(formData.image.name)
            .then(async (url) => {
              console.log(url);
              data.imageUrl = url; // adding the recived Url
              await addArtist(data).catch(handleError);
              setMessage({
                type: "textPrimary",
                text: "Artist added",
              });
              clearForm();
            })
            .catch(handleError);
        }
      ); // end of UploadTask
    } else if (data.imageUrl) {
      await addArtist(data).catch(handleError);
      setMessage({
        type: "textPrimary",
        text: "Artist added",
      });
      clearForm();
    } else
      setMessage({
        type: "error",
        text: "Either image URL should be provided or Image should be uploaded",
      });

    setLoading(false);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleAddArtistForm}
      className="admin__form"
      autoComplete="off"
    >
      <Typography align="center" variant="h5">
        Add Artist to DB
      </Typography>
      <div className="admin__formGroup">
        <TextField
          name="name"
          value={formData.name}
          onChange={handleChange}
          label="Artist Name"
          required
          fullWidth
          color="secondary"
        />
      </div>
      <div className="admin__formGroup">
        <TextField
          name="description"
          value={formData.description}
          onChange={handleChange}
          label="Description"
          required
          fullWidth
          color="secondary"
        />
      </div>
      <div className="admin__formGroup">
        <TextField
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          label="Image Url (Not needed if uploading image)"
          fullWidth
          color="secondary"
        />
      </div>
      <div className="admin__formGroup">
        <Input
          name="image"
          type="file"
          accept="image/*"
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

export default ArtistForm;
