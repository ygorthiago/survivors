import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import './styles.css';
import api from '../../services/api';
import { FiUser } from 'react-icons/fi';

function SurvivorProfile() {
  return (
    <form className="survivor-profile">      
      <header>
        <div>
          <strong>Ygor Thiago, 23</strong>
          <h3>Male</h3>
        </div>
      </header>
      
        <div>
          <legend>
            <h2>Inventory</h2>
          </legend>
          <ul className="items-grid">        
            <li>
              <img src="http://localhost:3333/items/fiji_water.png" alt="teste"/>
              <span>
                Fiji Water x3
              </span>              
            </li>
            <li>
              <img src="http://localhost:3333/items/fist_aid_pouch.png" alt="teste"/>
              <span>
                Fist Aid Pouch x1
              </span>              
            </li>
            <li>
              <img src="http://localhost:3333/items/ak47.png" alt="teste"/>
              <span>
                AK47 x1
              </span>              
            </li>
          </ul>
        </div>
        <div>
          <legend>
            <h2>Last location</h2>
          </legend>
          <span>This is your last location. If you want to update it, mark in the map and click in "Update location" button.</span>
           <br/>
          <Map center={[-12.9679083, -38.4324061]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[-12.9679083, -38.4324061]}/>
          </Map>
          <button>Update location</button>
        </div>
          <legend>
            <h2>Flag survivor as infected</h2>
          </legend>

        <form className="flag-survivor">

          <h3>Survivor name</h3>
          <div className="survivor-name-input">
            <input 
              type="text" 
              id="survivor-name" 
            />
            <i><FiUser /></i>
          <button type="submit">Flag</button>
          </div>
        </form>
      
    </form>
  );
}

export default SurvivorProfile;