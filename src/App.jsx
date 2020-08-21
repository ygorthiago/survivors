import React from 'react';
import './App.css';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Routes from './routes';

function App() {  
  const options = {
    timeout: 5000,
    position: positions.BOTTOM_RIGHT,
  }
  return (
    <Provider template={AlertTemplate} {...options}>
      <Routes />
    </Provider>
  );
}

export default App;
