import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import RegisterSurvivor from './pages/RegisterSurvivor';
import UserOptions from './pages/UserOptions';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={RegisterSurvivor} path="/register-survivor" />
      <Route component={UserOptions} path="/options" />
    </BrowserRouter>
  );
}

export default Routes;