import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css'
import App from './App';

import { intialState, reducer } from "./reducers/reducer"
import StateProvider from "./context/StateProvider"

ReactDOM.render(
  <React.StrictMode>
    <StateProvider intialState={intialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
