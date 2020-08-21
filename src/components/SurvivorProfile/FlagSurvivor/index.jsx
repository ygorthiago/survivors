import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { useAlert } from "react-alert";

import api from '../../../services/api';

import './styles.css';
import { useHistory } from 'react-router-dom';

function FlagSurvivor({ reporter }) {
  const [name, setName] = useState('');
  const alert = useAlert();
  const history = useHistory();
  const gender = reporter.gender;

  async function flagSurvivor(e){
    e.preventDefault();

    const data = {
      name: name,
      reporterId: reporter.id
    };
    
    api.post('/survivors/mark-as-infected', data)
      .then((response) => {        
        if (response.status === 201) {
          alert.success(response.data.message); 
        } else if (response.status === 208){
          alert.info(response.data.message);
        } else if (response.status === 202) {
          history.push('/flag-success', { params: [name, gender] });
        } else {
          alert.error(response.data.message);
        }
      });

  }

  return (
    <div className="flag-survivor-component">
      <legend>
        <h2>Flag survivor as infected</h2>
      </legend>
      
      <form className="flag-survivor" onSubmit={ flagSurvivor }>

        <h3>Survivor name</h3>
        <div className="survivor-name-input">
          <input 
            type="text" 
            id="survivor-name" 
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
          <i><FiUser /></i>
        <button type="submit">Flag</button>
        </div>
      </form>
    </div>
  );
}

export default FlagSurvivor;