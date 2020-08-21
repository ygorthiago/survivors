import React, { useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { useAlert } from "react-alert";

import Inventory from './Inventory';
import InfectedComponent from './InfectedComponent';
import FlagSurvivor from './FlagSurvivor';

import api from '../../services/api';

import './styles.css';

function SurvivorProfile({survivor, inventory}) {
  const [selectedPosition, setSelectedPosition] = useState([survivor.last_location_latitude, survivor.last_location_longitude]);
  const alert = useAlert();

  function handleMapCLick(event){
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]); 
  }

  function handleSubmitUpdateLocation(event) {
    event.preventDefault();
    const id = survivor.id;
    const [ lat, lng ] = selectedPosition;

    const newLocation= {
      latitude: lat, 
      longitude: lng
    }

    api.put(`/survivor/${id}/update-location`, newLocation);

    alert.success('Location has been updated!');
  }

  return (
    <article className="survivor-profile">      
      <header>
        <div>
          <strong>{survivor.name}, {survivor.age}</strong>
          <h3>{survivor.gender}</h3>
        </div>
      </header>

      {survivor.infected ? <InfectedComponent /> : <Inventory inventory={inventory} />}        

        <div>
          <legend>
            <h2>Last location</h2>
          </legend>          
          <form onSubmit={handleSubmitUpdateLocation} className="location">
            <Map 
              center={[survivor.last_location_latitude, survivor.last_location_longitude]} 
              zoom={15}
              onclick={handleMapCLick}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedPosition}/>
            </Map>
            <div className="update-location">
              <span>This is your last location. <br/>
                    If you want to update it, mark in the map and click 
                    the button beside.
              </span>
              <button>Update location</button>
            </div>            
          </form> 
        </div>

        {survivor.infected ? '' : <FlagSurvivor reporter={survivor} />}
    </article>
  );
}

export default SurvivorProfile;