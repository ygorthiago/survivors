import React, { useState } from 'react';

import SurvivorProfile from '../../components/SurvivorProfile';
import Header from '../../components/Header';

import api from '../../services/api';
import './styles.css';
import { FiHash } from 'react-icons/fi';
function SurvivorPage() {
  const [survivor, setSurvivor] = useState([]);
  const [id, setId] = useState('');

  async function searchSurvivor(e){
    e.preventDefault();

    const response = await api.get('/survivor', {   
      params: {
        id
      }
    });
    setSurvivor(response.data);    
  }

  return (
    <div className="container">
      <Header />

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
        {survivor.length !== 0 ? <SurvivorProfile survivor={ survivor.survivor[0] } inventory={survivor.inventory} /> : ''}
      </main>
    </div>
    
  )
}

export default SurvivorPage;