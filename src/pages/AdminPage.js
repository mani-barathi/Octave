import { Paper, Tab, Tabs } from "@material-ui/core";
import React from "react";
import ArtistForm from "../components/ArtistForm";
import SongForm from "../components/SongForm";
import "../styles/Admin.css";

function Admin() {
  const [tab, setTab] = React.useState(0);

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

        {tab === 0 ? <SongForm /> : tab === 1 ? <ArtistForm /> : <div></div>}
      </div>
    </div>
  );
}

export default Admin;
