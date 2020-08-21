import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

function Landing() {
  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">      
        </div>

        <div className="buttons-container">
          
          <div className="title">
            <h2>TRZ Survivors</h2>
          </div>
          <h3>Connecting people in a new world</h3>
          

          <div className="buttons">
            <Link to="/register-survivor" className="be-survivor">
              Be a survivor
            </Link>
            <Link to="/survivor-page" className="already-survivor">
              I am a survivor
            </Link>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;