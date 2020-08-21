import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import RegisterSurvivor from './pages/RegisterSurvivor';
import SurvivorPage from './pages/SurvivorPage';
import RegisteredPage from './pages/RegisteredPage';
import FlagSuccessPage from './pages/FlagSuccessPage';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={RegisterSurvivor} path="/register-survivor" />
      <Route component={SurvivorPage} path="/survivor-page" />
      <Route component={RegisteredPage} path="/registered" />
      <Route component={FlagSuccessPage} path="/flag-success" />
    </BrowserRouter>
  );
}

export default Routes;