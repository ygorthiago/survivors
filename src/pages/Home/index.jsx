import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/home-image.svg';

import './styles.css';


function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="" />                 
        </div>

        <div className="buttons-container">
          
          <div className="title">
            {/* <img src={logo} alt="" className="logo"/>                    */}
            <h2>TRZ Survivors</h2>
          </div>
          
          <h3>Connecting people in a new world</h3>

          <div>
            <Link to="/register-survivor" className="be-survivor">
              Be a survivor
            </Link>
            <Link to="/options" className="already-survivor">
              I'm already a survivor
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;