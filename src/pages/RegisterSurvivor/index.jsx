import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { FiMinusCircle, FiPlusCircle} from 'react-icons/fi';
import { useAlert } from "react-alert";

import Captcha from '../../components/RegisterSurvivorComponents/Captcha';
import Header from '../../components/Header';

import api from '../../services/api';

import './styles.css';
import { useHistory } from 'react-router-dom';

function RegisterSurvivor() {
  const alert = useAlert();
  const history = useHistory();
  const [items, setItems] = useState([]);

  const [initialPosition, setInitialPosition] = useState([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);

  const [inventory, setInventory] = useState([
    {
      item_id: 1,
      qtd: 0
    },
    {
      item_id: 2,
      qtd: 0
    },
    {
      item_id: 3,
      qtd: 0
    },
    {
      item_id: 4,
      qtd: 0
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: ''
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    api.get('/items').then(response => {
      setItems(response.data);
    })
  }, []);

  const incrementQtdItem = index => e => {
    let newArr = [...inventory];
    newArr[index] = {item_id: index +1, qtd: inventory[index].qtd +1};

    setInventory(newArr);
  }

  const decrementQtdItem = index => e => {
    if (inventory[index].qtd > 0) {
      let newArr = [...inventory];
      newArr[index] = {item_id: index +1, qtd: inventory[index].qtd -1};
  
      setInventory(newArr);
    }
  }

  function handleMapCLick(event){
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]); 
  }

  function handleFieldChange(event){
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  var captchaVerified = false;

  function handleCaptcha() {
    captchaVerified = true;
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const { name, age, gender } = formData;

    const [ latitude, longitude ] = selectedPosition;

    if (name === '' || age === '' || gender === ''){
      alert.error('Fill all fields');
    }
    else if (latitude === 0 && longitude === 0 ) {
      alert.error('Inform your location');
    } else if (captchaVerified === false) {
      alert.error('Confirm that you not Logan Paul');
    } else {
      const data = {
        name,
        age, 
        gender,
        last_location_latitude: latitude,
        last_location_longitude: longitude,
        items: inventory
      };
      
      api.post('/survivors', data)
        .then((response) => {
          if (response.status === 201) {
            history.push('/registered', { params: [name, response.data.id] });
          } else if (response.status === 208) {
            alert.error(response.data.message);
          } else {
            alert.error('Unexpected error while creating a survivor');
          }
        });
    }


    
  }

  return (
    <div id="page-register-survivor">
      <Header />
      <form onSubmit={handleSubmit}>
        <h1>Register new survivor</h1>

        <fieldset>
          <legend>
            <h2>Informations</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input 
              type="text"
              name="name"
              id="name"
              onChange={handleFieldChange}
              
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="age">Age</label>
              <input 
                type="number"
                name="age"
                id="age"
                onChange={handleFieldChange}
                
              />
            </div>

            <div className="field">
              <label htmlFor="name">Gender</label>
              <select 
                name="gender" 
                id="gender" 
                defaultValue="" 
                onChange={handleFieldChange}
                
              >
                <option value="" disabled hidden>Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Not binary">Not binary</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Location</h2>
            <span>Select your location in the map</span>
          </legend>

          <Map center={initialPosition} zoom={15} onclick={handleMapCLick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectedPosition}/>
          </Map>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Inventory</h2>
            <span>Select your itens below</span>
          </legend>

          <ul className="items-grid">
            {items.map((item, index) => {

              return (
                <li 
                  key={item.id}
                >
                  <div>
                    <button type="button" onClick={decrementQtdItem(index)}>
                      {inventory[index].qtd === 0 ? <FiMinusCircle color="#e1e5e6" />  : <FiMinusCircle /> }
                    </button>
                    <img src={item.image} alt={item.name}/>
                    <button type="button" onClick={incrementQtdItem(index)}>
                      <FiPlusCircle />                    
                    </button>

                  </div>
                  <span>
                    {item.name} { inventory[index].qtd === 0 ? '' :  `x${inventory[index].qtd}` }
                  </span>        
                </li>
              )
            })}
          </ul>

        </fieldset>        
        <div className="submit-components">
          
          <div className="captcha-validation" onClick={handleCaptcha}>
            <Captcha />
          </div>


          <button 
            className="submit-button"
            type="submit"                       
          >
            Submit
          </button>          
        </div>
      </form>
      
    </div>
  )
}

export default RegisterSurvivor;