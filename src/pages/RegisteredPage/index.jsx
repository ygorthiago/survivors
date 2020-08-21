import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import completeIcon from '../../assets/complete-icon.svg';
import './styles.css';

function RegisteredPage() {
  const location = useLocation();
  const name = location.state.params[0];
  const id = location.state.params[1];

  return (
    <main className="register-complete">
      
      <div>
      <img src={completeIcon} alt="Complete!"/>
        <h1>Registered!</h1>
        <h3>{name}, your Survivor ID is {id}</h3>
        <h3>Keep this number with your life, you'll need it to access Survivor Page</h3>
        <Link to="/survivor-page">Go to Survivor Page</Link>
      </div>
      
    </main>
  );
}

export default RegisteredPage;