import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";

import { intialState, reducer } from "./reducers/reducer";
import StateProvider from "./context/StateProvider";
import Provider from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <StateProvider intialState={intialState} reducer={reducer}>
        <App />
      </StateProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
