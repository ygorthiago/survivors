import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {FiArrowLeft, FiHash } from 'react-icons/fi';
import api from '../../services/api';

import './styles.css';
import SurvivorProfile from '../../components/SurvivorProfile';

function UserOptions() {
  const [survivor, setSurvivor] = useState([]);
  const [id, setId] = useState('');

  async function searchSurvivor(e){
    e.preventDefault();

    const response = await api.get(`survivors/${id}`, {   
    });
    setSurvivor(response.data); 
    console.log(response.data)
  }

  return (
    <div className="container">
      <header>
        <Link to="/">
          <FiArrowLeft />Back to home
        </Link>
        
      <h3 className="logo">TRZ Survivors</h3>     
      </header>

      <form className="id-container" onSubmit={ searchSurvivor }>
        <h3>Survivor ID</h3>
        <div className="survivor-id-input">
          <input 
            type="text" 
            id="survivor-id" 
            value={id}
            onChange={(e) => { setId(e.target.value) }}
          />
          <i><FiHash /></i>
        <button type="submit">Enter</button>
        </div>
      </form>

      <main>
        <SurvivorProfile />
      </main>
    </div>
    
  )
}

export default UserOptions;