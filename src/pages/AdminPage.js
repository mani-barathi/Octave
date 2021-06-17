import { Paper, Tab, Tabs } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getArtists } from "../api/artist";
import ArtistForm from "../components/ArtistForm";
import SongForm from "../components/SongForm";
import "../styles/Admin.css";

function Admin() {
  const [tab, setTab] = React.useState(0);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const unsubscribe = getArtists().onSnapshot((snapshot) => {
      setArtists(snapshot.docs.map((doc) => doc.data().name));
    });
    return unsubscribe;
  }, []);

  return (
    <div className="admin">
      <div className="admin__wrapper">
        <Paper square>
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            indicatorColor="secondary"
            textColor="secondary"
            centered
          >
            <Tab label="Add Song" />
            <Tab label="Add Artist" />
          </Tabs>
        </Paper>

        {tab === 0 ? (
          <SongForm artists={artists} />
        ) : tab === 1 ? (
          <ArtistForm artists={artists} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Admin;
