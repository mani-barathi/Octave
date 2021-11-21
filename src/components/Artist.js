import React from "react";
import "../styles/Artist.css";
import { useNavigate } from "react-router-dom";

// Aritist card present inside Home Page
function Artist({ id, data }) {
  const navigate = useNavigate();

  const goToArtistPage = () => {
    navigate(`/artist/${id}`);
  };

  return (
    <div className="artist" onClick={goToArtistPage}>
      <img src={data.imageUrl} alt="" className="artist__image" />
      <p className="artist__name"> {data.name} </p>
    </div>
  );
}

export default Artist;
