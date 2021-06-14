import { Button, Typography, TextField } from "@material-ui/core";
import { useState } from "react";
import { addArtist } from "../api/artist";
import useForm from "../hooks/useForm";
import {
  capitalizeAllWords,
  createNamesArrayWithCaptitalizedWords,
} from "../utils/utils";

function ArtistForm({ artists }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, handleChange, formRef, clearForm] = useForm({
    name: "",
    description: "",
    imageUrl: "",
  });

  const handleAddArtistForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    const name = capitalizeAllWords(formData.name);
    const names = createNamesArrayWithCaptitalizedWords(formData.name);
    const data = { ...formData, name, names };

    if (artists.includes(name)) {
      setMessage({
        type: "error",
        text: `${name} already exists in DB`,
      });
    } else {
      await addArtist(data);
      setMessage({
        type: "textPrimary",
        text: "Artist added",
      });
      clearForm();
    }
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
          label="Image Url"
          required
          fullWidth
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
