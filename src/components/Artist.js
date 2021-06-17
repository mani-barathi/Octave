import React from "react";
import "../styles/Artist.css";
import { useHistory } from "react-router-dom";

// Aritist card present inside Home Page
function Artist({ id, data }) {
  const history = useHistory();

  const goToArtistPage = () => {
    history.push(`/artist/${id}`);
  };

  return (
    <div className="artist" onClick={goToArtistPage}>
      <img src={data.imageUrl} alt="" className="artist__image" />
      <p className="artist__name"> {data.name} </p>
    </div>
  );
}

export default Artist;
