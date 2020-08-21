import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import completeIcon from '../../assets/complete-icon.svg';
import './styles.css';

function FlagSuccessPage() {
  const location = useLocation();
  const name = location.state.params[0];

  return (
    <main className="register-complete">
      
      <div>
      <img src={completeIcon} alt="Complete!"/>
        <h1>You're right! {name} is infected!</h1>
        <h3>You and other four survivors has reportered the contamination.</h3>
        <h3>As reward, now you own all {name}'s items. Check your inventory!</h3>
        <Link to="/survivor-page">Back to Survivor Page</Link>
      </div>
      
    </main>
  );
}

export default FlagSuccessPage;